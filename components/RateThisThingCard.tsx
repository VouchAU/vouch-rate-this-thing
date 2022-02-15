import { useRouter } from 'next/router';
import React, { FormEvent, InputHTMLAttributes } from 'react';
import getRedirectUrl from '../utils/get-redirect-url';

const Input = ({ id, label, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="text-left">
    <label className="text-gray-700 dark:text-gray-200" htmlFor={id}>
      {label}
      {rest.required ? <span className="text-red-500 ml-2">*</span> : null}
    </label>
    <input
      id={id}
      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
      {...rest}
    />
  </div>
);

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

  function handleSubmit(event: FormEvent<RateThisThingFormElement>) {
    event.preventDefault();
    const { nameInput, emailInput, companyInput, companyUrlInput } = event.currentTarget.elements;
    const id = emailInput.value;
    const redirectUrl = getRedirectUrl(id, {
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
          className="h-96 bg-cover lg:rounded-lg lg:h-full"
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
            <Input autoFocus label="Your name" id="nameInput" type="text" required />
            <Input label="Your email address" id="emailInput" type="text" required />
            <Input label="Your company" placeholder="Optional" id="companyInput" type="text" />
            <Input label="Your company URL" placeholder="Optional" id="companyUrlInput" type="text" />

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
                onClick={() => window.location.reload()}
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
