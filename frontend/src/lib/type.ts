import { z } from "zod";
import {
  login_schema,
  party_edit_schema,
  party_return_schema,
  register_schema,
  timeslots_create_schema,
  votes_schema,
} from "./schema";

export type register_schema_type = z.infer<typeof register_schema>;
export type login_schema_type = z.infer<typeof login_schema>;

export type party_return_schema_type = z.infer<typeof party_return_schema>;

export type party_edit_schema_type = z.infer<typeof party_edit_schema>;

export type timeslots_create_schema_type = z.infer<
  typeof timeslots_create_schema
>;

export type votes_schema_type = z.infer<typeof votes_schema>;

// fetch return type
export type general_fetch_return_type = {
  correct: boolean;
  error?: string;
};

export type party_data_type = {
  party: {
    title: string;
    partyid: string;
    description: string;
    status: boolean;
    date: string[];
    start_time: number;
    start_ampm: string;
    end_time: number;
    end_ampm: string;
  }
}

export type userinfo_fetch_return_type = general_fetch_return_type & {
  data?: {
    id: number;
    nickname: string;
    email: string;
  };
};

export type create_party_fetch_return_type = general_fetch_return_type & {
  data?: {
    partyid: string;
  }
}

export type get_party_fetch_return_type = general_fetch_return_type & {
  data?: {
    party: party_data_type;
  }
};

export type get_partylist_fetch_return_type = general_fetch_return_type & {
  data?: {
    parties: party_data_type[];
  }
};

