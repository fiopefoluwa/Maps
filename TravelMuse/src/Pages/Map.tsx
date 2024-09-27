import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import Move from '../assets/move.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import L, { LatLngExpression } from 'leaflet';

type Directions = {
  summary: {
    totalDistance: number;
    totalTime: number;
  };
  instructions: Array<{
    text: string;
  }>;
};

const locations = [
  { name: 'First Gate', coords: [6.518038006651104, 3.3849000694325797] },
  { name: 'Second Gate', coords: [6.511135633259772, 3.3883349533737768] },
  { name: 'Faculty of Engineering', coords: [6.518649835364064, 3.399038927349784] },
  { name: 'Faculty of Science', coords: [6.515326733464871, 3.3997470303686472] },
  { name: 'Senate Building', coords: [6.519613529636281, 3.399396846670633] },
  { name: 'First Bank', coords: [6.513048551469461, 3.3908546239188704] },
  { name: 'Wema Bank', coords: [6.517313052022972, 3.3871572141270914] },
  { name: 'Guaranty Trust Bank', coords: [6.51728735620547, 3.3980374170375356] },
  { name: 'OYEWUSI IBIDAPO OBE HOUSE (ZENITH BANK AND UNILAG ALUMNI BUILDING)', coords: [6.517314253474004, 3.3983274497118234] },
  { name: 'UBA', coords: [6.5198506402719225, 3.3998088057886333] },
  { name: 'Eco Bank', coords: [6.5145147656305795, 3.4044193241917915] },
  { name: 'Access Bank', coords: [6.519561991159253, 3.3940302244664036] },
  { name: 'Works and Physical Planing', coords: [6.518189130813266, 3.391696190724184] },
  { name: 'Unilag Microfinance Bank', coords: [6.518746726095525, 3.3946386289473502] },
  { name: 'Jelili Adebisi Omotola Hall', coords: [6.516757045723746, 3.387512913607475] },
  { name: 'Unilag Women Society Hall', coords: [6.519717401444373, 3.392496346132013] },
  { name: 'Diploma 2 Hall', coords: [6.516758626689072, 3.3870037246762177] },
  { name: 'J.F. Ade. Ajayi Hall', coords: [6.519408044819525, 3.3995689982675636] },
  { name: 'Julius Berger Hall', coords: [6.517603483434187, 3.4006611921516887] },
  { name: 'Afe Babalola Hall', coords: [6.518706364011086, 3.396672065742995] },
  { name: 'Nitda IT hub', coords: [6.516620105290757, 3.3914112657429865] },
  { name: 'Moremi Car parks', coords: [6.51804202630593, 3.3975873019571514] },
  { name: 'DLI Car parks', coords: [6.512971622077242, 3.393688765904148] },
  { name: 'First Gate Car parks', coords: [6.518038006651104, 3.3849000694325797] },
  { name: 'Education Bus-stop', coords: [6.52485641089921, 3.3875892684176008] },
  { name: 'CITS Car parks', coords: [6.518409630804838, 3.3958782160337537] },
  { name: 'Sport Center Bus-stop', coords: [6.516676102352731, 3.390004225497916] },
  { name: 'New Hall Car Park', coords: [6.520831480770043, 3.393729298094747] },
  { name: 'Science Center Bus-stop', coords: [6.51583338188036, 3.3982192921516585] },
  { name: 'Sport Center', coords: [6.516676102352731, 3.390004225497916] },
  { name: 'Faculty of Arts ', coords: [6.521101013295016, 3.397735091784999] },
  { name: 'Faculty of Science ', coords: [6.515326733464871, 3.3997470303686472] },
  { name: 'Faculty of Engineering ', coords: [6.518649835364064, 3.399038927349784] },
  { name: 'Faculty of Law ', coords: [6.525634145100189, 3.4117821905535246] },
  { name: 'Faculty of Socail Science(FSS) ', coords: [6.521526199829765, 3.4073474360100082] },
  { name: 'Faculty of Enivironmental Sciences ', coords: [6.517823164349928, 3.3878919093363713] },
  { name: 'Faculty of Management Sciences ', coords: [6.517823164349928, 3.3878919093363713] },
  { name: 'Faculty of Education ', coords: [6.517118483640811, 3.3862852688511094] },
  { name: 'Unilag Bookshop', coords: [6.518940599218686, 3.3979199176140393] },
  { name: 'Unilag Chapel', coords: [6.518533609134759, 3.389943363734044] },
  { name: 'Unilag Mosque', coords: [6.519113007716095, 3.390248905734241] },
  { name: 'Unilag Guest House', coords: [6.521804322232922, 3.399823265161535] },
  { name: 'Amphi Theatre', coords: [6.52284792345147, 3.372473311984389] },
  { name: 'Unilag Shopping Complex', coords: [6.520355698451263, 3.3977527962108556] },
  { name: 'Unilag Fire Station', coords: [6.518857328704231, 3.3967257939964854] },
  { name: 'CITS', coords: [6.518409630804838, 3.3958782160337537] },
  { name: 'Makama Hall', coords: [6.519457577259916, 3.3922308074682435] },
  { name: 'Fagunwa Hall', coords: [6.5199852200792625, 3.39199879636533] },
  { name: 'Madam Tinubu Hall', coords: [6.520335649213018, 3.3916997300905054] },
  { name: 'sodiende Hall', coords: [6.519324334034804, 3.3931052075890085] },
  { name: 'Eninkoju Hall', coords: [6.519104482642222, 3.3935182677382607] },
  { name: 'Kofo Hall', coords: [6.514933583237769, 3.3858882209368906] },
  { name: 'Anima Hall', coords: [6.514972224113822, 3.385508688399782] },
  { name: 'El-Kanemi Hall', coords: [6.51601652409428, 3.3845347390167064] },
  { name: 'Moremi Hall', coords: [6.518076888342118, 3.397880213025953] },
  { name: 'Jaja Hall', coords: [6.5163500486976345, 3.3980840608904073] },
  { name: 'Biobaku Hall', coords: [6.515183417107482, 3.3874700154522213] },
  { name: 'Mariere Hall', coords: [6.518172823694173, 3.398135023004269] },
  { name: 'women Society Female Hostel', coords: [6.5110260572559, 3.3933820160288937] },
  { name: 'Honours Hall', coords: [6.510928788069348, 3.3941330344816456] },
  { name: 'Staff School', coords: [6.515990391101599, 3.397474863733876] },
  { name: 'International School, University of Lagos', coords: [6.511024724797567, 3.3920409116622454] },
  { name: 'Women Society School', coords: [6.5158, 3.3978] },
];


function RoutingMachine({
  startPoint,
  endPoint,
  setDirections,
}: {
  startPoint: number[];
  endPoint: number[];
  setDirections: React.Dispatch<React.SetStateAction<Directions | null>>;
}) {
  const map = useMap();


  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(startPoint[0], startPoint[1]), L.latLng(endPoint[0], endPoint[1])],
      routeWhileDragging: false,
      // createMarker: () => null,
      show: false,
      fitSelectedRoutes: false,
      lineOptions: {
        styles: [{ color: 'red', weight: 4 }],
        extendToWaypoints: true, 
        missingRouteTolerance: 20,
      },
    })
      .on('routesfound', (e) => {
        const routes = e.routes[0];

        const directions: Directions = {
          summary: {
            totalDistance: routes.summary.totalDistance,
            totalTime: routes.summary.totalTime,
          },
          instructions: routes.instructions.map((instruction : {text: string}) => ({
            text: instruction.text,
          })),
        };
        setDirections(directions);
      })
      .addTo(map);
    return () => {
      map.removeControl(routingControl); 
    };
  }, [map, startPoint, endPoint]);

  return null;
}

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [showMapPage, setShowMapPage] = useState(false);
  const [directions, setDirections] = useState<Directions | null>(null); 


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
        <>
          <div>
      <h1 className='text-2xl font-bold'>Journey Begins!</h1>
      {}
      <div>
        {directions ? (
          <div>
          <h2>Journey from <strong>{currentLocation}</strong> to <strong>{destination}</strong>:</h2>
          <p>Distance: {(directions.summary.totalDistance / 1000).toFixed(2)} km</p>
          <p>Estimated Time: {(directions.summary.totalTime / 60).toFixed(2)} mins</p>
          <ol>
            {directions.instructions.map((instruction: any, index: number) => (
              <li key={index}>{instruction.text}</li>
            ))}
            </ol>
          </div>
        ) : (
          <p>Loading directions...</p>
        )}
      </div>

          <div
            style={{
              width: '60%',
              height: '450px',
              margin: '0 auto',
              border: '2px solid #ddd',
              borderRadius: '10px',
            }}
          >
            <MapContainer
              center={locations.find((loc) => loc.name === currentLocation)!.coords as LatLngExpression}
              zoom={17}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((loc, index) => (
                <Marker
                  position={loc.coords as LatLngExpression}
                  key={index}
                />
              ))}
              {currentLocation && destination && (
                <RoutingMachine
                  startPoint={locations.find((loc) => loc.name === currentLocation)!.coords}
                  endPoint={locations.find((loc) => loc.name === destination)!.coords}
                  setDirections={setDirections} 

                />
              )}
            </MapContainer>
          </div>
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
              <option value="">....Select a location</option>
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
          <div className="bg-white shadow-md rounded-lg p-12 max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Where are you going?</h2>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">....Select a destination</option>
              {locations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleJourneyStart}
            className="bg-customOrange hover:bg-blue-600 text-black font-semibold px-4 py-2 rounded-lg lg:translate-y-16 lg:-translate-x-4"
          >
            Start Journey
          </button>
        </div>
      )}
    </div>
  );
}
