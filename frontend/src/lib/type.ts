import { z } from "zod";
import {
  ampm,
  decision_schema,
  feedback_schema,
  guest_schema,
  login_schema,
  name_schema,
  party_create_schema,
  party_edit_schema,
  party_return_schema,
  register_schema,
  timeslots_create_schema,
  timeslots_return_schema,
  user_info_schema,
  votes_schema,
} from "./schema";

export type register_schema_type = z.infer<typeof register_schema>;
export type login_schema_type = z.infer<typeof login_schema>;

export type guest_schema_type = z.infer<typeof guest_schema>;

export type user_info_schema_type = z.infer<typeof user_info_schema>;

export type decision_schema_type = z.infer<typeof decision_schema>;

export type party_return_schema_type = z.infer<typeof party_return_schema>;

export type party_edit_schema_type = z.infer<typeof party_edit_schema>;

export type timeslots_create_schema_type = z.infer<
  typeof timeslots_create_schema
>;

export type timeslots_return_schema_type = z.infer<typeof timeslots_return_schema>;

export type votes_schema_type = z.infer<typeof votes_schema>;

export type party_create_schema_type = z.infer<typeof party_create_schema>;

// fetch return type
export type general_fetch_return_type = {
  correct: boolean;
  error?: string;
};

export type userinfo_fetch_return_type = general_fetch_return_type & {
  data?: user_info_schema_type;
};

export type create_party_fetch_return_type = general_fetch_return_type & {
  data?: {
    partyid: string;
  };
};

export type get_party_fetch_return_type = general_fetch_return_type & {
  data?: {
    party: party_return_schema_type;
  };
};

export type get_partylist_fetch_return_type = general_fetch_return_type & {
  data?: {
    party: party_return_schema_type[];
  }
};

export type get_votetimes_fetch_return_type = general_fetch_return_type & {
  data?: votes_schema_type[];
};

export type feedback_schema_type = z.infer<typeof feedback_schema>;

export type name_schema_type = z.infer<typeof name_schema>;