import { BaseCampaign, BaseVouch, Campaign, CampaignApiResponse, CreateCampaignPayload, UpdateCampaignPayload, UpdateVouchPayload, Vouch, VouchApiResponse } from "./types";

const VouchClient = require('@vouchfor/sdk');
const vouchClient = new VouchClient({
  env: process.env.NEXT_PUBLIC_VOUCH_ENV,
  apiKey: process.env.NEXT_PUBLIC_VOUCH_API_KEY,
});

export const getVouch = (id: string): Promise<VouchApiResponse> => {
  return vouchClient.vouches.get(id);
};

export const updateVouch = (id: string, payload: UpdateVouchPayload): Promise<VouchApiResponse> => {
  return vouchClient.vouches.update(id, payload);
};

export const getCampaign = (id: string): Promise<CampaignApiResponse> => {
  return vouchClient.campaigns.get(id);
};

export const createCampaign = (payload: CreateCampaignPayload): Promise<CampaignApiResponse> => {
  return vouchClient.campaigns.create(payload);
};

export const updateCampaign = async (id: string, payload: UpdateCampaignPayload): Promise<BaseCampaign> => {
  const result = await vouchClient.campaigns.update(id, payload);
  return result.campaign;
};

export const listCampaigns = async (): Promise<BaseCampaign[]> => {
  const result = await vouchClient.campaigns.list();
  return result.campaigns || [];
};

export const listCampaignVouches = async (id: string): Promise<BaseVouch[]> => {
  const result = await vouchClient.campaigns.vouches(id);
  return result.campaigns || [];
};

export const getLatestCampaignResponse = async (id: string, email?: string): Promise<VouchApiResponse | undefined> => {
  const baseVouches = await listCampaignVouches(id);
  const populated = await Promise.all(
    baseVouches.map((vouch) => {
      return getVouch(vouch.id);
    })
  );

  if (email) {
    return populated.find((vouch) => vouch.contact.email === email);
  }

  return populated[0];
};