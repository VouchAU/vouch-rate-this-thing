import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getCampaign, getLatestCampaignResponse } from '../vouch';
import { VouchRecorderButton } from './common/VouchRecorderButton';

type Props = {
  campaignId: string;
  email?: string;
  name?: string;
  participant?: string;
}

const RateThisThingCardChat = (props: Props) => {
  const { campaignId, email, name, participant } = props;
  const [vouchId, setVouchId] = useState<string | undefined>('');
  const [query, setQuery] = useState<string>('');

  async function init() {
    if (!campaignId) {
      return
    }

    try {
      const [ res, cover ] = await Promise.all([
        getCampaign(campaignId),
        participant ? getLatestCampaignResponse(campaignId, participant) : Promise.resolve(undefined),
      ]);

      const coverVouchId = cover?.vouch.id || res.campaign.settings.cover?.vouchid;
      const q = new URLSearchParams({});
      if (email) {
        q.append('email', email);
      }

      if (name) {
        q.append('name', name);
      }

      if (coverVouchId) {
        q.append('cover', coverVouchId);
      }

      setQuery(q.keys.length ? `?${q.toString()}` : '');
      setVouchId(coverVouchId);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    init();
  }, [campaignId]);


  return (
    <div className="w-full text-center lg:max-w-7xl lg:mx-8">
      <div className="container text-center flex flex-col mx-auto mt-16">
        <h2 className="px-12 text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl">
          Start a chat below
        </h2>
      </div>
      <div className="w-full h-96 flex justify-center mt-10">
        <div className="flex h-full max-w-lg flex-1 items-center lg:rounded-lg px-8">
          <div
            className="w-full h-96 bg-cover lg:rounded-lg lg:h-full lg:max-h-[480px]"
          >
          {
            vouchId ? (
              <div>
                <script
                  type="module"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  src="https://cdn.jsdelivr.net/npm/@vouchfor/uikit@beta/embed/vouch-embed-inline-player.bundle.js">
                </script>
                <div>
                  <vouch-embed-inline-player
                    showname="true"
                    showlogo="true"
                    showcaption="true"
                    showcontrol="true"
                    autoplay="true"
                    answeronly="true"
                    vouchid={vouchId}
                    apikey={process.env.NEXT_PUBLIC_VOUCH_EMBED_KEY}
                    responsive="true"
                    orientation="portrait"
                    fitcover="true"
                    style={{
                      "--vu-embed-inline-player-color": "#FFFFFF",
                      "--vu-embed-inline-player-bg-color": "#000000",
                    }}
                  />
                </div>
                <div className="mt-8">
                  <VouchRecorderButton
                    campaignId={campaignId}
                    query={query}
                  />
                </div>
              </div>
            ) : null
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export { RateThisThingCardChat };
