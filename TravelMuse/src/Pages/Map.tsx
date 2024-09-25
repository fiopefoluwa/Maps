 import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
 import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
 import { useState } from 'react';
 import Move from '../assets/move.png'

 const locations = ['Location A', 'Location B', 'Location C'];

 export default function Map() {
   const [currentLocation, setCurrentLocation] = useState('');
   const [destination, setDestination] = useState('');
const [showMapPage, setShowMapPage] = useState(false); 

const handleJourneyStart = () => {
  if (currentLocation && destination) {
    setShowMapPage(true); 
  } else {
    alert('Please select both a location and a destination.');
  }
};


   return (
     <div>
{showMapPage ? ( 
  <div>
    <h2>Map Page</h2>
    
  </div>
) : (
       <div className="lg:flex justify-center items-center min-h-screen sm:space-x-4 grid">
        
       <div className="bg-white shadow-md rounded-lg p-12 max-w-lg">
         <h2 className="text-xl font-semibold mb-4">Where are you?</h2>
        <select
           value={currentLocation}
           onChange={(e) => setCurrentLocation(e.target.value)}
           className="w-full border border-gray-300 rounded-lg p-2"
         >
           <option value="">....your location</option>
           {locations.map((location, index) => (
             <option key={index} value={location}>
               {location}
             </option>
           ))}
         </select>
      </div>
       <img className='translate-x-20 translate-y-10 lg:hidden' 
       src={Move} 
      width={150}
       alt="" />

       <div className='lg:grid lg:visible hidden'>
       <FontAwesomeIcon icon={faArrowRight} 
       width={400}
       />
       <FontAwesomeIcon icon={faArrowRight}
       />
       </div>
       <FontAwesomeIcon icon={faArrowRight} className='invisible lg:visible' />


       <div className="bg-white shadow-md rounded-lg p-12 max-w-2xl">
         <h2 className="text-xl font-semibold mb-4">Where are you going?</h2>
         <select
           value={destination}
           onChange={(e) => setDestination(e.target.value)}
           className="w-full border border-gray-300 rounded-lg p-2"
         >
           <option value="">....your destination</option>
           {locations.map((location, index) => (
             <option key={index} value={location}>
               {location}
             </option>
        ))}
       </select>
       </div>
         <button title='nextpage' type='submit' onClick={handleJourneyStart} className=' font-light lg:translate-y-14 lg:-translate-x-4  p-2 italic border bg-customOrange' >Start your journey</button>
     </div>
)}
     </div>
    
   );
 }
