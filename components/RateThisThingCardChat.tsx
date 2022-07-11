import React, { useEffect, useState } from 'react';
import { getCampaign, getLatestCampaignResponse } from '../vouch';
import { VouchRecorderButton } from './common/VouchRecorderButton';

type Party = undefined | {
  email: string
  name: string
}

type Props = {
  campaignId: string;
  index?: 1 | 2;
}

const RateThisThingCardChat = (props: Props) => {
  const { campaignId, index } = props;
  const [vouchId, setVouchId] = useState<string | undefined>('');
  const [query, setQuery] = useState<string>('');

  async function init() {
    if (!campaignId) {
      return
    }

    try {
      const res = await getCampaign(campaignId);
      const owner = res.campaign.metadata?.owner as Party;
      const contact = res.campaign.metadata?.contact as Party;

      const activeParty = index === 1 ? owner : contact;
      const inactiveParty = index === 1 ? contact : owner;

      const cover = index && inactiveParty?.email
        ? await getLatestCampaignResponse(campaignId, inactiveParty.email)
        : undefined

      const coverVouchId = cover?.vouch.id || res.campaign.settings.cover?.vouchid;
      const q = new URLSearchParams({});
      if (activeParty) {
        q.append('email', activeParty.email);
      }

      if (activeParty) {
        q.append('name', activeParty.name);
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
  }, [campaignId, index]);


  return (
    <div>
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
