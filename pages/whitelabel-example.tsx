import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { ConfigureRequestCard } from '../components/ConfigureRequestCard';

const WhitelabelExamplePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Configure your Campaign | Rate This Thing</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Main>
        <ConfigureRequestCard />
      </Main>
    </div>
  );
};

export default WhitelabelExamplePage;
