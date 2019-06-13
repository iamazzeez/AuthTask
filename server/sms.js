var http = require("https");
const port = process.env.PORT || 3000;

var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v2/sendsms?country=91",
  "headers": {
    "authkey": "280314AmKDVfxXc6UC5cfdf599",
    "content-type": "application/json"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ sender: 'SOCKET',
  route: '4',
  country: '91',
  sms: 
   [ { message: 'Hello, offer is limited hurry up!', to: [ '8309595695', ] } ] }));
req.end();