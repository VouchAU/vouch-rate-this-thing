import Head from 'next/head';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';

const Shoop = () => {
  return (
    <div>
      <Head>
        <title>Shoop</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <iframe
          id="qJV8I83SIX"
          title="Jay's fantastic campaign full of testing and debugging"
          src="https://staging.vouchfor.com/public/c/qJV8I83SIX"
          sandbox="allow-scripts allow-same-origin allow-forms"
          allow="camera https://staging.vouchfor.com; microphone https://staging.vouchfor.com; fullscreen"
          width="414"
          height="736"
        ></iframe>{' '}
      </Main>
    </div>
  );
};

export default Shoop;
