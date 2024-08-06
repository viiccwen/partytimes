import { z } from "zod";
import { login_schema, party_return_schema, register_schema } from "./schema";

export type register_schema_type = z.infer<typeof register_schema>;
export type login_schema_type = z.infer<typeof login_schema>;

export type party_return_schema_type = z.infer<typeof party_return_schema>;