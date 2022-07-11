import {
  Account,
  BaseCampaign,
  BaseEntity,
  Campaign,
  Contact,
  Customer,
  QuestionType,
  Vouch
} from ".";

type AccountPayload = {
  email: string
}

type QuestionPayload = {
  maxduration?: number;
  optional?: boolean;
  text: string;
  type?: QuestionType;
}

type ColorConfigPayload = {
  color?: string;
  text?: string;
}

type NotePayload = {
  text: string;
};

type RequestSettingsPayload = {
  branding?: {
    base?: {
      primary?: ColorConfigPayload;
      secondary?: ColorConfigPayload;
      radius?: string;
    }
    cta?: {
      label?: string;
      url?: string;
    },
    logoSrc?: string;
  }
  cover?: {
    vouchid?: string;
  }
  labels?: {
    submission?: string;
    title?: string;
    welcome?: string;
  },
  options?: {
    sendReceiveEmail?: boolean;
    sendResponseEmail?: boolean;
    showContactForm?: boolean;
    showCoverScreen?: boolean;
    showCustomerFields?: boolean;
    showEstimatedTime?: boolean;
    showQuestionList?: boolean;
    showSummaryScreen?: boolean;
  },
  urls?: {
    terms?: string;
    policy?: string;
  },
  watch?: {
    questionPosition?: string;
  }
}

export type CreateVouchPayload = {
  account?: AccountPayload;
  vouch: {
    note?: NotePayload;
    externalid?: string;
    metadata?: object;
    questions: QuestionPayload[];
    settings?: RequestSettingsPayload;
  };
  contact: Contact;
  customer?: Customer;
}

export type UpdateVouchPayload = {
  account?: AccountPayload;
  campaign?: {
    id: string;
  };
  vouch: {
    note?: NotePayload;
    externalid?: string;
    metadata?: object;
    questions?: QuestionPayload[];
    settings?: RequestSettingsPayload;
  };
  contact?: Contact;
  customer?: Customer;
}

export type VouchApiResponse = {
  account: AccountPayload;
  entity: BaseEntity;
  campaign?: BaseCampaign;
  contact: Contact;
  customer?: Customer;
  vouch: Vouch;
}

export type CreateCampaignPayload = {
  account?: AccountPayload;
  campaign: {
    name: string;
    questions: QuestionPayload[];
    externalid?: string;
    metadata?: object;
    note?: NotePayload;
    settings?: RequestSettingsPayload;
  };
}

export type UpdateCampaignPayload = {
  account?: AccountPayload;
  campaign?: {
    name?: string;
    questions?: QuestionPayload[];
    externalid?: string;
    metadata?: object;
    note?: NotePayload;
    settings?: RequestSettingsPayload;
  };
}

export type CampaignApiResponse = {
  account: Account;
  entity: BaseEntity;
  campaign: Campaign;
}
