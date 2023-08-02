"use client";
import { useEffect, useState } from 'react';
import fetchData from '@/data/fetchData';
import { MdLocationOn, MdPower, MdWifi, MdSpeed, MdVolumeUp, MdAccessTime, MdMap } from 'react-icons/md';
import { FaInstagram, FaGithub } from 'react-icons/fa';
interface CityData {
  konum: string;
  isim: string;
  kategoriler: string;
  priz: string;
  wifi: string;
  wifiHiz: string;
  gurultu: string;
  calismaSaatleri: string;
  instagram: string;
  harita: string | null;
}


const IndexPage = () => {
  const [data, setData] = useState<Record<string, CityData[]> | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  useEffect(() => {
    fetchData()
      .then((data: any) => {
        setData(data)
      })
  }, [])
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const getVenuesByCity = (city: string) => {
    if (!data) return [];
    return data[city] || [];
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-brown-light mb-4">
        Çalışma Mekanları
      </h1>
      <select
        onChange={handleCityChange}
        className="w-full p-2 mb-4 border border-brown-dark rounded bg-brown-light text-brown-dark"
      >
        <option value="">Şehir seçiniz</option>
        {data &&
          Object.keys(data).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
      </select>
      {selectedCity && (
        <div>
          <h2 className="text-2xl text-brown-light mb-4">
            <div className="flex items-center">
            <MdLocationOn className="mr-1" /> {selectedCity} şehrindeki çalışma mekanları
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getVenuesByCity(selectedCity).map((venue, index) => (
              <div key={index} className="p-4 border rounded bg-brown-light text-brown-dark">
                <strong>{venue.isim}</strong>
                <p>
                  <div className="flex items-center">
                    <MdLocationOn className="mr-1" /> Konum: {venue.konum}
                  </div>
                </p>
                <p>
                  <div className="flex items-center">
                    <MdPower className="mr-1" /> Priz: {venue.priz}
                  </div>
                </p>
                <p>
                  <div className="flex items-center">
                    <MdWifi className="mr-1" /> WiFi: {venue.wifi}
                  </div>
                </p>
                <p>
                  <div className="flex items-center">
                    <MdSpeed className="mr-1" /> WiFi Hızı: {venue.wifiHiz}
                  </div>
                </p>
                <p>
                  <div className="flex items-center">
                    <MdVolumeUp className="mr-1" /> Gürültü Seviyesi: {venue.gurultu}
                  </div>
                </p>
                <p>
                  <div className="flex items-center">
                    <MdAccessTime className="mr-1" /> Çalışma Saatleri: {venue.calismaSaatleri}
                  </div>
                </p>
                {venue.instagram && (
                  <p>
                    <div className="flex items-center">
                      <FaInstagram className="mr-1" /> Instagram: {' '}
                      <a
                        href={`https://instagram.com/${venue.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brown-darker underline ml-1"
                      >
                        {venue.instagram}
                      </a>
                    </div>
                  </p>
                )}
                {venue.harita && (
                  <p>
                    <div className="flex items-center">
                      <MdMap className="mr-1" /> Harita:{' '}
                      <a
                        href={venue.harita}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brown-darker underline ml-1"
                      >
                        Link
                      </a>
                    </div>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <footer className="bg-brown-light text-center mt-8 p-4 rounded-lg">
        <div className="flex justify-center items-center">
          <p className="text-brown-darker">
            Çalışma mekanları reposu:
            <a
              href="https://github.com/acikkaynak/calisma-mekanlari"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-2"
            >
              GitHub
            </a>
          </p>
          <p className="text-brown-darker ml-8">
            Bu sitenin reposu: 
            <a
              href="https://github.com/code-a-man/calisma-mekanlari-app" // Replace with your website repository URL
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-2"
            >
              GitHub
            </a>
          </p>
        </div>
        <p className="text-brown-darker mt-2">
          Made with <span role="img" aria-label="heart">🤎</span> by{' '}
          <a
            href="https://github.com/code-a-man" // Replace with your GitHub profile URL
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Code a Man
          </a>
        </p>
      </footer>
    </div>
  );
};



export default IndexPage;