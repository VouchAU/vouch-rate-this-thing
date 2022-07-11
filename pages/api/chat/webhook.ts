// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import cuid from 'cuid';
import { createCampaign, getCampaign, getLatestCampaignResponse, updateVouch } from '../../../vouch';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Account, CampaignApiResponse, Contact, VouchWebhookEventBody } from '../../../vouch/types';

const { VouchWebhookEvent } = require('@vouchfor/sdk');
enum ChatEvent {
  CREATED,
  RESPONDED
}

const url = 'https://c971-2001-8003-230a-5a00-d83d-e229-d715-4da0.ngrok.io'

const sendSlackMessage = (text: string) => {
  return axios.post('https://slack.com/api/chat.postMessage', {
    channel: 'vouchdev',
    text,
  }, {
    headers: {
      Authorization: `Bearer xoxb-1115124596868-2663203443362-a7gxuuOLkAHDndBFfKxiYdYA`,
      'content-type': 'application/json',
    }
  })
}

/*
* Notification Function to handle chat event
*/
const notify = async (event: ChatEvent, chat: CampaignApiResponse, contact: Contact) => {
  let text ='';
  switch (event) {
    case ChatEvent.CREATED:
      text = `Chat initiated by *${contact.name} (${contact.email})*\n\n`
        + `*Owner Link:* ${url}/chat-example/${chat.campaign.id}/1\n`
        + `*Contact Link:* ${url}/chat-example/${chat.campaign.id}/2`
      break;
    case ChatEvent.RESPONDED:
      text = `*${contact.name} (${contact.email})* has responded to chat.`
      break;
    default:
      break;
  }

  if (text) {
    return sendSlackMessage(text);
  }
}

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
  const arr = id.split(/([^\.]+\.){2}/g);
  return arr.pop();
}

const createChat = async (id: string, account: Account, contact: Contact) => {
  console.log(`Creating new chat from campaign ${id}`);
  const existing = await getCampaign(id);
  const chat = await createCampaign({
    account: { email: existing.account.email },
    campaign: {
      externalid: encodeExternalId(contact.email),
      metadata: {
        owner: account,
        contact,
      },
      name: `Chat with ${contact.name}`,
      note: existing.campaign.note.text ? existing.campaign.note : undefined,
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

  await notify(ChatEvent.CREATED, chat, contact);
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
  const contactEmail = campaign.externalid && isChat ? decodeExternalId(campaign.externalid) : contact.email;
  const receiverEmail = contact.email === contactEmail ? account.email : contact.email;

  const [ chat, cover ] = await Promise.all([
    isChat ? getCampaign(campaign.id) : createChat(campaign.id, account, contact),
    isChat ? getLatestCampaignResponse(campaign.id, receiverEmail) : Promise.resolve(undefined),
  ]);

  await Promise.all([
    isChat ? notify(ChatEvent.RESPONDED, chat, contact) : Promise.resolve(undefined),
    updateVouch(vouch.id, {
      campaign: {
        id: chat.campaign.id,
      },
      vouch: {
        settings: {
          cover: {
            vouchid: cover ? cover.vouch.id : chat.campaign.settings.cover?.vouchid,
          }
        }
      }
    })
  ]);
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

