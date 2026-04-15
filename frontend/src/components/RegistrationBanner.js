/**
 * RegistrationBanner Component
 * B2B partnership CTA banner for garage/shop owners
 */

import Link from "next/link";

export default function RegistrationBanner() {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-12 lg:py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5l2 2zM20 22.5v2H0v2h20v2.5l2-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1.5 bg-red-600 text-white text-sm font-bold rounded-full mb-4">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              B2B PARTNERSHIP
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-white">
              Are you a Garage Owner?
            </h2>
            <p className="mt-3 text-lg text-slate-300 max-w-xl">
              Register today to get exclusive Wholesale Prices, priority
              support, and access to bulk ordering with flexible payment terms.
            </p>

            {/* Benefits List */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-slate-300">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Up to 40% Off
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Bulk Orders
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Net 30 Terms
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Register Now
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              Already registered?{" "}
              <Link
                href="/login"
                className="text-white font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
