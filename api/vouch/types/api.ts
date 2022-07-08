import {
  BaseCampaign,
  BaseEntity,
  Campaign,
  Contact,
  Customer,
  QuestionType,
  RequestSettings,
  Vouch
} from "../types";

type QuestionPayload = {
  maxduration?: number;
  optional?: boolean;
  text: string;
  type?: QuestionType;
}

export type CreateVouchPayload = {
  account?: Account;
  vouch: {
    externalid?: string;
    note?: string;
    questions: QuestionPayload[];
    settings?: RequestSettings;
  };
  contact: Contact;
  customer?: Customer;
}

export type UpdateVouchPayload = {
  account?: Account;
  vouch: {
    note?: string;
    externalid?: string;
    questions: QuestionPayload[];
    settings?: RequestSettings;
  };
  contact?: Contact;
  customer?: Customer;
}

export type VouchApiResponse = {
  account: Account;
  entity: BaseEntity;
  campaign?: BaseCampaign;
  contact: Contact;
  customer?: Customer;
  vouch: Vouch;
}

export type CreateCampaignPayload = {
  account: Account;
  campaign: {
    name: string;
    questions: QuestionPayload[];
    externalid?: string;
    note?: string;
  };
}

export type UpdateCampaignPayload = {
  account?: Account;
  campaign?: {
    name?: string;
    questions?: QuestionPayload[];
    externalid?: string;
    note?: string;
  };
}

export type CampaignApiResponse = {
  account: Account;
  entity: BaseEntity;
  campaign: Campaign;
}
