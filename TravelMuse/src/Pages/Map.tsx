import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Move from '../assets/move.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

const locations = [
  { name: 'First Gate', coords: [6.5205, 3.3769] },
  { name: 'Second Gate', coords: [6.511135633259772, 3.3883349533737768] },
  { name: 'Unilag Medical Center', coords: [6.51530057184001, 3.3885764779102634] },
  { name: 'Nord', coords: [6.5190879082527875, 3.3904029662446122] },
  { name: 'Lagoon Front', coords: [6.523425274730571, 3.4013699075304378] },
  { name: 'Senate Building', coords: [6.519613529636281, 3.399396846670633] },
  { name: 'First Bank', coords: [6.513048551469461, 3.3908546239188704] },
  { name: 'Wema Bank', coords: [6.517313052022972, 3.3871572141270914] },
  { name: 'Guaranty Trust Bank', coords: [6.51728735620547, 3.3980374170375356] },
  { name: 'OYEWUSI IBIDAPO OBE HOUSE (ZENITH BANK AND UNILAG ALUMNI BUILDING)', coords: [6.517314253474004, 3.3983274497118234] },
  { name: 'UBA', coords: [6.5198506402719225, 3.3998088057886333] },
  { name: 'Eco Bank', coords: [6.5145147656305795, 3.4044193241917915] },
  { name: 'Access Bank', coords: [6.5093934293706655, 3.3867793050016104] },
  { name: 'Works and Physical Planing', coords: [6.5197, 3.3914] },
  { name: 'Unilag Microfinance Bank', coords: [6.5197, 3.3914] },
  { name: 'Jelili Adebisi Omotola Hall', coords: [6.5197, 3.3914] },
  { name: 'Unilag Women Society Hall', coords: [6.5197, 3.3914] },
  { name: 'Diploma 2 Hall', coords: [6.5197, 3.3914] },
  { name: 'J.F. Ade. Ajayi Hall', coords: [6.5197, 3.3914] },
  { name: 'Julius Berger Hall', coords: [6.5197, 3.3914] },
  { name: 'Afe Babalola Hall', coords: [6.5197, 3.3914] },
  { name: 'Nithub', coords: [6.5123, 3.4042] },
  { name: 'Moremi Car parks', coords: [6.5139, 3.4052] },
  { name: 'DLI Car parks', coords: [6.5139, 3.4052] },
  { name: 'First Gate Car parks', coords: [6.5139, 3.4052] },
  { name: 'Education Car parks', coords: [6.5139, 3.4052] },
  { name: 'CITS Car parks', coords: [6.5139, 3.4052] },
  { name: 'Sport Center Bus-stop', coords: [6.5139, 3.4052] },
  { name: 'Education Bus-stop', coords: [6.5139, 3.4052] },
  { name: 'NewHall Center Bus-stop', coords: [6.5139, 3.4052] },
  { name: 'Science Center Bus-stop', coords: [6.5139, 3.4052] },
  { name: 'Sport Center', coords: [6.5142, 3.4001] },
  { name: 'Faculty of Arts ', coords: [6.5151, 3.3998] },
  { name: 'Faculty of Science ', coords: [6.5151, 3.3998] },
  { name: 'Faculty of Engineering ', coords: [6.5151, 3.3998] },
  { name: 'Faculty of Law ', coords: [6.5151, 3.3998] },
  { name: 'Faculty of Socail Science ', coords: [6.5151, 3.3998] },
  { name: 'Faculty of Enivironmental Sciences ', coords: [6.5151, 3.3998] },
  { name: 'Faculty of Management Sciences ', coords: [6.5151, 3.3998] },
  { name: 'Faculty of Education ', coords: [6.5151, 3.3998] },
  { name: 'Unilag Bookshop', coords: [6.5158, 3.3978] },
  { name: 'Unilag Chapel', coords: [6.5158, 3.3978] },
  { name: 'Unilag Mosque', coords: [6.5158, 3.3978] },
  { name: 'Unilag Guest House', coords: [6.5158, 3.3978] },
  { name: 'Amphi Theatre', coords: [6.5158, 3.3978] },
  { name: 'Unilag Shopping Complex', coords: [6.5158, 3.3978] },
  { name: 'Unilag Fire Station', coords: [6.5158, 3.3978] },
  { name: 'CITS', coords: [6.5158, 3.3978] },
  { name: 'Makama Hall', coords: [6.5158, 3.3978] },
  { name: 'Fagunwa Hall', coords: [6.5158, 3.3978] },
  { name: 'Madam Tinubu Hall', coords: [6.5158, 3.3978] },
  { name: 'sodiende Hall', coords: [6.5158, 3.3978] },
  { name: 'Eninkoju Hall', coords: [6.5158, 3.3978] },
  { name: 'Kofo Hall', coords: [6.5158, 3.3978] },
  { name: 'Anima Hall', coords: [6.5158, 3.3978] },
  { name: 'El-Kanemi Hall', coords: [6.5158, 3.3978] },
  { name: 'Moremi Hall', coords: [6.5158, 3.3978] },
  { name: 'Jaja Hall', coords: [6.5158, 3.3978] },
  { name: 'Biobaku Hall', coords: [6.5158, 3.3978] },
  { name: 'Mariere Hall', coords: [6.5158, 3.3978] },
  { name: 'women Society Hall', coords: [6.5158, 3.3978] },
  { name: 'Honours Hall', coords: [6.5158, 3.3978] },
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
              zoom={30}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 maxZoom={19} 
              />
              {shortestPath.map(index => (
                <Marker position={locations[index].coords as LatLngExpression} key={index}></Marker>
              ))}
              <Polyline
                positions={shortestPath.map(index => locations[index].coords as LatLngExpression)}
                color="blue"
              />
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

