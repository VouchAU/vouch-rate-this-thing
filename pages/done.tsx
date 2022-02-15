import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { SuccessCard } from '../components/SuccessCard';

const Done: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Thank you! | Rate This Thing</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <SuccessCard />
      </Main>
    </div>
  );
};

export default Done;
