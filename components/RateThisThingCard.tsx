import cuid from 'cuid';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { getRedirectUrl } from '../utils/get-redirect-url';
import { Input } from './common/Input';

// thanks https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface FormElements extends HTMLFormControlsCollection {
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  companyInput: HTMLInputElement;
  companyUrlInput: HTMLInputElement;
}

interface RateThisThingFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const RateThisThingCard = () => {
  const router = useRouter();
  const [sessionId] = useState(cuid());

  function handleSubmit(event: FormEvent<RateThisThingFormElement>) {
    event.preventDefault();
    const { nameInput, emailInput, companyInput, companyUrlInput } = event.currentTarget.elements;

    const redirectUrl = getRedirectUrl(sessionId, {
      name: nameInput.value,
      email: emailInput.value,
      company: companyInput.value,
      url: companyUrlInput.value,
    });

    router.push(redirectUrl);
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
          <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl dark:text-white">
            What do you think of this photo?
          </h2>

          <p className="mt-4 text-gray-800 ">Follow the link below to leave us a video response.</p>

          <form onSubmit={handleSubmit} className="mt-12 sm:-mx-2 space-y-3">
            <Input id="nameInput" label="Your name" type="text" autoFocus />
            <Input id="emailInput" label="Your email address" type="text" />
            <Input id="companyInput" label="Your company" placeholder="Optional" type="text" />
            <Input id="companyUrlInput" label="Your company URL" placeholder="Optional" type="text" />

            <div className="pt-8 inline-flex w-full sm:w-auto">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Answer a couple of questions
              </button>
            </div>

            <div className="inline-flex w-full mt-4 sm:w-auto sm:mt-0">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  window.location.reload();
                }}
                className="inline-flex items-center justify-center w-full px-6 py-3 text-gray-700 transition-colors duration-150 transform bg-white rounded-lg dark:bg-gray-900 hover:bg-gray-100 dark:text-white sm:w-auto dark:hover:bg-gray-800 dark:ring-gray-700 focus:ring focus:ring-gray-200 focus:ring-opacity-80"
              >
                Show me a new thing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { RateThisThingCard };
