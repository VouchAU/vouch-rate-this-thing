import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Main } from '../../components/Main';
import { Nav } from '../../components/Nav';
import { RateThisThingCardChat } from '../../components/RateThisThingCardChat';

/*
/ chat-example
/ chat-example/[chatid]?email=daniel@vouchfor.com&name=DanielShein&party=david@vouchfor.com
*/

const ChatExampleResponsePage: NextPage = () => {
  const router = useRouter()
  const { campaignid, email, name, participant } = router.query

  return (
    <div>
      <Head>
        <title>Tell us what you think of this photo - chat | Rate This Thing</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <RateThisThingCardChat
          campaignId={campaignid as string}
          email={email as string}
          name={name as string}
          participant={participant as string}
        />
      </Main>

    </div>
  );
};

export default ChatExampleResponsePage;
