const Gun = require('gun');
const express = require('express');
const app = express();

app.use(Gun.serve);
const server = app.listen(process.env.PORT || 8765);
Gun({ web: server });
