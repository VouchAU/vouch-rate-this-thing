import { BaseCampaign, CampaignApiResponse, CreateCampaignPayload, UpdateCampaignPayload, UpdateVouchPayload, VouchApiResponse } from "./types";

const VouchClient = require('@vouchfor/sdk');
const vouchClient = new VouchClient({
  env: process.env.NEXT_PUBLIC_VOUCH_ENV,
  apiKey: process.env.NEXT_PUBLIC_VOUCH_API_KEY,
});

export const getVouch = async (id: string): Promise<VouchApiResponse> => {
  return vouchClient.vouches.get(id);
};

export const updateVouch = async (id: string, payload: UpdateVouchPayload): Promise<VouchApiResponse> => {
  return vouchClient.vouches.get(id, payload);
};

export const getCampaign = async (id: string): Promise<CampaignApiResponse> => {
  return vouchClient.campaigns.get(id);
};

export const createCampaign = async (payload: CreateCampaignPayload): Promise<BaseCampaign> => {
  const result = await vouchClient.campaigns.create(payload);
  return result.campaign;
};

export const updateCampaign = async (id: string, payload: UpdateCampaignPayload): Promise<BaseCampaign> => {
  const result = await vouchClient.campaigns.update(id, payload);
  return result.campaign;
};

export const listCampaigns = async (): Promise<BaseCampaign[]> => {
  const result = await vouchClient.campaigns.list();
  return result.campaigns || [];
};
