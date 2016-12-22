var assert = require('assert'),
    chalk = require('chalk'),
	db = require('../modules/profile-manager-tests.js');
    
const noun = 'noun', verb = 'verb', noun1 = null, verb1 = null, noun2 = '', verb2 = '';
const strId = 'id1', userId = 'username1', title = 'title1', email = 'email1', pwd = 'password', obj = {'pin':'pin 1','lock':'lock 1'};
const strId2 = 'id2', userId2 = 'username2', title2 = 'title2', email2 = 'email2';
const strId3 = 'id3', userId3 = 'username3', title3 = 'title3', email3 = 'email3';
const strId4 = 'id4', userId4 = 'username4', title4 = 'title4', email4 = 'email4';
const strId5 = 'id5', userId5 = 'username5', title5 = 'title5', email5 = 'email5';
const strId6 = 'id5', userId6 = 'username5', title6 = 'title5', email6 = 'email5', obj2 = {}, obj3 = [], obj4 = 'string';
console.log(chalk.cyan.bold('\t\t\Profile Manager Test Cases'));

describe(chalk.white.bold('Array - Dummy Test'), function() {
	describe('#indexOf()', function() {
		it(chalk.magenta.bold('should return -1 when the value is not present'), function() {
			assert.equal(-1, [1,2,3].indexOf(4));
		});
	});
});

describe(chalk.white.bold('Array - Dummy Test'), function() {
	describe('#elementAt()', function() {
		it(chalk.magenta.bold('should return b'), function() {
			assert.equal('b', ['a','b','c'][1]);
		});
	});
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing null first argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.manager.nullFirstArgument(noun1, verb)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing null second argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.manager.nullSecondArgument(noun, verb1)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing empty first argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.manager.nullFirstArgument(noun2, verb)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing empty second argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.manager.nullSecondArgument(noun, verb2)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing class instantiation'), () => {
        it(chalk.magenta.bold.bgBlack('Should return a new Profile object'), () => {
            var profile = null;
            profile = db.manager.newProfile(strId, userId, title, pwd, email, obj);
            assert.notEqual(null, profile);
            assert.equal('id1', profile.id);
            assert.equal('username1', profile.username);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing add method'), () => {
        it(chalk.magenta.bold.bgBlack('Should return true if the new Profile object was created and added'), () => {
            var profile = false;
            profile = db.manager.add(strId, userId, title, pwd, email, obj);
            assert.notEqual(false, profile);
            assert.equal(true, profile);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing list method'), () => {
        it(chalk.magenta.bold.bgBlack('Should return an array with a length of one'), () => {
            var profiles = db.manager.list();
            assert.equal(1, profiles.length);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing attempt to create and add a new Profile containing an existing Profile\'s email'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.manager.add(strId2, userId2, title2, pwd, email, obj);},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing attempt to create and add a new Profile containing an existing Profile\'s username'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.manager.add(strId2, userId, title2, pwd, email2, obj);},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing attempt to create and add a new Profile containing an existing Profile\'s username'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.manager.add(strId2, userId, title2, pwd, email2, obj);},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing add method'), () => {
        it(chalk.magenta.bold.bgBlack('Adding a 2nd Profile object. Should return true if the new Profile object was created and added'), () => {
            var profile = false;
            profile = db.manager.add(strId2, userId2, title2, pwd, email2, obj);
            assert.notEqual(false, profile);
            assert.equal(true, profile);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing list method'), () => {
        it(chalk.magenta.bold.bgBlack('Should return an array with a length of two'), () => {
            var profiles = db.manager.list();
            assert.equal(2, profiles.length);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing add method'), () => {
        it(chalk.magenta.bold.bgBlack('Adding a 3rd Profile object. Should return true if the new Profile object was created and added'), () => {
            var profile = false;
            profile = db.manager.add(strId3, userId3, title3, pwd, email3, obj);
            assert.notEqual(false, profile);
            assert.equal(true, profile);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing list method'), () => {
        it(chalk.magenta.bold.bgBlack('Should return an array with a length of three'), () => {
            var profiles = db.manager.list();
            assert.equal(3, profiles.length);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing add method'), () => {
        it(chalk.magenta.bold.bgBlack('Adding a 4th Profile object. Should return true if the new Profile object was created and added'), () => {
            var profile = false;
            profile = db.manager.add(strId4, userId4, title4, pwd, email4, obj);
            assert.notEqual(false, profile);
            assert.equal(true, profile);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing list method'), () => {
        it(chalk.magenta.bold.bgBlack('Should return an array with a length of four'), () => {
            var profiles = db.manager.list();
            assert.equal(4, profiles.length);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing add method'), () => {
        it(chalk.magenta.bold.bgBlack('Adding a 5th Profile object. Should return true if the new Profile object was created and added'), () => {
            var profile = false;
            profile = db.manager.add(strId5, userId5, title5, pwd, email5, obj);
            assert.notEqual(false, profile);
            assert.equal(true, profile);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing list method'), () => {
        it(chalk.magenta.bold.bgBlack('Should return an array with a length of five'), () => {
            var profiles = db.manager.list();
            assert.equal(5, profiles.length);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing find method. Searching by username.'), () => {
        it(chalk.magenta.bold.bgBlack('Should return a Profile object'), () => {
            var profile = db.manager.find('username3');
            assert.notEqual(null, profile);
            assert.equal('id3', profile.id);
            assert.equal('email3', profile.email);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing find method. Searching by title.'), () => {
        it(chalk.magenta.bold.bgBlack('Should return a Profile object'), () => {
            var profile = db.manager.find('title4');
            assert.notEqual(null, profile);
            assert.equal('id4', profile.id);
            assert.equal('email4', profile.email);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing find method. Searching by email.'), () => {
        it(chalk.magenta.bold.bgBlack('Should return a Profile object'), () => {
            var profile = db.manager.find('email2');
            assert.notEqual(null, profile);
            assert.equal('id2', profile.id);
            assert.equal('title2', profile.title);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing remove method. Remove by email.'), () => {
        it(chalk.magenta.bold.bgBlack('Should return an Array length of 4'), () => {
            var profiles = db.manager.remove('email2');
            assert.equal(4, profiles.length);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing remove method. Remove by username.'), () => {
        it(chalk.magenta.bold.bgBlack('Should return an Array length of 3'), () => {
            var profiles = db.manager.remove('username3');
            assert.equal(3, profiles.length);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Manager Test'), () => {
    describe(chalk.white.bold('Testing remove method. Removeing all profiles.'), () => {
        it(chalk.magenta.bold.bgBlack('Should return an Array length of zero'), () => {
            var profiles = db.manager.remove();
            assert.equal(0, profiles.length);
        });
    });
});
