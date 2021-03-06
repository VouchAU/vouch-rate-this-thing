import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { RateThisThingCard } from '../components/RateThisThingCard';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tell us what you think of this photo | Rate This Thing</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <RateThisThingCard />
      </Main>
    </div>
  );
};

export default Home;
