# Example using Vouch integration

This is a full-stack TypeScript example using:

- **Frontend**
  - Next.js
- **Backend**
  - Next.js API routes

## Demo

- Live Demo: https://vouch-rate-this-thing.herokuapp.com/
- Documentation: https://help.vouchfor.com/en/articles/5469145-can-i-create-a-unique-campaign-link-for-each-responder

## Included Functionality

- **Redirect to a Vouch Campaign**

  - [RateThisThingCard.tsx](components/RateThisThingCard.tsx) (via the [index page](/pages/index.tsx)) shows how a form can be redirected to a Vouch Campaign recorder link
  - A random `cuid` session ID is also generated
  - The Vouch redirect includes a `callback` param to the [done page](pages/done.tsx)
  - The returning redirect from Vouch includes the Vouch ID (`vouchId`) param, the original session ID (`id`) in the URL params

- **Demo an iframe embedded Vouch Recorder**

  - [RateThisThingCardIframe.tsx](components/RateThisThingCardIframe.tsx) (via the [iframe-example page](/pages/iframe-example.tsx)) shows a demo of a Campaign embed using the iframe option
  - The user can complete a Vouch without leaving the original page
  - The page includes some additional styling to show how to make a [responsive iframe](https://stackoverflow.com/a/29784327/10293336)

- **Listen to Vouch event webhook**

  - [/pages/api/webhook](/pages/api/webhook.ts) API route shows a stubbed event handler for Vouch webhook events
  - The handler focuses on two key events: `vouch.created` and `vouch.responded`
  - `vouch.created` will be transmitted immediately after the Vouch is submitted, but before it has been processed. As such it does not include a working _watch_ link
  - `vouch.responded` will be transmitted once the video is fully processed. It includes a working _watch_ link, and also lets you know that the REST API can now be used to retrieve all of the Vouch data such as the transcript

## How to use

Clone the repo to your machine and navigate into the root directory

### Required configuration

Copy the .env.local.example file into a file named .env.local in the root directory of this project:

```sh
cp .env.local.example .env.local
```

### Start the server

Install the dependencies and start the development server:

```sh
npm install
npm run dev
```

> OR

```sh
yarn
yarn dev
```

### Forward webhooks to your local server

If you want to test the webhook events, you'll need to install `ngrok` to forward a real HTTPS address to your dev server:

```sh
# After installing ngrok
ngrok http 3000
```

Take note of the `Forwarding https://...` address

```sh
# ngrok by @inconshreveable                                                                (Ctrl+C to quit)

# Session Status                online
# Session Expires               1 hour, 59 minutes
# Version                       2.3.40
# Region                        United States (us)
# Web Interface                 http://127.0.0.1:4040
# Forwarding                    http://... -> http://localhost:3000
Forwarding                    https://... -> http://localhost:3000

# Connections                   ttl     opn     rt1     rt5     p50     p90
#                               0       0       0.00    0.00    0.00    0.00
```

And then add the `https://...` address to the `Webhook URL` in your Vouch Developer dashboard:

1. Go to https://app.vouchfor.com/dashboard/developer
2. Copy and paste the `https://...` address that your `ngrok` output into the `Webhook URL`
3. Hit **Save**
