const VOUCH_APP_URL = process.env.VOUCH_APP_URL || 'https://staging.vouchfor.com/';
const VOUCH_CAMPAIGN_ID = process.env.VOUCH_CAMPAIGN_ID || 'ij4gfiq01U';
const CALLBACK_URL = process.env.CALLBACK_URL || 'http://localhost:3000/done';

const BASE_VOUCH_CAMPAIGN_URL = `${VOUCH_APP_URL}public/c/${VOUCH_CAMPAIGN_ID}`;

type Options = {
  name?: string;
  email?: string;
  company?: string;
  url?: string;
};

const getRedirectUrl = (id: string, options: Options): string => {
  const baseUrl = `${BASE_VOUCH_CAMPAIGN_URL}?callback=${encodeURIComponent(CALLBACK_URL)}&id=${id}`;

  const url = new URL(baseUrl);

  if (options.name) url.searchParams.append('name', options.name);
  if (options.email) url.searchParams.append('email', options.email);
  if (options.company) url.searchParams.append('company', options.company);
  if (options.url) url.searchParams.append('url', options.url);

  return url.toString();
};

const getWatchUrl = (vouchId: string): string => `${VOUCH_APP_URL}public/w/${vouchId}`;

export { getRedirectUrl, getWatchUrl };
