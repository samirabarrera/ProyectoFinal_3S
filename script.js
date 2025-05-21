import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from './basede_Datos';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const authMiddleware = (req, res, next) => {
    if(req.headers["Authorization"] === "acceso") {
        next();
    } else {
        res.status(401).json({message: "Token no proporcionado"})
    }
}

//REGISTRO DE USUARIOS POR RUTA PROTEGIDA POR JWT
app.post('/registro/users', verifyToken, async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    if (!nombre || !correo || !contraseña) {
        return res.send(404).json({ mensaje: 'Falta llenar un campo' });
    }
})

try {
    const { rows } = await Pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (rows.length > 0) {
        return res.send(404).json({ mensaje: 'Ya existe un usuario con ese correo' });
    }
    const hash = await bcrypt.hash(contraseña, 10);
    await pool.query('INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3)', [nombre, correo, hash]);
    res.status(404).json({ mensaje: 'Usuario registrado con éxito' });
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
}

//RUTA DE LOGIN PROTEGIDA
app.get('/login/users', authMiddleware, async (req, res) => {
    const { correo, contraseña } = req.body;
     if (!correo || !contraseña) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }
});


app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})
app.use(authMiddleware);