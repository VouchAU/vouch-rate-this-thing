import React, { FormEvent, useEffect, useState } from 'react';
import { Select } from './common/Select';
import { Spinner } from './common/Spinner';
import { BaseCampaign, listCampaigns } from '../api/vouch';
import { Modal } from './common/Modal';
import { ConfigureRequestForm } from './ConfigureRequestForm';

// thanks https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface FormElements extends HTMLFormControlsCollection {
  campaignInput: HTMLInputElement;
}

interface RateThisThingFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const ConfigureRequestCard = () => {
  const [campaigns, setCampaigns] = useState<BaseCampaign[]>([]);
  const [campaignId, setCampaignId] = useState<string | undefined>(undefined);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCampaigns();
  }, [])

  async function getCampaigns() {
    setLoading(true);
    try {
      const data = await listCampaigns();
      setCampaigns(data);
    } catch (_) {
      setCampaigns([]);
    }
    setLoading(false);
  }

  function handleChange(event: FormEvent<RateThisThingFormElement>) {
    event.preventDefault();
    const { campaignInput } = event.currentTarget.elements;
    if (campaignInput) {
      setCampaignId(campaignInput.value);
    }
  }

  function handleCreate(id: string) {
    setCampaignId(id);
    getCampaigns()
  }

  function handleRecord() {
    setShowCreateModal(false);
    setShowRecordModal(true);
  }

  function handleSubmit(event: FormEvent<RateThisThingFormElement>) {
    console.log('Record');
  }

  if (isLoading) {
    return (
      <div className="flex mx-auto mt-10 justify-center">
        <Spinner />
      </div>
    )
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
          <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl">
            Configure Your Campaign
          </h2>

          <form onChange={handleChange} onSubmit={handleSubmit} className="mt-12">
            <Select
              id="campaignInput"
              options={
                campaigns.map((campaign) => {
                  return {
                    id: campaign.id,
                    label: campaign.name,
                    value: campaign.id,
                  }
                })
              }
              label='Select Campaign'
              value={campaignId}
            />
            <div>
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => setShowCreateModal(true)}
              >
                Create new campaign
              </button>
            </div>
            <div className="pt-8 inline-flex w-full sm:w-auto">
              <button
                type="button"
                className="inline-flex items-center justify-center w-full px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                onClick={() => handleRecord()}
              >
                Record
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        open={showRecordModal}
        title="Record"
        onClose={() => setShowRecordModal(false)}
      >
        <div className="w-full lg:w-1/2 py-12 lg:max-w-3xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full" // iframe styles for responsive content
            id="l3sL7l6C4C"
            title="Rate This Thing"
            src="https://dev.vouchfor.com/public/c/l3sL7l6C4C?permissions=prompt&nosupport=true"
            sandbox="allow-scripts allow-same-origin allow-forms"
            allow="camera https://dev.vouchfor.com; microphone https://dev.vouchfor.com; display-capture https://dev.vouchfor.com; fullscreen"
            width="414"
            height="736"
          ></iframe>
        </div>
      </Modal>
      <Modal
        open={showCreateModal}
        title="Create Campaign"
        onClose={() => setShowCreateModal(false)}
        onSave={async () => console.log('xxxx')}
      >
        <ConfigureRequestForm onSubmit={() => console.log('xxxx')} />
      </Modal>
    </div>
  );
};

export { ConfigureRequestCard };
