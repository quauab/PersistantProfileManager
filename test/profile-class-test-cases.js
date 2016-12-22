var assert = require('assert'),
    chalk = require('chalk'),
	db = require('../modules/profile-manager-tests.js');

const strId1 = 'id1', userId1 = 'username1', title1 = 'title1', email1 = 'email1', pwd = 'password', obj = {'pin':'pin 1','lock':'lock 1'};
const strId2 = 'id2', userId2 = 'username2', title2 = 'title2', email2 = 'email2';
const strId3 = 'id3', userId3 = 'username3', title3 = 'title3', email3 = 'email3';
const strId4 = 'id4', userId4 = 'username4', title4 = 'title4', email4 = 'email4';
const strId5 = 'id5', userId5 = 'username5', title5 = 'title5', email5 = 'email5';
const strId6 = 'id5', userId6 = 'username5', title6 = 'title5', email6 = 'email5', obj2 = {}, obj3 = [], obj4 = 'string';

console.log(chalk.cyan.bold('\t\t\Profile Class Test Cases'));

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

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor null first argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.nullFirstArgument(null, userId1, title1, email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor null second argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.nullSecondArgument(strId1, null, title1, email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor null third argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.nullThirddArgument(strId1, userId1, null, email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor empty first argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.emptyFirstArgument('', userId1, title1, email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor empty second argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.emptySecondArgument(strId1, '', title1, email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor empty third argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.emptyThirddArgument(strId1, userId1, '', email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor not a String first argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.notStringFirstArgument(obj, userId1, title1, email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor not a String second argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.notStringSecondArgument(strId1, obj, title1, email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor not a String third argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.notStringThirddArgument(strId1, userId1, obj, email1, pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor empty fourth argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.emptyFourthArgument(strId1, userId1, title1, '', pwd, obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor empty fifth argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.emptyFifthArgument(strId1, userId1, title1, email1, '', obj)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor zero length sixth argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.zeroLengthSixthArgument(strId1, userId1, title1, email1, pwd, obj2)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor not an Object but an Array sixth argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.zeroLengthSixthArgument(strId1, userId1, title1, email1, pwd, obj3)},
				/./
			);
        });
    });
});

describe(chalk.yellow.bgGreen('Profile Class Test'), () => {
    describe(chalk.white.bold('Testing constructor not an Object but a String sixth argument'), () => {
        it(chalk.magenta.bold.bgBlack('Should throw an Error'), () => {
            assert.throws(
				() => {db.class-tests.zeroLengthSixthArgument(strId1, userId1, title1, email1, pwd, obj4)},
				/./
			);
        });
    });
});