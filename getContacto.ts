import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "./Contacto.ts";

const getContactoDNI = async (req: Request, res: Response) => {
    try{
        const { dni } = req.params.dni;
        const contacto = await ContactoModel.findOne({ dni }).exec();
        if (!contacto) {
          res.status(404).send("contacto not found");
          return;
        }

        const codigo_postal_ = contacto.codigo_postal;
        const codigo_ISO_ = contacto.codigo_ISO;
        const BASE_URL = "https://zip-api.eu/api/v1";
        const url = `${BASE_URL}/info/${codigo_ISO_}-${codigo_postal_}`;
        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error("Cannot fetch location");
        }

        const data = await response.json();

        const COUNTRY_URL = "https://restcountries.com/v3.1/alpha/";
        const urlc =  `${COUNTRY_URL}${codigo_ISO_}`;
        const responseC = await fetch(urlc);
        if(responseC.status !== 200) {
            throw new Error("Cannot fetch location");
          }

        const datac = await responseC.json();

        const TIEMPO_URL = "http://worldtimeapi.org/api/timezone/";
        const url2 = `${TIEMPO_URL}${datac.region}/${data.state}`;
        const response2 = await fetch(url2);
        if (response2.status !== 200) {
          throw new Error("Cannot fetch time");
        }

        const data2 = await response2.json();

        const WEATHERAPI_URL = "http://api.weatherapi.com/v1";
        const WEATHERAPI_API_KEY = "7cf111375e5749b4b19213607230510"
        const url3 = `${WEATHERAPI_URL}/current.json?key=${WEATHERAPI_API_KEY}&q=${data.state}`;
        const response3 = await fetch(url3);
        if (response3.status !== 200) {
          throw new Error("Cannot fetch weeather");
        }

        const data3 = await response3.json();

        res.status(200).send({
            dni: contacto.dni,
            name: contacto.name,
            email: contacto.email,
            codigo_postal: contacto.codigo_postal,
            ciudad: data.state,
            pais: datac.name.common,
            hora: data2.datetime,
            tiempo: data3.current.condition.text,
            id: contacto._id.toString(),

        });
    } catch (error) {
      res.status(404).send(error.message);
      return;
    }
  };

  export {getContactoDNI};