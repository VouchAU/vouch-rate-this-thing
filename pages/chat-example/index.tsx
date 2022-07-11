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
        <div className="w-full text-center lg:max-w-7xl lg:mx-8">
          <div className="container text-center flex flex-col mx-auto mt-16">
            <h2 className="px-12 text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl">
              Start a chat below
            </h2>
          </div>
          <RateThisThingCardChat campaignId={CAMPAIGN_ID} />
        </div>
      </Main>

    </div>
  );
};

export default ChatExamplePage;
