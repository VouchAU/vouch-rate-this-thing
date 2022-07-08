import { BaseCampaign, BaseEntity, BaseVouch, Contact, Customer } from "../types";

export type WebhookEvent<T> = T & {
  name: string;
  timestamp: string;
}

type BaseEvent = {
  account: Account;
  entity: BaseEntity;
};

type CampaignEvent = BaseEvent & {
  campaign: BaseCampaign;
  contact: Contact;
  customer: Customer;
}

export type CampaignWebhookEventBody = {
  event: WebhookEvent<CampaignEvent>
}

type VouchEvent = BaseEvent & {
  campaign?: BaseCampaign;
  contact: Contact;
  customer?: Customer;
  vouch: BaseVouch;
}

export type VouchWebhookEventBody = {
  event: WebhookEvent<VouchEvent>
}