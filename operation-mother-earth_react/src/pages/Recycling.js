import TitleHeader from "../components/TitleHeader/TitleHeader";
import recycling from "../assets/icons/recycling-icon.svg";
import ButtonBar from "../components/ButtonBar/ButtonBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MarkerF, useLoadScript } from "@react-google-maps/api";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import MapList from "../components/MapList/MapList";
import NavBar from "../components/NavBar/NavBar";
// import tree from "../assets/images/tree-loader.svg";
import Tree from "../assets/images/tree-loader";

export default function Recycling() {
  //state for map list
  const [mapList, setMapList] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 49.28507657283974,
    lng: -123.11461581337777,
  });
  const [addCenters, setAddCenters] = useState(null);

  const REACT_APP_API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

  //get geolocation function
  //I am still having problems with it setting the currentLocation to the default and having to update something in the code to make the location update to my location
  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let userLat = position.coords.latitude;
        let userLng = position.coords.longitude;
        setCurrentLocation({ lat: userLat, lng: userLng });
        axios
          .get(
            `${REACT_APP_API_SERVER_URL}recycling?lat=${userLat}&lng=${userLng}`
          )
          .then((response) => {
            setMapList(response.data);
          })
          .catch((err) => console.log(err));
      });
    } else {
      //alert!
      alert(`Geolocation is not supported by your browser.`);
    }
  };

  //get recycling centers data, pass it to the Hook
  //and pass it to the MapList
  const getMapInfo = () => {
    getGeoLocation();
  };

  const getAddCenters = () => {
    axios
      .get(`${REACT_APP_API_SERVER_URL}recycling/new`)
      .then((response) => {
        setAddCenters(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMapInfo();
    getAddCenters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //for loading the googlemap with the google map api key
  // eslint-disable-next-line no-unused-vars
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // wait for 2 secs if there is no wait
      await new Promise((resolved) => setTimeout(resolved, 2000));
      // set the toggle loading state
      setLoading((loading) => !loading);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If page is in loading state, display
  // loading div which is a spinning circle.
  if (loading) {
    return (
      <div className="loader">
        <Tree />
      </div>
    );
  }
  // If page is not in loading state, display page.
  else {
    return (
      <>
        <NavBar />
        <section className="recycling">
          <TitleHeader
            img={recycling}
            alt={"recycling icon"}
            text={"E-Waste Recycling Near You"}
          />
          <Link to="/recycling/add">
            <ButtonBar
              text1={"Go to List"}
              text2={"+ Add Center"}
              link2={"/recycling/add"}
              link1={"/recycling#list"}
            />
          </Link>
          <Map
            mapList={mapList}
            currentLocation={currentLocation}
            addCenters={addCenters}
          />
        </section>
        <MapList mapList={mapList} />
      </>
    );
  }
}
//I had trouble making it into it's own component it is now here
function Map({ mapList, currentLocation, addCenters }) {
  const [selectedMarker, setSelectedMarker] = useState();
  let [infoOpen, setInfoOpen] = useState(false);
  let [infoOpenJson, setInfoOpenJson] = useState(false);
  //use refs for map
  const mapRef = useRef();
  return (
    <>
      <GoogleMap
        ref={mapRef}
        zoom={12}
        center={{ lat: currentLocation.lat, lng: currentLocation.lng }}
        mapContainerClassName="map__google"
      >
        {mapList &&
          mapList.map((item) => (
            <MarkerF
              key={uuidv4()}
              position={{
                lat: item.geometry.location.lat,
                lng: item.geometry.location.lng,
              }}
              onClick={() => {
                setSelectedMarker(item);
                setInfoOpen(true);
                console.log(selectedMarker);
              }}
              icon={{
                url: "/recycle-pin.png",
                scaledSize: new window.google.maps.Size(25, 25),
              }}
            />
          ))}

        {selectedMarker && infoOpen && (
          <InfoWindow
            position={{
              lat: selectedMarker.geometry.location.lat,
              lng: selectedMarker.geometry.location.lng,
            }}
            onCloseClick={() => {
              setInfoOpen(false);
            }}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <p>{selectedMarker.formatted_address}</p>
            </div>
          </InfoWindow>
        )}

        {addCenters &&
          addCenters.map((item) => (
            <Marker
              key={uuidv4()}
              position={{
                lat: item.lat,
                lng: item.lng,
              }}
              onClick={() => {
                setSelectedMarker(item);
                setInfoOpenJson(true);
              }}
              icon={{
                url: "/recycle-pin.png",
                scaledSize: new window.google.maps.Size(25, 25),
              }}
            />
          ))}

        {selectedMarker && infoOpenJson && (
          <InfoWindow
            position={{
              lat: selectedMarker.lat,
              lng: selectedMarker.lng,
            }}
            onCloseClick={() => {
              setInfoOpen(false);
            }}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <p>
                {selectedMarker.address}, {selectedMarker.city}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}
