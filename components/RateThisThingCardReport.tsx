import Script from 'next/script';
import React from 'react';

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
          <Script
            id="vouch-recorder-button-script"
            type="module"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            src="https://cdn.jsdelivr.net/npm/@vouchfor/uikit@beta/embed/vouch-recorder-button.bundle.js"
          ></Script>

          <div
            dangerouslySetInnerHTML={{
              __html: `
<div>
	<vouch-recorder-button
		label="Record your answer"
		hid="${CAMPAIGN}"
		type="campaign"
    userearcamera="true"
		style="--vu-embed-dialogue-color:#000000;--vu-embed-dialogue-bg-color:#FFFFFF;--vm-slider-value-color: #FFFFFF;--vu-recorder-button-bg-color:#2563eb;--vu-recorder-button-color: #FFFFFF;--vu-recorder-button-border-color:#2563eb;--vu-recorder-button-radius:8px;"
	/>
</div>`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { RateThisThingCardReport };
