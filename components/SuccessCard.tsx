import Link from 'next/link';
import { useRouter } from 'next/router';

const SuccessCard = () => {
  const router = useRouter();
  const { id, vouchId } = router.query as Record<string, string>;

  return (
    <div className="bg-white w-full text-center lg:mx-8 lg:flex lg:max-w-3xl lg:shadow-lg lg:rounded-lg max-h-96">
      <div className="w-full px-12 py-12">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl dark:text-white">
          Thank you for your feedback!
        </h2>

        <p className="mt-4">
          Please use Vouch ID code <code className="bg-gray-100 px-2 py-2 mx-1 rounded-lg">{vouchId}</code> for a
          discount on your next thing!
        </p>

        <p className="mt-4">
          We received this ID attached to your submission:{' '}
          <code className="bg-gray-100 px-2 py-2 mx-1 rounded-lg">{id}</code>
        </p>

        <div className="mt-8">
          <Link href="/">
            <a className="inline-flex items-center justify-center w-full px-6 py-3 text-gray-700 transition-colors duration-150 transform bg-white rounded-lg dark:bg-gray-900 hover:bg-gray-100 dark:text-white sm:w-auto dark:hover:bg-gray-800 dark:ring-gray-700 focus:ring focus:ring-gray-200 focus:ring-opacity-80">
              Show me another thing
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SuccessCard };
