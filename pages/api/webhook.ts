// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

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

function handleVouchCreated(event: VouchCreatedEvent) {
  console.log('~ Handle vouch.created event \n', event);
  // At this point the Vouch is still being processed, so there are NO transcriptions, nor a public watch link
}

function handleVouchResponded(event: VouchRespondedEvent) {
  console.log('~ Handle vouch.responded event \n', event);
  // After receiving this event, you can use the `event.vouch.url` to link to the player, or query the REST API to query for the full transcript
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { event } = req.body;

  switch (event.name) {
    case 'vouch.created':
      handleVouchCreated(event as VouchCreatedEvent);
      break;
    case 'vouch.responded':
      handleVouchResponded(event as VouchRespondedEvent);
      break;
  }

  res.status(200).json({ name: 'John Doe' });
}
