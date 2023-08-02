"use client";
import { useEffect, useState } from 'react';
import fetchData from '@/data/fetchData';
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
  const [data, setData] = useState(null)
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
    return data[city] || [];
  };

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-brown-light mb-4">Çalışma Mekanları</h1>
      <select
        onChange={handleCityChange}
        className="w-full p-2 mb-4 border border-brown-dark rounded bg-brown-light text-brown-dark"
      >
        <option value="">Şehir seçiniz</option>
        {data && Object.keys(data).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && (
        <div>
          <h2 className="text-2xl text-brown-light mb-4">{selectedCity} şehrindeki çalışma mekanları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getVenuesByCity(selectedCity).map((venue, index) => (
              <div key={index} className="p-4 border rounded bg-brown-light text-brown-dark">
                <strong>{venue.isim}</strong>
                <p>Konum: {venue.konum}</p>
                <p>Priz: {venue.priz}</p>
                <p>WiFi: {venue.wifi}</p>
                <p>WiFi Hızı: {venue.wifiHiz}</p>
                <p>Gürültü Seviyesi: {venue.gurultu}</p>
                <p>Çalışma Saatleri: {venue.calismaSaatleri}</p>
                {venue.instagram && (
                  <p>
                    Instagram: <a href={`https://instagram.com/${venue.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-brown-darker underline">{venue.instagram}</a> {/* Kahverengi metin rengi ve altı çizili bağlantı */}
                  </p>
                )}
                {venue.harita && (
                  <p>
                    Harita: <a href={venue.harita} target="_blank" rel="noopener noreferrer" className="text-brown-darker underline">Link</a> {/* Kahverengi metin rengi ve altı çizili bağlantı */}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;