import mongoose,{  model } from 'mongoose'//Importamos mongoose y los métodos Schema y model para definir modelos de datos.
import  {conexion} from '../helpers/conexionMDB.js'//Importamos la función de conexión a la base de datos.
import { response } from "express"//Importamos la respuesta HTTP de Express (aunque no se utiliza en este código).

conexion();//Establecemos la conexión con MongoDB.
//Definimos el esquema para los artículos.
const articuloSchema=new mongoose.Schema(
    {
        id:{type:Number,required:true,unique:true},
        titulo: String,
        cuerpo: String,
        usuario: String,
    },
    {
        versionKey: false
    }
);


const Articulo=model('Articulos',articuloSchema);//Creamos el modelo de datos 'Articulo' a partir del esquema.
export class ArticuloModel{
    static async getAll(){
        try{
            return Articulo.find();
        }catch(e){
            console.log(e);
        }
    }
    
    static async getOneBiID(id){
        try{
            return await Articulo.findOne({id:id});
        }catch(e){
            console.log(e);
 
        }
    }

    static async delete(id){
        try{
            return Articulo.deleteOne({id:id})
        }catch{
            console.log(e);
        }
    }

    static async create(articulo){
        if(!articulo.success){
            return Error;
        }
        try{
            const nuevoArticulo={...articulo.data};
            const ultimoArticulo=await Articulo.findOne().sort({id:-1});
            console.log(ultimoArticulo);
            if(ultimoArticulo){
                nuevoArticulo.id=ultimoArticulo.id+1;
            }else{
                nuevoArticulo.id=1;
            }
            const articuloGuardar=new Articulo(nuevoArticulo);
            await articuloGuardar.save();
            return nuevoArticulo;
        }catch(e){
            console.log(e);
        }
    }

    static async update(id,validacion){
        if(!validacion.success){
            response.status(400).json('validacion de datos sale Incorrecto');
        }
        try{
            return await Articulo.findOneAndUpdate({id:id}, {... validacion.data}, {new:true});// Devuelve el documento actualizado
        }catch(e){
            console.log(e);
        }
    }

}

