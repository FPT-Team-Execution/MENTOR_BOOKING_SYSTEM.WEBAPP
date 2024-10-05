import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/path";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleOnLoginClick = () => {
    navigate(paths.login);
  };

  const handleOnReginsterClick = () => {
    navigate(paths.register);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="6" r="4" />
                <circle cx="12" cy="18" r="4" />
              </svg>
            </div>
            <span className="font-bold text-xl">Mentor app Booking</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {/* <a href="#platform" className="text-gray-700 hover:text-gray-900">
              Platform
            </a>
            <a href="#features" className="text-gray-700 hover:text-gray-900">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-gray-900"
            >
              How it works
            </a> */}
          </nav>
          <div className="flex items-center">
            <input
              type="search"
              className="w-full py-2 pl-10 text-sm text-gray-700"
              placeholder="Search..."
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>
      {/* TODO: Sepearte into a component */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mentor Booking System
            </h1>
            <Button
              className="rounded-full px-8 py-3 bg-gray-700 hover:bg-gray-800  text-orange-500"
              onClick={handleOnLoginClick}
            >
              Try the demo
            </Button>
          </div>
          <div className="bg-gray-300 aspect-video rounded-lg flex items-center justify-center">
            <img
              src="src/assets/mentorappwebp.webp"
              alt="mentor app booking image"
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Easily contact to your mentors
            </h2>
            <p className="text-gray-600 mb-8">
              Easily track your projects and mentor process.
            </p>
            {/* TODO: icons here */}
            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> */}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Book a mentor for your project
            </h2>
            <p className="text-gray-600 mb-8">
              Easily book a mentor for your project.
            </p>
            {/* TODO: icons here */}
            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700"
            >
              <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2m0-4h2a2 2 0 012 2v4m6 3v3h2a2 2 0 012 2v3m0-10h2a2 2 0 012 2v3m-3 3h6" />
            </svg> */}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
            <p className="text-gray-600 mb-8">
              Easily manage your subscriptions and save time.
            </p>
            {/* TODO: icons here */}
            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg> */}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            className="rounded-full px-8 py-3 hover:bg-gray-800 bg-gray-700 text-orange-500"
            onClick={handleOnLoginClick}
          >
            Login
          </Button>
          <p className="text-gray-600 mt-4">
            or{" "}
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900"
              onClick={handleOnReginsterClick}
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
      {/* Footer */}
      {/* TODO: Seperate to component */}
      <footer className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <p className="text-gray-600">2024 FPT University</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
