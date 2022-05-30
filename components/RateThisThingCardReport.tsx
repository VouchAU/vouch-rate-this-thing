import React from 'react';
import { VouchRecorderButton } from './common/VouchRecorderButton';

const CAMPAIGN = process.env.NEXT_PUBLIC_VOUCH_DEFAULT_CAMPAIGN_ID;

const RateThisThingCardReport = () => {
  return (
    <div className="w-full text-center lg:max-w-7xl lg:mx-8">
      <div className="container text-center flex flex-col mx-auto mt-16">
        <h2 className="px-12 text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl dark:text-white">
          Find something you want to rate?
        </h2>

        <p className="px-12 mt-4 text-gray-800">Click the button below to record and rate what you see.</p>

        <div className="flex px-12 justify-center pt-8 pb-16">
          <VouchRecorderButton campaignId={CAMPAIGN} />
        </div>
      </div>
    </div>
  );
};

export { RateThisThingCardReport };
