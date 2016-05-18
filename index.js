var util = require('util');
var request = require('request');
var harbor = require('harbor-client');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

//required environment variables
var settings = {
  buildPlan: process.env.BUILD_PLAN,
  branch: process.env.BRANCH,
  shipment: process.env.SHIPMENT,
  environment: process.env.SHIPMENT_ENVIRONMENT,
  container: process.env.CONTAINER,
  buildToken: process.env.BUILD_TOKEN
};

//temp
var envVars = require('./harbor.json');
settings.buildPlan = envVars.BUILD_PLAN;
settings.branch = envVars.BRANCH;
settings.shipment = envVars.SHIPMENT;
settings.environment = envVars.SHIPMENT_ENVIRONMENT;
settings.container = envVars.CONTAINER;
settings.buildToken = envVars.BUILD_TOKEN;
//temp

var processedBuilds = [];
var logs = [];

app.set('json spaces', 2);
app.use(bodyParser.json());

app.use(cors());

//errors
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//static content
app.use(express.static(__dirname + '/public'));

//request logging
app.use(function (req, res, next) {
  if (req.url !== '/hc')
    console.log('%s %s', req.method, req.url);
  next();
});

//health check
app.get('/hc', function (req, res) {
  res.send('I am healthy');
});

//mount api module
app.get('/data', function (req, res) {
  res.send({
    settings: settings,
    logs: logs
  });
});

//start server
var port = process.env.PORT || 9000;
app.listen(port);
console.log('server started and listening on port %s', port);

//poll successful builds and when a new one is detected, fire off the deploy
function work() {

  //check for all required envvars
  if (!settings.buildPlan || !settings.shipment || !settings.environment || !settings.container || !settings.buildToken) {
    console.log('missing required environment variables');
    return;
  }

  var uri = util.format('http://buildit.services.dmtio.net/v1/build/%s/%s/latest/success', settings.buildPlan, settings.branch);

  request.get({ uri: uri, json: true }, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      //have we seen this build yet?
      if (processedBuilds.indexOf(body.number) === -1) {

        console.log(body);
        log(util.format('deploying build %s v%s, number %s', settings.buildPlan, body.version, body.number), body.version, body.number, 'processing');

        //trigger deploy
        var options = {
          shipment: settings.shipment,
          environment: settings.environment,
          container: settings.container,
          image: util.format('registry.services.dmtio.net/%s:%s', settings.buildPlan, body.version),
          buildToken: settings.buildToken
        };

        harbor.deploy(options, function(err, result) {
          if (!err && result.success)
            log('deploy succeeded :)', body.version, body.number, 'success');
          else
            log('deploy failed :(', body.version, body.number, 'failed');
        });

        //add build to list of tracked builds
        processedBuilds.push(body.number);
      }
      else {
        console.log('already seen build: %s %s v%s', settings.buildPlan, body.number, body.version);
      }
    }
    else {
      log(util.format('get a %s when polling builds', response.statusCode), 0, 0, 'failed');
    }
  });

  //schedule another run in a moment
  setTimeout(work, 5000);
}

work();

function log(msg, buildVersion, buildNumber, status, err) {
  if (!err)
    console.log(msg);
  else
    console.error(msg);

  logs.unshift({
    time: new Date(),
    buildNumber: buildNumber,
    buildVersion: buildVersion,
    status: status,
    message: msg
  });
}
