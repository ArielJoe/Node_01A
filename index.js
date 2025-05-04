var http = require("http");
var url = require("url");
var fileSys = require("fs");

var server = http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let path = q.query;
  let fileLocation;

  switch (path.menu) {
    case undefined:
    case "/":
      fileLocation = "pages/home.html";
      break;
    default:
      fileLocation = null;
  }

  if (!fileLocation) {
    res.writeHead(404, { "Content-Type": "text/html" });
    return res.end("404 not found");
  }

  fileSys.readFile(fileLocation, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 not found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(8000);
console.log("Server running on http://localhost:8000/");
