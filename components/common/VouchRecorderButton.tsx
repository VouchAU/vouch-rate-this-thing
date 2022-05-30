import Script from 'next/script';

type Props = {
  campaignId: string;
};

const VouchRecorderButton = ({ campaignId }: Props) => (
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
		label="Record your answer"
		hid="${campaignId}"
		type="campaign"
    userearcamera="true"
		style="--vu-embed-dialogue-color:#000000;--vu-embed-dialogue-bg-color:#FFFFFF;--vm-slider-value-color: #FFFFFF;--vu-recorder-button-bg-color:#2563eb;--vu-recorder-button-color: #FFFFFF;--vu-recorder-button-border-color:#2563eb;--vu-recorder-button-radius:8px;"
	/>
</div>`,
      }}
    />
  </>
);

export { VouchRecorderButton };
