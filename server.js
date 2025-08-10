const Gun = require('gun');
const express = require('express');
const app = express();
const port = process.env.PORT || 8765;

app.use(Gun.serve);
const server = app.listen(port, () => {
  console.log(`Serveur GUN en ligne sur port ${port}`);
});

Gun({ web: server });
