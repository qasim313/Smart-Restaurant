import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleContinueAsGuest = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Welcome to <span className="text-red-600">Netflix for Food</span>
        </h1>
        <p className="mt-3 text-xl text-gray-300 sm:mt-5 sm:text-2xl max-w-xl mx-auto">
          Your personalized restaurant menu explorer and delivery service.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
          <div className="rounded-md shadow">
            <button
              onClick={handleLoginClick}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
            >
              Login / Register
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button
              onClick={handleContinueAsGuest}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 max-w-3xl w-full">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-gray-900 text-sm text-gray-400">Features</span>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Explore Menus', description: 'Browse through a vast collection of restaurant menus.' },
            { title: 'Personalized Recommendations', description: 'Get food suggestions tailored to your taste.' },
            { title: 'Easy Ordering', description: 'Order your favorite dishes with just a few clicks.' },
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <dt className="mt-2 font-semibold text-white">{feature.title}</dt>
              <dd className="mt-2 text-gray-400">{feature.description}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;