const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Your database file
const middlewares = jsonServer.defaults();

// Use default middlewares (e.g., logger, static files, etc.)
server.use(middlewares);

// Set up the router
server.use(router);

// Start the server
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
