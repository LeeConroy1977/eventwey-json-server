const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json")); // Adjust the path to your db.json
const middlewares = jsonServer.defaults();

// Disable static file serving by using only the router (no public directory)
server.use(middlewares);
server.use(router);

// Remove the static file serving middleware
server.use((req, res, next) => {
  if (req.url.startsWith("/public")) {
    res.status(404).send("Not Found");
  } else {
    next();
  }
});
// Start the server
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
