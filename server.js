const Gun = require('gun');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8765;

app.use(cors());
app.use(Gun.serve);
app.get('/', (_, res) => res.send('GUN OK'));

const server = app.listen(port, () => {
  console.log(`Serveur GUN en ligne sur ${port}`);
});

// IMPORTANT : liste des autres peers (hors lui-même)
const peers = [
  // ajoute ici tous les autres nœuds Render
  "https://gun-encaissement.onrender.com/gun",
  "https://gun-encaissement777.onrender.com/gun"
];

// Démarre GUN avec maillage
const gun = Gun({ web: server, peers });

// (optionnel) stabilité sur Render
server.keepAliveTimeout = 61000;
server.headersTimeout   = 65000;

// (optionnel) logs de maillage
gun.on('hi', peer => console.log('✓ peer connecté :', peer.url));
gun.on('bye', peer => console.log('✗ peer déconnecté :', peer.url));
