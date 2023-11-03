import { Request, Response } from "npm:express@4.18.2";
import contactoModel from "./Contacto.ts";


const putContacto = async (req: Request, res: Response) => {
    try {
      const { dni } = req.params;
      const { name, email, codigo_postal, codigo_ISO, id } = req.body;
      if (!name || !email || !codigo_postal || !codigo_ISO ||id) {
          res.status(400).send("Name and age are required");
          return;
        }
    
        const newContacto = await contactoModel.findByIdAndUpdate( 
           { dni },
           { name, email, codigo_postal, codigo_ISO, id },
          { new: true }).exec();
        if(!newContacto){
            res.status(404).send("El disco no existe");
            return;
        }
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
    
    export default putContacto;