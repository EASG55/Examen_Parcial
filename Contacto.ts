import mongoose from "npm:mongoose@7.6.3";
import {contacto} from "./types.ts";

const Schema = mongoose.Schema;

const contactoSchema = new Schema(
    {
      name: { type: String, required: true },
      dni: { type: String, required: true, unique: true },
      email: {type: String, required: true},
      codigo_postal: { type: Number, required: true },
      codigo_ISO: {type: String, required: true},

    },
    { timestamps: true }
  );
  
  export type ContactoModelType = mongoose.Document & Omit<contacto, "_id"> & Omit<contacto, "ciudad"> & Omit<contacto, "pais"> & Omit<contacto, "hora"> & Omit<contacto, "tiempo">;

const ContactoModel = mongoose.model<ContactoModelType>("contacto", contactoSchema);

export default ContactoModel;