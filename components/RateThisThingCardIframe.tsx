import React from 'react';

const URL = process.env.NEXT_PUBLIC_VOUCH_APP_URL;
const CAMPAIGN = process.env.NEXT_PUBLIC_VOUCH_DEFAULT_CAMPAIGN_ID;

const RateThisThingCardIframe = () => {
  return (
    <div className="w-full lg:max-w-7xl lg:mx-8 lg:flex">
      <div className="lg:w-1/2">
        <div className="flex h-full w-full flex-1 items-center lg:rounded-lg px-8">
          <div
            className="w-full h-96 bg-cover lg:rounded-lg lg:h-full lg:max-h-[480px]"
            style={{ backgroundImage: `url('https://picsum.photos/480')` }}
          ></div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 py-12 lg:max-w-3xl">
        <div className="container text-center md:text-left flex flex-col mx-auto">
          <h2 className="px-12 text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl dark:text-white">
            What do you think of this photo?
          </h2>

          <p className="px-12 mt-4 text-gray-800">Use the recorder below to send us a video response.</p>

          <div className="flex px-0 lg:px-12 pt-8">
            <div className="w-full lg:max-w-sm bg-gray-200 rounded-lg pt-12 p-4 lg:pt-4">
              {/* We use this pattern to make the iframe responsive to width, maintaining a 10:16 aspect ratio */}
              <div
                className="relative pb-[160%] pt-1 h-0" // Wrapper div for responsiveness
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full" // iframe styles for responsive content
                  id={CAMPAIGN}
                  title="Rate This Thing"
                  src={`${URL}/public/c/${CAMPAIGN}?permissions=prompt&nosupport=true&embed=inline`}
                  // src="https://app.vouchfor.com/c/XUOs2DLaQO?permissions=prompt&nosupport=true&embed=inline"

                  sandbox="allow-scripts allow-same-origin allow-forms"
                  allow={`camera ${URL}; microphone ${URL}; display-capture ${URL}; fullscreen`}
                  width="414"
                  height="736"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { RateThisThingCardIframe };
