import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { RateThisThingCardButton } from '../components/RateThisThingCardButton';

const ButtonExamplePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tell us what you think of this photo - Button | Rate This Thing</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <RateThisThingCardButton />
      </Main>
    </div>
  );
};

export default ButtonExamplePage;
