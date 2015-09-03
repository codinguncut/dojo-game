'use strict';
var express = require('express');
var cfenv = require('cfenv');

var appEnv = cfenv.getAppEnv();

var app = express();
app
.use(express.static('root'));

app.listen(appEnv.port);
console.log('started on port', appEnv.port);
