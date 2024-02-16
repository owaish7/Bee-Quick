import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

function Status() {
  const [rideStatus, setRideStatus] = useState('Searching for a ride...');
  const [driverDetails, setDetails] = useState(null);
  const [rideFound, setRideFound] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { userid } = currentUser;

  const cancelRide = async () => {
    try {
      const res = await axios.post('http://localhost:8800/api/ride/cancel-ride', {
        bike_id: driverDetails.bike_id,
      });
      setRideStatus('Ride canceled');
      setRideFound(false);
      setDetails(null);

    } catch (error) {
      console.log(error);
  }
};

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/ride/getDetails`, {
          params: { userid: userid },
        });
        setRideFound(true);
        setDetails(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="bg-gradient-to-r from-tertiary via-secondary to-primary h-screen flex items-center justify-center">
      <div className="bg-opacity-80 bg-white p-8 rounded-lg shadow-lg text-center border-4 border-ffc629 font-body">
        <h1 className="text-5xl font-title text-black mb-8">Ride Status</h1>
        <div
          className={`text-xl text-black mb-8 font-button opacity-100 transition-opacity duration-300 transform translate-y-0 ${
            rideFound ? 'opacity-0 translate-y-2' : ''
          }`}
        >
          {!rideFound && <p className="text-2xl font-semibold">{rideStatus}</p>}
        </div>
        {rideFound && (
          <div className="text-black bg-tertiary bg-opacity-90 font-footer opacity-100 transition-opacity duration-300 transform translate-y-0 mt-6">
            <p className="text-lg font-semibold">Bicycle Number: {driverDetails.bike_id}</p>
            <button
              onClick={cancelRide}
              className="theme-btn-shadow rounded-xl bg-[#FFC629] px-4 py-2 mt-4 text-sm font-Nunito sans text-[#000000] font-normal mobile:text-xs hover:bg-[#FFA500] hover:text-white hover:border-[#000000]"
              style={{ fontFamily: 'Nunito Sans' }}
            >
              Cancel Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Status;
