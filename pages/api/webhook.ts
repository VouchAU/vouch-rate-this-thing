// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { assertSignature } from './utils';
import { getCampaign, getVouch } from '../../api/vouch';

const { VouchWebhookEvent } = require('@vouchfor/sdk');
type AnonymousContact = { name: 'Anonymous'; email: null };

type Contact = { name: string; email: string };

type Campaign = {
  id: string;
  name: string;
  url: string;
};

type VouchDraft = {
  id: string;
  status: 'DRAFT';
  type: 'RESPONSE';
  url: string; // This is only a link back to the Vouch recorder
};

type VouchResponse = {
  id: string;
  status: 'RESPONDED';
  type: 'RESPONSE';
  url: string; // This is a working link to the watch page
};

type VouchCreatedOrRespondedEvent = {};

type VouchCreatedEvent = {
  name: 'vouch.created';
  timestamp: string;
  entity: { id: string; name: string; url: string };
  account: { name: string; email: string };
  contact: AnonymousContact | Contact;
  vouch: VouchDraft;
  campaign?: Campaign; // may be undefined
};

type VouchRespondedEvent = {
  name: 'vouch.responded';
  timestamp: string;
  entity: { id: string; name: string; url: string };
  account: { name: string; email: string };
  contact: AnonymousContact | Contact;
  vouch: VouchResponse;
  campaign?: Campaign; // may be undefined
};

const VOUCH_SECRET = 'RGt!/;xE+&p[F2@C';
const campaignHandler = async (campaignId: string) => {
  console.log('----------- handler -----------');
  try {
    const campaign = await getCampaign(campaignId);
    console.log('campaign', JSON.stringify(campaign, null, 2)); // contains Campaign details

    // This is where you do the application logic
  } catch (err) {
    console.log(`handler error - ${err}`);
  }
  return {}
};


const vouchHandler = async (vouchId: string) => {
  console.log('----------- handler -----------');
  try {
    const { vouch, contact } = await getVouch(vouchId);
    console.log('vouch', JSON.stringify(vouch, null, 2)); // contains Vouch response details
    console.log('contact', JSON.stringify(contact, null, 2)); // contains Vouch contact details

    // This is where you do the application logic
  } catch (err) {
    console.log(`handler error - ${err}`);
  }
  return {}
};

async function handleWebhook(req: NextApiRequest, res: NextApiResponse) {
  const { headers, body } = req;
  const signature = headers['x-vouch-signature'] as string;
  if (!assertSignature({
    secret: VOUCH_SECRET,
    signature,
    payload: JSON.stringify(body)
  })) {
    return res.status(401).send('Invalid signature');
  }
  const event = body.event.name;
  const entity = body.event.entity.id;
  const vouch = body.event.vouch?.id;
  const campaign = body.event.campaign?.id;

  console.log(`[${entity}] Handling event ${event}`);
  console.log(body.event);

  let val = {};
  switch (event) {
    case VouchWebhookEvent.VOUCH_CREATED:
    case VouchWebhookEvent.VOUCH_SENT:
    case VouchWebhookEvent.VOUCH_PUBLISHED:
    case VouchWebhookEvent.VOUCH_OPENED:
    case VouchWebhookEvent.VOUCH_REMINDED:
    case VouchWebhookEvent.VOUCH_SUBMITTED:
    case VouchWebhookEvent.VOUCH_SCHEDULED:
    case VouchWebhookEvent.VOUCH_RESPONDED:
      await vouchHandler(vouch);
      break;
    case VouchWebhookEvent.CAMPAIGN_CREATED:
    case VouchWebhookEvent.CAMPAIGN_LIVE:
    case VouchWebhookEvent.CAMPAIGN_PAUSED:
    case VouchWebhookEvent.CAMPAIGN_VIEWED:
    case VouchWebhookEvent.CAMPAIGN_STARTED:
    case VouchWebhookEvent.CAMPAIGN_RESPONDED:
    case VouchWebhookEvent.CAMPAIGN_DELETED:
      await vouchHandler(campaign);
      break;
    default:
      break; // do nothing
  }

  res.send(val);
}

