import { FunctionComponent } from 'react';

const Main: FunctionComponent<{ className?: string }> = ({ children, className }) => (
  <main className={`pt-12 lg:pt-20 flex flex-col min-h-screen bg-white lg:bg-gray-100 ${className}`}>
    <section className="lg:py-12 lg:flex lg:justify-center">{children}</section>
  </main>
);

export { Main };
