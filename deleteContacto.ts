import { Request, Response } from "npm:express@4.18.2";
import contactoModel from "./Contacto.ts";

const deleteContacto = async (req: Request, res: Response) => {
    try {
        const { dni } = req.params;
        if(!dni){
            res.status(400).send("Falta el dni");
            return;
        }
        const person = await contactoModel.findOneAndDelete({ dni }).exec();
        if (!person) {
          res.status(404).send("contacto not found");
          return;
        }
        res.status(200).send("contacto deleted");
      } catch (error) {
        res.status(404).send(error.message);
        return;
      }
    };
    
    export default deleteContacto;