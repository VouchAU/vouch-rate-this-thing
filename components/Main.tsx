import { FunctionComponent } from 'react';

const Main: FunctionComponent = ({ children }) => (
  <main className="pt-12 lg:pt-20 flex flex-col min-h-screen bg-white lg:bg-gray-100">
    <section className="lg:py-12 lg:flex lg:justify-center">{children}</section>
  </main>
);

export { Main };
