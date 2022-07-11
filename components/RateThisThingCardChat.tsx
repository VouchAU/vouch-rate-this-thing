import React, { useEffect, useState } from 'react';
import { getCampaign, getLatestCampaignResponse } from '../vouch';
import { Spinner } from './common/Spinner';
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
  const [title, setTitle] = useState<string>('Start Chat');
  const [recordLabel, setRecordLabel] = useState<string>('Respond');
  const [query, setQuery] = useState<string>('');
  const [vouchId, setVouchId] = useState<string | undefined>('');

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
      const q = new URLSearchParams();
      if (activeParty) {
        q.append('email', activeParty.email);
        q.append('name', activeParty.name);
      }

      if (coverVouchId) {
        q.append('cover', coverVouchId);
      }

      const name = inactiveParty?.name || res.account.name;
      setQuery(q.toString() ? `?${q.toString()}` : '');
      setRecordLabel(`Respond to ${name}`);
      setTitle(`Chat with ${name}`);
      setVouchId(coverVouchId);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    init();
  }, [campaignId, index]);

  return (
    <div className="container text-center flex flex-col mx-auto">
      <div className="flex justify-center">
        <div className="flex flex-1 items-center lg:rounded-lg px-8">
          <div
            className="w-full h-96 bg-cover lg:rounded-lg lg:h-full"
          >
          {
            vouchId ? (
              <div>
                <h2 className="px-12 text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl mb-6">
                  {title}
                </h2>
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
                      showcontrol="true"
                      answeronly="true"
                      vouchid={vouchId}
                      apikey={process.env.NEXT_PUBLIC_VOUCH_EMBED_KEY}
                      responsive="true"
                      orientation="landscape"
                      fitcover="true"
                      style={{
                        "--vu-embed-inline-player-color": "#FFFFFF",
                        "--vu-embed-inline-player-bg-color": "#000000",
                      }}
                    />
                  </div>
                  <div className="py-8">
                    <VouchRecorderButton
                      campaignId={campaignId}
                      label={recordLabel}
                      query={query}
                    />
                  </div>
                </div>
              </div>
            ) : <Spinner />
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export { RateThisThingCardChat };
