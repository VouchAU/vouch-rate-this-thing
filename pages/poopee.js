import Head from 'next/head';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';

const Poopee = () => {
  const CONFIG = {
    url: 'http://localhost:3000',
    fullScreenUrl: 'https://staging.vouchfor.com/public/c/ij4gfiq01U',
  };

  const csp = [
    'frame-src *',
    "script-src * 'unsafe-inline'",
    "script-src-elem * 'unsafe-inline'",
    "style-src * 'unsafe-inline'",
  ];

  return (
    <div>
      <Head>
        <title>Poopee</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main className="lg:bg-green-100">
        <iframe
          id="ij4gfiq01U"
          title="Testing Submitted vs. Responded"
          src="https://staging.vouchfor.com/public/c/ij4gfiq01U"
          sandbox="allow-scripts allow-same-origin allow-forms"
          allow="camera https://staging.vouchfor.com; microphone https://staging.vouchfor.com; fullscreen"
          width="414"
          height="736"
        ></iframe>{' '}
      </Main>
    </div>
  );
};

export default Poopee;
