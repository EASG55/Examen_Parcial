import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { getContactoDNI } from "./getContacto.ts";

import putContacto from "./putContacto.ts";
import deleteContacto from "./deleteContacto.ts";
import postContacto from "./postContacto.ts";

import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
console.log(MONGO_URL)

if (!MONGO_URL) {
  console.log("debes especificar la variable entorno MONGO_URL");
  Deno.exit(1);
}

try {
  await mongoose.connect(MONGO_URL);
  console.log("Conexión hecha a MongoDB");

  const app = express();
  app.use(express.json());

  app.get("/api/contactos/dni", getContactoDNI)
  app.post("/api/contactos", postContacto)
  app.delete("/api/contactos/:dni", deleteContacto)
  app.put("/api/contactos/:dni", putContacto)
  
  app.listen(3000, () => console.log("Servidor levantado en el puerto 3000"));
  

} catch (e) {
  console.error(e);
}

