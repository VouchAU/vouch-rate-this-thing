import React, { FormEvent, useEffect, useState } from 'react';
import { BaseCampaign } from '../api/vouch';
import { Button } from './common/Button';
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
  const [selectedCampaign, setSelectedCampaign] = useState<BaseCampaign>();

  useEffect(() => {
    setCampaigns(props.campaigns);
  }, [props.campaigns]);

  function handleCloseCreateModal() {
    setShowCreateModal(false);
  }

  function handleSubmit(event: FormEvent<RateThisThingFormElement>) {
    console.log('Record');
  }

  function selectCampaign(campaign: BaseCampaign) {
    setSelectedCampaign(campaign);
  }

  function addCampaign(id: string, name: string, externalId: string) {
    const campaign = { id, name, externalid: externalId };
    setCampaigns((prev) => [campaign, ...prev]);
    setCampaignId(id);
    selectCampaign(campaign);
  }

  function handleNextClick() {
    if (!campaignId) return;
    const item = campaigns.find((x) => x.id === campaignId);
    if (!item) return;
    selectCampaign(item);
  }

  function handleBackClick() {
    setSelectedCampaign(undefined);
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
        {selectedCampaign ? (
          <div className="container text-center md:text-left flex flex-col mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl">Ready to record</h2>

            <h3 className="mt-8 mb-2 text-xl font-semibold tracking-tight text-gray-700">{selectedCampaign.name}</h3>

            <div className="grid grid-cols-2">
              <div>ID</div>
              <div className="font-mono">{selectedCampaign.id}</div>

              <div>External ID</div>
              <div className={!!selectedCampaign.externalid ? 'font-mono' : 'text-gray-300'}>
                {!!selectedCampaign.externalid ? selectedCampaign.externalid : 'empty'}
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <Button variant="secondary" onClick={handleBackClick}>
                Back
              </Button>

              <VouchRecorderButton campaignId={selectedCampaign.id ?? CAMPAIGN} />
            </div>
          </div>
        ) : (
          <div className="container text-center md:text-left flex flex-col mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl">Configure your Campaign</h2>

            <form onSubmit={handleSubmit} className="mt-12">
              <Select
                id="campaignInput"
                options={campaigns.map((campaign) => {
                  return {
                    id: campaign.id,
                    label: campaign.name,
                    value: campaign.id,
                  };
                })}
                label="Select a Vouch Campaign"
                value={campaignId}
                onChange={(event) => {
                  setCampaignId(event.currentTarget.value);
                }}
              />

              <p className="font-bold text-xl py-5">OR</p>

              <div>
                <button
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create new Vouch Campaign
                </button>
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="primary" onClick={handleNextClick}>
                  Next
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      <WhiteLabelCreateCampaignModal
        open={showCreateModal}
        onClose={handleCloseCreateModal}
        addCampaign={addCampaign}
      />
    </div>
  );
};

export { RateThisThingCardWhiteLabel };
