import React, { useEffect, useState } from 'react';
import { BaseCampaign } from '../vouch/types';
import { VouchRecorderButton } from './common/VouchRecorderButton';

const CAMPAIGN = process.env.NEXT_PUBLIC_VOUCH_DEFAULT_CAMPAIGN_ID ?? '';

const RateThisThingCardChat = () => {
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
              vouchid="yyRej5IyFF"
              apikey="2NIQjZ9sre-Q3sLuslKcVIiIa4QrGgt8BI4eIkS6SseFtuVg3Oj9tZpcQ51HL"
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
            <VouchRecorderButton campaignId={CAMPAIGN} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { RateThisThingCardChat };
