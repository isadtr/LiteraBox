const express = require('express');
const app = express();
const porta = 3000;

app.get('/', (req, res) => {
  res.send('Bem-vindo à sua API Node.js!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


