import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Nav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function handleMenuToggle() {
    setMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [router]);

  return (
    <nav className="bg-white shadow dark:bg-gray-800 absolute w-screen">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <a className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                Rate This Thing
              </a>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
              onClick={handleMenuToggle}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className={`items-center md:flex ${isMenuOpen ? '' : 'hidden'} md:h-auto h-screen md:pt-0 pt-6`}>
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link href="/">
              <a
                className={`py-4 text-sm font-medium text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 ${
                  router.pathname === '/' ? 'text-blue-500' : ''
                }`}
              >
                Redirect
              </a>
            </Link>

            <Link href="/iframe-example">
              <a
                className={`py-4 text-sm font-medium text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 ${
                  router.pathname === '/iframe-example' ? 'text-blue-500' : ''
                }`}
              >
                iframe
              </a>
            </Link>

            <Link href="/button-example">
              <a
                className={`py-4 text-sm font-medium text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 ${
                  router.pathname === '/button-example' ? 'text-blue-500' : ''
                }`}
              >
                Button
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
