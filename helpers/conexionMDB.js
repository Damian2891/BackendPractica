import mongoose  from "mongoose";
export const conexion=async(n)=>{
    try{
        await mongoose.connect("mongodb+srv://Damian:Damian1234@cluster0.ppcz5.mongodb.net/BDDeber");
       // await mongoose.connect("mongodb://localhost:27017/BDDeber")
        console.log ("Conectado correctamente...!");
    }catch(e){
        console.log(e);
    }
}

