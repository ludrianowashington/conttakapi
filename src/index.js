const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send("Seja bem vindo");
});

app.listen(3333, () => {
  console.log("Servidor rodando!")
})