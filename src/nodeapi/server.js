const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200/"
};

app.use(cors(corsOptions)); 
app.use(express.urlencoded({ extended: true })); //pra aceitar urenconded
app.use(express.json()); //pra aceitar json

const db = require("./app/models"); //vai importar o index.js
db.sequelize.sync(); //sincroniza toda minha model(le o codigo(client.model.js) e replica a configuracao no banco de dados)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to node application 2." });
});

require("./app/routes/client.routes")(app);

const PORT = process.env.PORT || 8080; //configurando a porta
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);    // app.listen inicia a escuta
});