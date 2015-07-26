var test = require('tape');
var traverse = require('../').async;
var deepEqual = require('./lib/deep_equal');
var util = require('util');

test('async each', function (t) {
    t.plan(1);

    var obj = { x : 3 };
    traverse(obj).forEach(function (x, cb) {
        cb();
    }, function (err, newObj) {
        t.pass();
    });
});

test('async each context', function (t) {
    t.plan(1);

    var obj = { x: { y: 3 }};
    traverse(obj).forEach(function (x, cb) {
        console.log(this.node);
        console.log(this.path);
        console.log(this.key);
        console.log(this.isRoot);
        console.log(this.notRoot);
        console.log(this.isLeaf);
        console.log(this.notLeaf);
        console.log(this.level);
        console.log(this.circular);
        cb();
    }, function (err, newObj) {
        t.pass();
    });
});

test('async each update', function (t) {
    t.plan(1);

    var obj = { x: { y: 3 }};
    traverse(obj).forEach(function (x, cb) {
        if (this.key === 'y') {
            this.update({z: 0});
        }
        cb();
    }, function (err, newObj) {
        t.pass();
        console.log(JSON.stringify(obj, null, '  '));
        console.log(JSON.stringify(newObj, null, '  '));
    });
});
