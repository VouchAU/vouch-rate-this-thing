import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Main } from '../../../components/Main';
import { Nav } from '../../../components/Nav';
import { RateThisThingCardChat } from '../../../components/RateThisThingCardChat';

const ChatExampleResponsePage: NextPage = () => {
  const router = useRouter();
  const { campaignid, index } = router.query;
  const [idx, setIndex] = useState<1 | 2 | undefined>();
  useEffect(() => {
    const num = Number(index);
    if (num === 1) {
      setIndex(1);
    } else if (num === 2) {
      setIndex(2);
    }
  }, [index]);


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
          {
            campaignid && idx ? (
              <RateThisThingCardChat
                campaignId={campaignid as string}
                index={idx}
              />
            ) : null
          }
        </div>
      </Main>
    </div>
  );
};

export default ChatExampleResponsePage;
