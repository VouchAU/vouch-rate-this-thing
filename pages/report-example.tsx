import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { RateThisThingCardReport } from '../components/RateThisThingCardReport';

const ButtonExamplePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Find something you want to rate? | Rate This Thing</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <RateThisThingCardReport />
      </Main>
    </div>
  );
};

export default ButtonExamplePage;
