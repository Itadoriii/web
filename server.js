const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde la carpeta src
app.use(express.static(path.join(__dirname, "src")));

// Ruta principal que sirve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
