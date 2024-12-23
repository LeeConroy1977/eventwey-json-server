const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json")); // Specify path to db.json
const middlewares = jsonServer.defaults();

// Disable static file handling (public directory)
server.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Use the middlewares
server.use(middlewares);

// Use the router to handle requests
server.use(router);

// Start the server on port 3000
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
