const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
  if (req.method === "GET" && req.url.startsWith("/groups/")) {
    const groupId = req.url.split("/").pop();
    const group = router.db.get("groups").find({ id: groupId }).value();

    if (group && !group.approved) {
      return res
        .status(403)
        .json({ error: "Access denied. Group is not approved." });
    }
  }
  next();
});

server.use((req, res, next) => {
  if (req.method === "GET" && req.url.startsWith("/events/")) {
    const eventId = req.url.split("/").pop();
    const event = router.db.get("event").find({ id: eventId }).value();

    if (event && !event.approved) {
      return res
        .status(403)
        .json({ error: "Access denied. event is not approved." });
    }
  }
  next();
});

exports.handler = async (event, context) => {
  const port = 3000;
  server.listen(port, () => {
    console.log(`JSON Server running at http://localhost:${port}`);
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "JSON Server is running" }),
  };
};
