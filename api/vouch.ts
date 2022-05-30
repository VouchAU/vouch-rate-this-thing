const VouchClient = require('@vouchfor/sdk');
const vouchClient = new VouchClient({
  env: 'staging',
  apiKey: 'rqcxIuZ7Ct-XS8W97w7b0nkShCcQxYuGDMOzJx3h6RBzFEv0etzE8AOCHuO27'
});

interface Contact {
  email?: string;
  name?: string;
}

interface Customer {
  name?: string;
  url?: string;
}

interface Transcription {
  sentiment?: string;
  keywords?: string[];
  text?: string;
}

interface Answer extends Transcription {
  contact: Contact;
  customer: Customer;
  duration: number;
  label?: string;
  url?: string;
  preview: string;
  thumbnail: string;
  video?: string;
}

enum QuestionType {
  SCREEN = 'SCREEN',
  VIDEO = 'VIDEO'
}

interface Question {
  answer?: Answer
  maxduration: number;
  optional: boolean;
  text: string;
  type: QuestionType;
}

interface Vouch {
  id: string;
  name: string;
  externalid: string;
  questions: Question[]
}

export interface BaseCampaign {
  id: string;
  name: string;
  externalid: string;
}

interface CreateCampaignPayload {
  name: string;
  externalid?: string;
}

interface UpdateCampaignPayload {
  name?: string;
  externalid?: string;
}

interface Vouch {
  id: string;
  name: string;
  externalid: string;
}

export const getVouch = async (id: string): Promise<Vouch> => {
  return vouchClient.vouches.get(id);
}

export const getCampaign = async (id: string): Promise<BaseCampaign> => {
  return vouchClient.campaigns.get(id);
}

export const createCampaign = async (payload: CreateCampaignPayload): Promise<BaseCampaign> => {
  const result = await vouchClient.campaigns.create(payload);
  return result.campaign;
}

export const updateCampaign = async (id: string, payload: UpdateCampaignPayload): Promise<BaseCampaign> => {
  const result = await vouchClient.campaigns.update(id, payload);
  return result.campaign;
}

export const listCampaigns = async (): Promise<BaseCampaign[]> => {
  const result = await vouchClient.campaigns.list();
  return result.campaigns || [];
}