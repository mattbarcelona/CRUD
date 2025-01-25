const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
  { id: 1, nombre: "Ryu", edad: 32, lugarProcedencia: "Japón" },
  { id: 2, nombre: "Chun-Li", edad: 29, lugarProcedencia: "China" },
  { id: 3, nombre: "Guile", edad: 35, lugarProcedencia: "Estados Unidos" },
  { id: 4, nombre: "Dhalsim", edad: 45, lugarProcedencia: "India" },
  { id: 5, nombre: "Blanka", edad: 32, lugarProcedencia: "Brasil" },
];

// Get all users
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// Add a new user
app.post("/usuarios", (req, res) => {
  const { nombre, edad, lugarProcedencia } = req.body;

  if (!nombre || !edad || !lugarProcedencia) {
    return res.status(400).json({ error: "Datos erroneos!" });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad,
    lugarProcedencia,
  };
  usuarios.push(nuevoUsuario);

  res.redirect("/usuarios");
});

// Get a user by name
app.get("/usuarios/:nombre", (req, res) => {
  const { nombre } = req.params;
  const usuario = usuarios.find(
    (user) => user.nombre.toLowerCase() === nombre.toLowerCase()
  );
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no existe" });
  }
  res.status(200).json(usuario);
});

// Update a user
app.put("/usuarios/:nombre", (req, res) => {
  const { nombre } = req.params;
  const { edad, lugarProcedencia } = req.body;

  const index = usuarios.findIndex(
    (user) => user.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no existe" });
  }

  if (edad) usuarios[index].edad = edad;
  if (lugarProcedencia) usuarios[index].lugarProcedencia = lugarProcedencia;

  res.json(usuarios[index]);
});

// Delete a user
app.delete("/usuarios/:nombre", (req, res) => {
  const { nombre } = req.params;
  const usuarioExiste = usuarios.some(
    (user) => user.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!usuarioExiste) {
    return res.status(404).json({ error: "Usuario no existe" });
  }

  usuarios = usuarios.filter(
    (usuario) => usuario.nombre.toLowerCase() !== nombre.toLowerCase()
  );

  res.json({ mensaje: `Usuario ${nombre} fue eliminado` });
});

app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}`);
});
