import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { getContactoDNI } from "./getContacto.ts";

import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";

const env = await load();

