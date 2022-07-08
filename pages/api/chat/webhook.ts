// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CampaignWebhookEventBody, VouchWebhookEventBody } from '../../../api/vouch/types';

const { VouchWebhookEvent } = require('@vouchfor/sdk');

const campaignEventHandler = async (event: CampaignWebhookEventBody) => {
  
}


const vouchEventHandler = async (event: VouchWebhookEventBody) => {

}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(403).json({});
    return;
  }

  const { event } = req.body;
  console.log(`Handling event ${event.name}`);

  switch (event) {
    case VouchWebhookEvent.VOUCH_CREATED:
    case VouchWebhookEvent.VOUCH_SENT:
    case VouchWebhookEvent.VOUCH_PUBLISHED:
    case VouchWebhookEvent.VOUCH_OPENED:
    case VouchWebhookEvent.VOUCH_REMINDED:
    case VouchWebhookEvent.VOUCH_SUBMITTED:
    case VouchWebhookEvent.VOUCH_SCHEDULED:
    case VouchWebhookEvent.VOUCH_RESPONDED:
      await vouchEventHandler(event as VouchWebhookEventBody);
      break;
    case VouchWebhookEvent.CAMPAIGN_CREATED:
    case VouchWebhookEvent.CAMPAIGN_LIVE:
    case VouchWebhookEvent.CAMPAIGN_PAUSED:
    case VouchWebhookEvent.CAMPAIGN_VIEWED:
    case VouchWebhookEvent.CAMPAIGN_STARTED:
    case VouchWebhookEvent.CAMPAIGN_RESPONDED:
    case VouchWebhookEvent.CAMPAIGN_DELETED:
      await campaignEventHandler(event as CampaignWebhookEventBody);
      break;
    default:
      break; // do nothing
  }

  res.send({});
}

export default handler;

