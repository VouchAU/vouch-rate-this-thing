import Script from 'next/script';

type Props = {
  campaignId: string;
  label?: string;
  type?: 'campaign' | 'vouch';
  useRearCamera?: boolean;
  query?: string;
};

const VouchRecorderButton = ({ campaignId, label, type, useRearCamera, query }: Props) => (
  <>
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
		label="${label ?? 'Record your answer'}"
		hid="${campaignId}"
		type="${type ?? 'campaign'}"
    userearcamera="${useRearCamera !== undefined ? useRearCamera : true}"
    ${query ? `query="${query}"` : ''}
		style="--vu-embed-dialogue-color:#000000;--vu-embed-dialogue-bg-color:#FFFFFF;--vm-slider-value-color: #FFFFFF;--vu-recorder-button-bg-color:#2563eb;--vu-recorder-button-color: #FFFFFF;--vu-recorder-button-border-color:#2563eb;--vu-recorder-button-radius:8px;"
	/>
</div>`,
      }}
    />
  </>
);

export { VouchRecorderButton };
