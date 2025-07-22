const Gun = require('gun');
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

// Créer un serveur HTTP simple
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Erreur serveur');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  }
});

// Ajouter GUN au serveur
Gun({ web: server });

server.listen(port, () => {
  console.log(`🟢 Gun relay running on port ${port}`);
});
