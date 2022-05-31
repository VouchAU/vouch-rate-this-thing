import React, { FormEvent, useEffect, useState } from 'react';
import { BaseCampaign } from '../api/vouch';
import { Select } from './common/Select';
import { Spinner } from './common/Spinner';
import { VouchRecorderButton } from './common/VouchRecorderButton';
import { WhiteLabelCreateCampaignModal } from './WhiteLabelCreateCampaignModal';

const CAMPAIGN = process.env.NEXT_PUBLIC_VOUCH_DEFAULT_CAMPAIGN_ID ?? '';

// thanks https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface FormElements extends HTMLFormControlsCollection {
  campaignInput: HTMLInputElement;
}

interface RateThisThingFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  campaigns: Array<BaseCampaign>;
};

const RateThisThingCardWhiteLabel = (props: Props) => {
  const [campaigns, setCampaigns] = useState<BaseCampaign[]>([]);
  const [campaignId, setCampaignId] = useState<string | undefined>(undefined);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setCampaigns(props.campaigns);
  }, [props.campaigns]);

  function handleCloseCreateModal() {
    setShowCreateModal(false);
  }

  function handleChange(event: FormEvent<RateThisThingFormElement>) {
    event.preventDefault();
    const { campaignInput } = event.currentTarget.elements;
    if (campaignInput) {
      setCampaignId(campaignInput.value);
    }
  }

  function handleSubmit(event: FormEvent<RateThisThingFormElement>) {
    console.log('Record');
  }

  if (isLoading) {
    return (
      <div className="flex mx-auto mt-10 justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white  w-full lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
      <div className="lg:w-1/2">
        <div
          className="h-96 bg-cover lg:rounded-lg lg:h-full bg-gray-200"
          style={{ backgroundImage: `url('https://picsum.photos/480')` }}
        ></div>
      </div>
      <div className="w-full lg:w-1/2 px-12 py-12 lg:max-w-3xl">
        <div className="container text-center md:text-left flex flex-col mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl">Configure Your Campaign</h2>

          <form onChange={handleChange} onSubmit={handleSubmit} className="mt-12">
            <Select
              id="campaignInput"
              options={campaigns.map((campaign) => {
                return {
                  id: campaign.id,
                  label: campaign.name,
                  value: campaign.id,
                };
              })}
              label="Select Campaign"
              value={campaignId}
            />

            <p className="font-bold text-xl py-5">OR</p>

            <div>
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => setShowCreateModal(true)}
              >
                Create new campaign
              </button>
            </div>

            <p className="font-bold text-xl py-5">THEN</p>

            <div className="inline-flex w-full sm:w-auto">
              <VouchRecorderButton campaignId={campaignId ?? CAMPAIGN} />
            </div>
          </form>
        </div>
      </div>

      <WhiteLabelCreateCampaignModal open={showCreateModal} onClose={handleCloseCreateModal} />
    </div>
  );
};

export { RateThisThingCardWhiteLabel };
