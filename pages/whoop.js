import Head from 'next/head';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';

const Whoop = () => {
  return (
    <div>
      <Head>
        <title>Whoop</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main>
        <iframe
          id="2i96wlOp21"
          title="Give em one of these"
          src="https://staging.vouchfor.com/public/c/2i96wlOp21"
          sandbox="allow-scripts allow-same-origin allow-forms"
          allow="camera https://staging.vouchfor.com; microphone https://staging.vouchfor.com; display-capture https://staging.vouchfor.com;
           fullscreen"
          width="414"
          height="736"
        ></iframe>{' '}
      </Main>
    </div>
  );
};

export default Whoop;
