var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
    chalk = require('chalk'),
    filter = require('./modules/conret'),
    cfc = require('./modules/cfc'),
	app = express();

const NodeCouchDb = require('node-couchdb');
const authorization = {
    auth: {
        user:'profmin',
        password:'02468'
    }
};
const dbName = "myprofiles";
const viewUrl = '_design/all_profiles/_view/list_profiles';
const couch = new NodeCouchDb(authorization);

couch.listDatabases().then(function(dbs){
    // console.log(dbs);
});
	
// View engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/',function(req, res){
	couch.get(dbName, viewUrl).then(
    function(data, headers, status) {
        res.render('index',{
            profiles:data.data.rows,
            pageTitle:cfc('profile manager demo')
        });
    },
    function(err){
        res.send(err);
    });
});

app.get('/profile/:id', function(req, res){    
    couch.get(dbName,req.params.id).then(({data, headers, status}) => {
        res.render('profile', {profile:data,pageTitle:'Profile'});
    }, err => {
        console.log(err);
    });
});

app.post('/search',function(req, res){
    const keyword = req.body.keyword;
    const results = [];
    couch.get(dbName, viewUrl).then(
    function(data, headers, status) {
       for (var d in data.data.rows) {
           var profile = data.data.rows[d];
           if (profile.value.title.trim().toLowerCase() === keyword.trim().toLowerCase() ||
               profile.value.email.trim().toLowerCase() === keyword.trim().toLowerCase() ||
               profile.value.login.trim().toLowerCase() === keyword.trim().toLowerCase()) {
                   results.push(profile);
               }
       }       
       if (results.length > 0) {
           res.render('searched',{results:results,pageTitle:'Search Results'});
       } else {
           res.redirect('/');
       }
    },
    function(err){
        res.send(err);
    });    
});

app.post('/add',function(req, res){
	const title = cfc(req.body.title);
    const login = cfc(req.body.login);
    const pwd = req.body.pwd;
    const site = (!filter.http(req.body.site))?'http://' + req.body.site:req.body.site;
    const email = cfc(req.body.email);
    const extra = [];    
    for (var p in req.body) {
        if (p !== 'title' && p !== 'login' && p !== 'pwd' && p !== 'site' && p !== 'email') {
            var objP = req.body[p];
            if (objP) {
                extra.push({key:cfc(p),value:objP});
            }
        }
    }    
    couch.uniqid().then(function(ids){
        const id = ids[0];        
        couch.insert(dbName, {
        _id:id,
        title:title,
        site:site,
        login:login,
        pwd:pwd,
        email:email,
        extra:extra
        }).then(function(data, headers, status){
            res.redirect('/');
        },
        function(err){
            console.log(err);
        });
    });
});

app.post('/edit',function(req, res){
	var id = req.body.id,
        rev = req.body.rev,
		uname = cfc(req.body.username),
		title = cfc(req.body.title),
		site = (!filter.http(req.body.site))?'http://' + req.body.site:req.body.site,
		pwd = req.body.pwd,
		email = cfc(req.body.email);
    const data = [];    
    for (var p in req.body) {
        if (p !== 'title' && p !== 'login' && p !== 'pwd' && p !== 'site' && p !== 'email' && p !== 'id' && p !== 'username' && p !== 'rev') {
            var objP = req.body[p];
            if (objP) {
                data.push({key:cfc(p),value:objP});
            }
        }
    }    
    couch.update(dbName, {
        _id:id,
        _rev:rev,
        title:title,
        site:site,
        login:uname,
        pwd:pwd,
        email:email,
        extra:data
    }).then(({data, headers, status}) => {
        res.redirect('/');
    }, err => {
        console.log(err);
    });    
});

app.delete('/delete/:id', function(req, res){
	var id = new String(req.params.id).split(':')[0];
    var rev = new String(req.params.id).split(':')[1];
    couch.del(dbName, id, rev).then(({data, headers, status}) => {        
        res.sendStatus(200);
    }, err => {
        console.log(err);
    }); 
});

// Server 
app.set('port', (process.env.PORT || 2224));

app.listen(app.get('port'),function(){
	console.log("Server started on port " + app.get('port'));
});
