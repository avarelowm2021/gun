import express from "express";
import Gun from "gun";
import "gun/sea.js";
import "gun/lib/radix.js";
import "gun/lib/radisk.js";
import "gun/lib/store.js";
import "gun/lib/rindexed.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(Gun.serve);
app.get("/", (_req, res) => res.send("GUN peer up"));

const server = app.listen(PORT, "0.0.0.0", () =>
  console.log(`Listening on ${PORT}`)
);

// Persistance disque activée (radisk)
const gun = Gun({ web: server, radisk: true, file: "data", axe: false });

process.on("SIGTERM", () => {
  console.log("Shutting down…");
  server.close(() => process.exit(0));
});
