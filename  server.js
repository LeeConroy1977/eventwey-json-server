const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json")); // Make sure the path is correct
const middlewares = jsonServer.defaults();

// Remove the static files serving middleware
server.use((req, res, next) => {
  if (req.url.startsWith("/public")) {
    res.status(404).send("Not Found");
  } else {
    next();
  }
});

server.use(middlewares); // Use default middlewares for JSON Server
server.use(router); // Use the router that handles the db.json

// Start the server
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
