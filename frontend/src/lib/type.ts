import { z } from "zod";
import { register_schema } from "./schema";

export type register_schema_type = z.infer<typeof register_schema>;