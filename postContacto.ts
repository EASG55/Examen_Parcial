import { Request, Response } from "npm:express@4.18.2";
import contactoModel from "./Contacto.ts";


const postContacto = async (req: Request, res: Response) => {
    try{
        const { name, dni, email, codigo_postal, codigo_ISO} = req.body;

        if(!name || !dni || !email || !codigo_postal || !codigo_ISO){
            res.status(400).send("Faltan datos");
            return;
          }

          if(typeof name !== "string" || typeof dni !== "string" || typeof email !== "string" || typeof codigo_postal !== "number" || typeof codigo_ISO !== "string"){
            res.status(400).send("Los tipos de datos ingresados no son los correctos");
            return;
          }

          const yaExiste = await contactoModel.findOne({name}).exec();
    if(yaExiste){
      res.status(400).send("El contacto ya existe");
      return;
    }

    const newContacto = new contactoModel({name, dni, email, codigo_postal, codigo_ISO});
    await newContacto.save();

    res.status(200).send({
        dni: newContacto.dni,
        name: newContacto.name,
        email: newContacto.email,
        codigo_postal: newContacto.codigo_postal,
        id: newContacto._id.toString(),

    });
} catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default postContacto;