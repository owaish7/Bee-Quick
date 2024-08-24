import React, { useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

// Mock list of locations
const locations = [
  'Hall 1', 'Hall 3', 'Hall 4', 'Panini', 'Nagarjuna', 'Maa Saraswati', 'LHTC', 'CLC', 'PHC', 'CC', 'DSA Office', 'SAC'
];

function Rental() {
  const [rent, setRent] = useState({
    currentLocation: '',
    destination: '',
  });

  // Convert locations to react-select format
  const locationOptions = locations.map(location => ({ value: location, label: location }));

  // Filter options to exclude the current location and avoid case sensitivity issues
  const filteredLocationOptions = locationOptions.filter(option =>
    option.value !== rent.currentLocation
  );

  // Handle changes for the current location select
  const handleCurrentLocationChange = selectedOption => {
    setRent({ ...rent, currentLocation: selectedOption ? selectedOption.value : '', destination: '' });
  };

  // Handle changes for the destination select
  const handleDestinationChange = selectedOption => {
    setRent({ ...rent, destination: selectedOption ? selectedOption.value : '' });
  };

  return (
    <div className="w-screen h-screen flex items-start bg-gray-500 overflow-hidden relative">
      <div
        style={{ backgroundColor: '#FFC629' }}
        className={
          'p-4 sm:p-6 md:p-8 lg:p-10 ' +
          'ml-4 sm:ml-6 md:ml-11 lg:ml-20 mr-4 sm:mr-6 md:mr-11 lg:mr-20 mx-auto mt-10 sm:mt-14 md:mt-20 lg:mt-24 ' +
          'rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-4/5 md:w-2/3 lg:w-3/4 h-2/1 '
        }
      >
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-center text-gray-800">
          Choose your Ride
        </h1>
        <form>
          <div className="mb-4 sm:mb-4 md:mb-5 lg:mb-6">
            <label className="block text-lg lg:text-xl font-medium text-gray-700" htmlFor="currentLocation">
              Your current location is:
            </label>
            <Select
              id="currentLocation"
              options={locationOptions}
              value={locationOptions.find(option => option.value === rent.currentLocation)}
              onChange={handleCurrentLocationChange}
              placeholder="Select current location"
              className="mt-1"
            />
          </div>
          <div className="mb-4 sm:mb-4 md:mb-5 lg:mb-6">
            <label className="block text-lg lg:text-xl font-medium text-gray-700" htmlFor="destination">
              Where do you want to go
            </label>
            <Select
              id="destination"
              options={filteredLocationOptions}
              value={filteredLocationOptions.find(option => option.value === rent.destination)}
              onChange={handleDestinationChange}
              placeholder="Select destination"
              className="mt-1"
              isDisabled={!rent.currentLocation} // Disable until current location is selected
            />
          </div>

          <div className="text-right">
            <Link
              to={{
                pathname: "/Options",
                search: `?currentLocation=${encodeURIComponent(rent.currentLocation)}&destination=${encodeURIComponent(rent.destination)}`,
              }}
            >
              <button
                style={{ backgroundColor: '#000000', color: '#FFC629' }}
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg shadow-lg hover:shadow-xl active:bg-blue-700 focus:outline-none focus:shadow-outline transition-all"
                type="submit"
                disabled={!rent.currentLocation || !rent.destination}
              >
                Start Ride
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Rental;
