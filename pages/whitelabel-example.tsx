import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { RateThisThingCardWhiteLabel } from '../components/RateThisThingCardWhiteLabel';
import { BaseCampaign, listCampaigns } from '../api/vouch';

const WhitelabelExamplePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { data } = props;

  return (
    <div>
      <Head>
        <title>Configure your Campaign | Rate This Thing</title>
        <meta name="description" content="Vouch integration demo: Rate This Thing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Main>
        <RateThisThingCardWhiteLabel campaigns={data} />
      </Main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ data: Array<BaseCampaign> }> = async (context) => {
  let data: Array<BaseCampaign> = [];
  try {
    data = await listCampaigns();
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      data,
    },
  };
};

export default WhitelabelExamplePage;
