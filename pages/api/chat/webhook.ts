// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cuid from 'cuid';
import { createCampaign, getCampaign, getLatestCampaignResponse, updateVouch } from '../../../vouch';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Contact, VouchWebhookEventBody } from '../../../vouch/types';

const { VouchWebhookEvent } = require('@vouchfor/sdk');

const CHAT_PREFIX = 'chat.';
/*
* Helper function to encode email to external id
*/
const encodeExternalId = (email: string) => {
  return `${CHAT_PREFIX}${cuid()}.${email}`;
}

/*
* Helper function to decode email from external id
*/
const decodeExternalId = (id: string) => {
  const arr = id.split(/\w+\.{2}/g);
  return arr.pop();
}

const createChat = async (id: string, contact: Contact) => {
  console.log(`Creating new chat from campaign ${id}`);
  const existing = await getCampaign(id);
  const chat = await createCampaign({
    account: { email: existing.account.email },
    campaign: {
      externalid: encodeExternalId(contact.email),
      name: `Chat with ${contact.name}`,
      questions: existing.campaign.questions.map((question) => {
        return {
          maxduration: question.maxduration,
          optional: question.optional,
          text: question.text,
          type: question.type,
        };
      }),
      settings: {
        cover: {
          vouchid: existing.campaign.settings.cover?.vouchid,
        }
      }
    }
  });

  return chat;
}

const handleVouchResponded = async (event: VouchWebhookEventBody) => {
  const { event: { account, campaign, contact, vouch } } = event;

  if (!campaign || vouch.status !== 'RESPONDED') {
    return;
  }

  /*
  * Internal check to see if campaign is a chat - in production this should be done querying your own data source
  * We are using the External ID of the campaign to check if a chat has been initiated
  * CHAT NOT EXISTS SCENARIO: If campaign is not a chat clone campaign and notify admin
  * CHAT EXISTS SCENARIO: Notify other party that chat response has been received
  */
  const isChat = campaign.externalid?.startsWith(CHAT_PREFIX);
  const contactEmail = 'david@vouchfor.com';
  const isAdmin = account.email === contact.email;
  const receiverEmail = isAdmin ? account.email : contactEmail;

  const [ chat, cover ] = await Promise.all([
    isChat ? getCampaign(campaign.id) : createChat(campaign.id, contact),
    isChat ? getLatestCampaignResponse(campaign.id, receiverEmail) : Promise.resolve(undefined),
  ]);

  await updateVouch(vouch.id, {
    vouch: {
      settings: {
        cover: {
          vouchid: cover ? cover.vouch.id : chat.campaign.settings.cover?.vouchid,
        }
      }
    }
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(403).json({});
    return;
  }

  const { event } = req.body;
  console.log(`Handling event ${event.name}`);

  try {
    switch (event.name) {
      case VouchWebhookEvent.VOUCH_POPULATED:
      case VouchWebhookEvent.VOUCH_RESPONDED:
        await handleVouchResponded(req.body as VouchWebhookEventBody);
        break;
      default:
        break; // do nothing
    }
  } catch (err) {
    console.log(`Error handling event ${event.name} - ${err}`);
  }

  res.send({});
}

export default handler;

