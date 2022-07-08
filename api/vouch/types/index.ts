export * from './api';
export * from './webhook';

type VouchStatus = "DRAFT" | "SENT" | "PUBLISHED" | "OPENED" | "SUBMITTED" | "RESPONDED";
type CampaignStatus = "DRAFT" | "LIVE" | "PAUSED";
export type QuestionType = "SCREEN" | "VIDEO";

export type Account = {
  name: string;
  email: string;
}

export type BaseEntity = {
  id: string;
  name: string;
  email: string;
  url: string;
}

export type Contact = {
  name: string;
  email: string;
}

export type Customer = {
  name: string;
  url?: string;
}

type Answer = {
  contact: Contact;
  customer: Customer;
  duration: number;
  label?: string;
  preview: string;
  thumbnail: string;
  transcription?: {
    sentiment: string;
    keywords: string[];
    text: string;
  }
  url?: string;
  video?: string;
}

export type Question = {
  answer?: Answer;
  maxduration: number;
  optional: boolean;
  text: string;
  type: QuestionType;
}

type ColorConfig = {
  color: string;
  text: string;
}

export type RequestSettings = {
  branding: {
    base: {
      primary: ColorConfig;
      secondary: ColorConfig;
      radius: string;
    }
    cta: {
      label: string;
      url: string;
    },
    logoSrc?: string;
  }
  labels: {
    submission: string;
    title: string;
    welcome: string;
  },
  options: {
    sendReceiveEmail: boolean;
    sendResponseEmail : boolean;
    showContactForm: boolean;
    showCoverScreen: boolean;
    showCustomerFields: boolean;
    showEstimatedTime: boolean;
    showQuestionList: boolean;
    showSummaryScreen: boolean;
  },
  urls: {
    terms: string;
    policy: string;
  },
  watch: {
    questionPosition: string;
  }
}

type BaseRequest = {
  id: string;
  admin: string;
  externalid: string;
  url: string;
}

type Request = BaseRequest & {
  note: {
    text: string;
  },
  questions: Question[];
  settings: RequestSettings;
}

export type Vouch = BaseVouch & Request;
export type BaseVouch = BaseRequest & {
  status: VouchStatus;
}

export type Campaign = BaseCampaign & Request;
export type BaseCampaign = BaseRequest & {
  name: string;
  status: CampaignStatus;
}