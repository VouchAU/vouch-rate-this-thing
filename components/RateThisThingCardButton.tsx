import Script from 'next/script';
import React from 'react';

const RateThisThingCardButton = () => {
  return (
    <div className="w-full text-center lg:max-w-7xl lg:mx-8">
      <div className="w-full h-96 flex justify-center">
        <div className="flex h-full max-w-lg flex-1 items-center lg:rounded-lg px-8">
          <div
            className="w-full h-96 bg-cover lg:rounded-lg lg:h-full lg:max-h-[480px]"
            style={{ backgroundImage: `url('https://picsum.photos/480')` }}
          ></div>
        </div>
      </div>

      <div className="container text-center flex flex-col mx-auto mt-16">
        <h2 className="px-12 text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl dark:text-white">
          What do you think of this photo?
        </h2>

        <p className="px-12 mt-4 text-gray-800">Click the button below to record a video response.</p>

        <div className="flex px-12 justify-center pt-8">
          <Script
            id="vouch-recorder-button-script"
            type="module"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            src="https://cdn.jsdelivr.net/npm/@vouchfor/uikit@alpha/embed/vouch-recorder-button.bundle.js"
          ></Script>

          <div
            dangerouslySetInnerHTML={{
              __html: `
<div>
	<vouch-recorder-button
		label="Record your answer"
		hid="l3sL7l6C4C"
		type="campaign"
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

export { RateThisThingCardButton };
