import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from '../../components/Main';
import { Nav } from '../../components/Nav';
import { RateThisThingCardChat } from '../../components/RateThisThingCardChat';

const CAMPAIGN_ID = process.env.NEXT_PUBLIC_VOUCH_DEFAULT_CHAT_CAMPAIGN_ID || '';
const ChatExamplePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tell us what you think of this photo - chat | Rate This Thing</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <RateThisThingCardChat campaignId={CAMPAIGN_ID} />
      </Main>

    </div>
  );
};

export default ChatExamplePage;
