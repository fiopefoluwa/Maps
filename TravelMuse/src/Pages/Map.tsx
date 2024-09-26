// import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useState } from 'react';
// import Move from '../assets/move.png';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
// import { LatLngExpression } from 'leaflet';

// const locations = [
//   { name: 'First Gate', coords: [6.5205, 3.3769] },
//   { name: 'Second Gate', coords: [6.5215, 3.3791] },
//   { name: 'Medical Center', coords: [6.5148, 3.3962] },
//   { name: 'Nord', coords: [6.5175, 3.3921] },
//   { name: 'Lagoon Front', coords: [6.5167, 3.3975] },
//   { name: 'Senate Building', coords: [6.5185, 3.3929] },
//   { name: 'Banks', coords: [6.5197, 3.3914] },
//   { name: 'Nithub', coords: [6.5123, 3.4042] },
//   { name: 'Car parks', coords: [6.5139, 3.4052] },
//   { name: 'Sport Center', coords: [6.5142, 3.4001] },
//   { name: 'Faculties', coords: [6.5151, 3.3998] },
//   { name: 'Auditoriums', coords: [6.5158, 3.3978] },
// ];

// const graph: number[][] = [
//   [0, 4, 0, 0, 0, 0, 0, 8, 0],
//   [4, 0, 8, 0, 0, 0, 0, 11, 0],
//   [0, 8, 0, 7, 0, 4, 0, 0, 2],
//   [0, 0, 7, 0, 9, 14, 0, 0, 0],
//   [0, 0, 0, 9, 0, 10, 0, 0, 0],
//   [0, 0, 4, 14, 10, 0, 2, 0, 0],
//   [0, 0, 0, 0, 0, 2, 0, 1, 6],
//   [8, 11, 0, 0, 0, 0, 1, 0, 7],
//   [0, 0, 2, 0, 0, 0, 6, 7, 0],
// ];

// const NumberOfLocations = 9;

// function minDistance(distance: number[], processedLocations: boolean[]): number {
//   let min = Number.MAX_VALUE;
//   let minIndex = -1;

//   for (let i = 0; i < NumberOfLocations; i++) {
//     if (!processedLocations[i] && distance[i] <= min) {
//       min = distance[i];
//       minIndex = i;
//     }
//   }

//   return minIndex;
// }

// function dijkstra(graph: number[][], src: number, dest: number): number[] {
//   const shortestDistance = new Array(NumberOfLocations).fill(Number.MAX_VALUE);
//   const processedLocations = new Array(NumberOfLocations).fill(false);
//   const path = new Array(NumberOfLocations).fill(-1);
//   shortestDistance[src] = 0;
//   for (let count = 0; count < NumberOfLocations - 1; count++) {
//     const m = minDistance(shortestDistance, processedLocations);
//     processedLocations[m] = true;

//     for (let i = 0; i < NumberOfLocations; i++) {
//       if (
//         !processedLocations[i] &&
//         graph[m][i] !== 0 &&
//         shortestDistance[m] !== Number.MAX_VALUE &&
//         shortestDistance[m] + graph[m][i] < shortestDistance[i]
//       ) {
//         shortestDistance[i] = shortestDistance[m] + graph[m][i];
//         path[i] = m;
//       }
//     }
//   }

//   const shortestPath = [];
//   let step = dest;
//   while (step !== -1) {
//     shortestPath.unshift(step);
//     step = path[step];
//   }
//   return shortestPath;
// }

// export default function Map() {
//   const [currentLocation, setCurrentLocation] = useState('');
//   const [destination, setDestination] = useState('');
//   const [showMapPage, setShowMapPage] = useState(false);
//   const [shortestPath, setShortestPath] = useState<number[]>([]);

//   const handleJourneyStart = () => {
//     const srcIndex = locations.findIndex(loc => loc.name === currentLocation);
//     const destIndex = locations.findIndex(loc => loc.name === destination);
//     if (srcIndex !== -1 && destIndex !== -1) {
//       const path = dijkstra(graph, srcIndex, destIndex);
//       setShortestPath(path);
//       setShowMapPage(true);
//     } else {
//       alert('Please select both a location and a destination.');
//     }
//   };

//   return (
//     <div>
//       {showMapPage ? (
//         <>
//           <div className="p-10">
//             <h2 className="text-3xl font-bold p-4">Journey Begins!</h2>
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <p className="mb-4">
//                 Journey from <strong>{currentLocation}</strong> to{' '}
//                 <strong>{destination}</strong>:
//               </p>
//               <ul className="list-disc translate-x-8">
//                 {shortestPath.map((index) => (
//                   <li key={index}>{locations[index].name}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div style={{ width: '60%', height: '450px', margin: '0 auto', border: '2px solid #ddd', borderRadius: '10px' }}>
//             <MapContainer
//               center={locations[shortestPath[0]].coords as LatLngExpression}
//               zoom={16}
//               scrollWheelZoom={true}
//               style={{ height: '100%', width: '100%' }}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               {shortestPath.map(index => (
//                 <Marker position={locations[index].coords as LatLngExpression} key={index}></Marker>
//               ))}
//               <Polyline
//                 positions={shortestPath.map(index => locations[index].coords as LatLngExpression)}
//                 color="blue"
//               />
//             </MapContainer>
//           </div>
//         </>
//       ) : (
//         <div className="lg:flex justify-center items-center min-h-screen sm:space-x-4 grid">
//           <div className="bg-white shadow-md rounded-lg p-12 max-w-lg">
//             <h2 className="text-xl font-semibold mb-4">Where are you?</h2>
//             <select
//               value={currentLocation}
//               onChange={(e) => setCurrentLocation(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2"
//             >
//               <option value="">....your location</option>
//               {locations.map((location, index) => (
//                 <option key={index} value={location.name}>
//                   {location.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <img
//             className="translate-x-20 translate-y-10 lg:hidden"
//             src={Move}
//             width={150}
//             alt=""
//           />

//           <div className="lg:grid lg:visible hidden">
//             <FontAwesomeIcon icon={faArrowRight} width={400} />
//             <FontAwesomeIcon icon={faArrowRight} />
//           </div>

//           <div className="bg-white shadow-md rounded-lg p-12 max-w-2xl">
//             <h2 className="text-xl font-semibold mb-4">Where are you going?</h2>
//             <select
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2"
//             >
//               <option value="">....your destination</option>
//               {locations.map((location, index) => (
//                 <option key={index} value={location.name}>
//                   {location.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             title="nextpage"
//             type="submit"
//             onClick={handleJourneyStart}
//             className="font-light lg:translate-y-14 lg:-translate-x-4 p-2 italic border bg-customOrange"
//           >
//             Start your journey
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from 'react';
import Move from '../assets/move.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import footstepIcon from '../assets/sneakers.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';

const locations = [
  { name: 'First Gate', coords: [6.5205, 3.3769] },
  { name: 'Second Gate', coords: [6.5215, 3.3791] },
  { name: 'Medical Center', coords: [6.5148, 3.3962] },
  { name: 'Nord', coords: [6.5175, 3.3921] },
  { name: 'Lagoon Front', coords: [6.5167, 3.3975] },
  { name: 'Senate Building', coords: [6.5185, 3.3929] },
  { name: 'Banks', coords: [6.5197, 3.3914] },
  { name: 'Nithub', coords: [6.5123, 3.4042] },
  { name: 'Car parks', coords: [6.5139, 3.4052] },
  { name: 'Sport Center', coords: [6.5142, 3.4001] },
  { name: 'Faculties', coords: [6.5151, 3.3998] },
  { name: 'Auditoriums', coords: [6.5158, 3.3978] },
];

const graph: number[][] = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0],
];

const NumberOfLocations = 9;

function minDistance(distance: number[], processedLocations: boolean[]): number {
  let min = Number.MAX_VALUE;
  let minIndex = -1;

  for (let i = 0; i < NumberOfLocations; i++) {
    if (!processedLocations[i] && distance[i] <= min) {
      min = distance[i];
      minIndex = i;
    }
  }

  return minIndex;
}

function dijkstra(graph: number[][], src: number, dest: number): number[] {
  const shortestDistance = new Array(NumberOfLocations).fill(Number.MAX_VALUE);
  const processedLocations = new Array(NumberOfLocations).fill(false);
  const path = new Array(NumberOfLocations).fill(-1);
  shortestDistance[src] = 0;
  for (let count = 0; count < NumberOfLocations - 1; count++) {
    const m = minDistance(shortestDistance, processedLocations);
    processedLocations[m] = true;

    for (let i = 0; i < NumberOfLocations; i++) {
      if (
        !processedLocations[i] &&
        graph[m][i] !== 0 &&
        shortestDistance[m] !== Number.MAX_VALUE &&
        shortestDistance[m] + graph[m][i] < shortestDistance[i]
      ) {
        shortestDistance[i] = shortestDistance[m] + graph[m][i];
        path[i] = m;
      }
    }
  }

  const shortestPath = [];
  let step = dest;
  while (step !== -1) {
    shortestPath.unshift(step);
    step = path[step];
  }
  return shortestPath;
}

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [showMapPage, setShowMapPage] = useState(false);
  const [shortestPath, setShortestPath] = useState<number[]>([]);

  const handleJourneyStart = () => {
    const srcIndex = locations.findIndex(loc => loc.name === currentLocation);
    const destIndex = locations.findIndex(loc => loc.name === destination);
    if (srcIndex !== -1 && destIndex !== -1) {
      const path = dijkstra(graph, srcIndex, destIndex);
      setShortestPath(path);
      setShowMapPage(true);
    } else {
      alert('Please select both a location and a destination.');
    }
  };

  return (
    <div>
      {showMapPage ? (
        <>
          <div className="p-10">
            <h2 className="text-3xl font-bold p-4">Journey Begins!</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">
                Journey from <strong>{currentLocation}</strong> to{' '}
                <strong>{destination}</strong>:
              </p>
              <ul className="list-disc translate-x-8">
                {shortestPath.map((index) => (
                  <li key={index}>{locations[index].name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ width: '60%', height: '450px', margin: '0 auto', border: '2px solid #ddd', borderRadius: '10px' }}>
            <MapContainer
              center={locations[shortestPath[0]].coords as LatLngExpression}
              zoom={16}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {shortestPath.map(index => (
                <Marker
                  position={locations[index].coords as LatLngExpression}
                  key={index}
                  icon={L.icon({
                    iconUrl: footstepIcon,
                    iconSize: [25, 25], // Size of the icon
                    iconAnchor: [12, 25], // Point of the icon which will correspond to marker's location
                  })}
                />
              ))}
            </MapContainer>
          </div>
        </>
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
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <img
            className="translate-x-20 translate-y-10 lg:hidden"
            src={Move}
            width={150}
            alt=""
          />

          <div className="lg:grid lg:visible hidden">
            <FontAwesomeIcon icon={faArrowRight} width={400} />
            <FontAwesomeIcon icon={faArrowRight} />
          </div>

          <div className="bg-white shadow-md rounded-lg p-12 max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Where are you going?</h2>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">....your destination</option>
              {locations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <button
            title="nextpage"
            type="submit"
            onClick={handleJourneyStart}
            className="font-light lg:translate-y-14 lg:-translate-x-4 p-2 italic border bg-customOrange"
          >
            Start your journey
          </button>
        </div>
      )}
    </div>
  );
}


