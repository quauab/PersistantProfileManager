var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
    uuid = require('uuid'),
    chalk = require('chalk'),
	app = express();

// const pm = require('./modules/profile-manager.js');

const NodeCouchDb = require('node-couchdb');
const authorization = {
    auth: {
        user:'rickmin',
        password:'01234'
    }
};
const dbName = "myprofiles";
const viewUrl = '_design/all_profiles/_view/list_profiles';

const couch = new NodeCouchDb(authorization);

couch.listDatabases().then(function(dbs){
    // console.log(dbs);
});

/*
couch.createDatabase(dbName).then(() => {
    
}, err => {
    console.log(err);
    console.log('\n\n\t\tWhat Tha?!!!');
    for (var e in err) {
        console.log('\t\t' + e + ': ' + err[e] + '\n\t\t');
    }
});//*/



var user = null;

function capitalizeFirstCharacter(word) {
	var word_split = null,
		line = "";
	if (word.trim().toLowerCase() === 'id' ||
		word.trim().toLowerCase() === 'ssn' ||
		word.trim().toLowerCase() === 'sku' ||
		word.trim().toLowerCase() === 'vm' ||
		word.trim().toLowerCase() === 'mac' ||
		word.trim().toLowerCase() === 'imei' ||
		word.trim().toLowerCase() === 'os' ||
		word.trim().toLowerCase() === 'atm' ||
		word.trim().toLowerCase() === 'pa') {
		word = word.toUpperCase();
	} else if (word.match(/[-]/)) {
		if (null !== (word_split = word.split(['-'])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + '-';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else if (word.match(/[ ]/)) {
		if (null !== (word_split = word.split([' '])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + ' ';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else {
		return word.substring(0,1).toUpperCase() + word.substring(1);
	}
	return word;
}

function cfc(word) {
	return capitalizeFirstCharacter(word);
}
	
// View engine
// app.engine('dust',cons.dust);
app.set('view engine', 'ejs');

// Setting view engine and views directory location
// app.set('view engine','dust');
// app.set('views',__dirname + '/views');
app.set('views', path.join(__dirname, 'views'));


// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/',function(req, res){
	/*
    res.render('index', {profiles:
    {
        title:cfc('dyno-mite'),
        site:'http://localhost:2224',
        username:'Dummy Demo',
        pwd:'turn-iT____out_--_____->',
        email:'dum@bm.net'
    },pageTitle:cfc('profile manager demo')
    });//*/
    
    
    couch.get(dbName, viewUrl).then(
    function(data, headers, status) {
        // console.log(data.data.rows);
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
	// res.render('profile',{profile:pm.find(req.params.id),title:'Profile'});
    
    couch.get(dbName,req.params.id).then(({data, headers, status}) => {
        res.render('profile', {profile:data,pageTitle:'Profile'});
        // console.log(data);
    }, err => {
        console.log(err);
    });
});

app.post('/search',function(req, res){
    const keyword = req.body.keyword;
    const results = [];
    
    /*
    const list = pm.list();    
    for (var l in list) {
        var item = list[l];
        if (item.title.trim().toLowerCase() === keyword.trim().toLowerCase() ||
            item.username.trim().toLowerCase() === keyword.trim().toLowerCase() ||
            item.email.trim().toLowerCase() === keyword.trim().toLowerCase()) {
                results.push(item);
            }
    }
    if (results.length) {
        res.render('searched',{results:results});
    } else {
        res.redirect('/');
    }//*/
});

app.post('/add',function(req, res){
	const title = cfc(req.body.title);
    const login = cfc(req.body.login);
    const pwd = req.body.pwd;
    const site = cfc(req.body.site);
    const email = cfc(req.body.email);
    // console.log('\tTitle:\t' + title + '\n\tLogin:\t' + login + '\n\tPwd:\t' + pwd + '\n\tSite:\t' + site + '\n\tEmail:\t' + email);
    const extra = [];
    
    for (var p in req.body) {
        if (p !== 'title' && p !== 'login' && p !== 'pwd' && p !== 'site' && p !== 'email') {
            var objP = req.body[p];
            if (objP) {
                extra.push({key:cfc(p),value:objP});
            }
        }
    }
    
    // var done = pm.add(uuid.v4().toString(),login,title,pwd,email,site,data);
    
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
            // console.log('\n\n\t\t\tData:\t' + data + '\n\t\t\tHeaders:\t' + headers + '\n\t\t\tStatus:\t' + status + '\n\n');
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
		site = cfc(req.body.site),
		pwd = req.body.pwd,
		email = cfc(req.body.email);
        // console.log('\tId:\t' + id + '\n\tUsername:\t' + uname + '\n\tTitle:\t' + title + '\n\tSite:\t' + site + '\n\tPassword:\t' + pwd + '\n\tEmail:\t' + email);
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
    
    /*
    editUser = pm.create(id,uname,title,site,pwd,email,data);			
	if (pm.edit(editUser)) {
        console.log(chalk.green.bold.bgBlack("Edit Successful"));
    } else {
        console.log(chalk.red.bold.bgBlack('Edit Failed'));
    } 
    
	res.redirect('/');
    //*/  
});

app.delete('/delete/:id', function(req, res){
	var id = req.params.id;
    var rev = req.params.rev;
    console.log('ID:\t' + id + '\t\tRev:\t' + rev);
	// console.log('ID: ' + id);
	// pm.remove(id.toString(),'remove');
    /*
    couch.del(dbName, id, rev).then(({data, headers, status}) => {        
        res.sendStatus(200);
    }, err => {
        console.log(err);
    });  */  
});

// Server 
app.set('port', (process.env.PORT || 2224));

app.listen(app.get('port'),function(){
	console.log("Server started on port " + app.get('port'));
});
