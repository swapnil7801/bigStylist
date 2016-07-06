var path = require('path');
var fs = require('fs');
var seedLoader = require((process.cwd()+'/nodeapp/scripts/seed.js'));

seedLoader.seed();

