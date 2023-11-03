import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "./Contacto.ts";

const getContactoDNI = async (req: Request, res: Response) => {
    try{
        const { dni } = req.params;
        const contacto = await ContactoModel.findOne({ dni }).exec();
        if (!contacto) {
          res.status(404).send("contacto not found");
          return;
        }

        

        res.status(200).send({
            dni: contacto.dni,
            name: contacto.name,
            email: contacto.email,
            codigo_postal: contacto.codigo_postal,
            

        });
    } catch (error) {
      res.status(404).send(error.message);
      return;
    }
  };

  export {getContactoDNI};