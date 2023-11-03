import './style.scss';
import React, { useEffect, useState } from 'react';
import Weather from './Weather';
import { Layout } from '../../components';

export default function WeatherPage() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    };
    fetchData();
  }, [lat, long]);

  return (
    <Layout title="Weather">
      <div className="Weather">
        {typeof data.main != 'undefined' ? (
          <Weather weatherData={data} />
        ) : (
          <div></div>
        )}
      </div>
    </Layout>
  );
}
