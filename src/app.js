'use strict';

var i, cur, projects,
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./config.js', 'utf8')),
    Bamboo = require('bamboo-api'),
    bamboo = Bamboo(process.env.BAMBOO_ROOT_URL);

projects = config.PROJECTS;

for (i = 0; i < projects.length; i++) {
    cur = projects[i];
    bamboo.getLatestBuildStatus(cur, cb);
}

// FUNCTIONS
function cb (err, result) {
    if (err) {
        console.error('There was an error while getting the latest build status', {
            err: err,
            result: result
        });
        return;
    }
    console.log(result, {
        result: result
    });
}