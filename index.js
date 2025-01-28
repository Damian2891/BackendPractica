import express from "express";
import { EnrutadorArticulo } from "./Rutas/articulosRoutes.js"
import { Articulo } from './Modelos/articulo.js'
import { ArticuloModel } from "./Modelos/articuloDB.js";
import { usuariosRutas } from './Rutas/usuariosRutas.js'
import { Usuarios } from './Modelos/usuarios.js'
import { UsuariosCMDB } from "./Modelos/usuariosDB.js";
import { clientesRutas } from "./Rutas/clientesRutas.js"
import { Clientes } from './Modelos/cliente.js'
import { ClientesCMDB } from "./Modelos/clienteDB.js";
import { conexion } from "./helpers/conexionMDB.js";
import cors from "cors"
import { corsOptions } from "./config/cors.js";

const PORT=3030;
const app=express();

app.use(express.json());//Configuramos Express para manejar datos en formato JSON
/*app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*'); // Permite solicitudes de cualquier origen
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
     next();
   });*/
app.use(cors(corsOptions));
app.use('/api/articulos',EnrutadorArticulo(ArticuloModel));
app.use('/api/usuarios',usuariosRutas(UsuariosCMDB));
app.use('/api/clientes',clientesRutas(ClientesCMDB));
conexion();
app.listen(PORT,()=>{
     console.log("Servidor a la espera");
});
