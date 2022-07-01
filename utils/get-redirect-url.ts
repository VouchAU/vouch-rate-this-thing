const VOUCH_APP_URL = process.env.NEXT_PUBLIC_VOUCH_APP_URL || '';
const VOUCH_CAMPAIGN_ID = process.env.NEXT_PUBLIC_VOUCH_DEFAULT_CAMPAIGN_ID || '';
const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL || '';

const BASE_VOUCH_CAMPAIGN_URL = `${VOUCH_APP_URL}/public/c/${VOUCH_CAMPAIGN_ID}`;

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
