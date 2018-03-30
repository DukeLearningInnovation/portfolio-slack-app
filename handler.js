'use strict';

const sVToken = process.env.SLACK_VERIFICATION_TOKEN,
  sAToken = process.env.SLACK_ACCESS_TOKEN,
  githubApiKey = process.env.GITHUB_API_KEY;
const octokit = require('@octokit/rest')();
const querystring = require('querystring');


module.exports.portfolio = (event, context, callback) => {
  console.log("request: " + JSON.stringify(event));
  console.log("context: " + JSON.stringify(context));
  console.log("callback: " + JSON.stringify(callback));
  

  // verify necessary tokens are set in environment variables
  if (!sVToken || !sAToken || !githubApiKey) {
    return callback("Github ApiKey, Slack verification token, and Slack access token should be set");
  }
  
  octokit.authenticate({
    type: 'token',
    token: githubApiKey,
  });

  // const message = JSON.parse(event.body);
  let response = {
    statusCode: 500,
    body: 'You ain\'t got no event.body',
  };  
  if (event.body !== null && event.body !== undefined) {
    let body = querystring.parse(event.body); 
    let message = 'You will receive the readme.md';
    console.log(body);
    if (body.text === "") {
      octokit.repos.getContent({
        owner: 'dukelearninginnovation', 
        repo: 'portfolio', 
        path: '',
      }).then(({data}) => {
        console.log("data: " + JSON.stringify(data));
        message = content;
      })
      response = {
        statusCode: 200,
        body: message,
      };
 
    }
  }
  
    
  console.log("response: " + JSON.stringify(response));
  callback(null, response);
};

module.exports.hello = (event, context, callback) => {

const response = {
  statusCode: 200,
  body: JSON.stringify({
    message: 'Go Serverless v1.0! Your function executed successfully!',
    input: event,
  }),
};

callback(null, response);

// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
