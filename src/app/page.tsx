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
      <h1 className="text-4xl text-brown-light mb-4">Çalışma Mekanları</h1>
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
            {selectedCity} şehrindeki çalışma mekanları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getVenuesByCity(selectedCity).map((venue, index) => (
              <div key={index} className="p-4 border rounded bg-brown-light text-brown-dark">
                <strong>{venue.isim}</strong>
                <p>📍 Konum: {venue.konum}</p>
                <p>🔌 Priz: {venue.priz}</p>
                <p>📶 WiFi: {venue.wifi}</p>
                <p>💨 WiFi Hızı: {venue.wifiHiz}</p>
                <p>🔊 Gürültü Seviyesi: {venue.gurultu}</p>
                <p>⏰ Çalışma Saatleri: {venue.calismaSaatleri}</p>
                {venue.instagram && (
                  <p>
                    📸 Instagram:{' '}
                    <a
                      href={`https://instagram.com/${venue.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brown-darker underline"
                    >
                      {venue.instagram}
                    </a>
                  </p>
                )}
                {venue.harita && (
                  <p>
                    🗺️ Harita:{' '}
                    <a
                      href={venue.harita}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brown-darker underline"
                    >
                      Link
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <footer className="text-center mt-8 p-4">
  <div className="flex justify-center items-center">
    <p className="text-brown-light">
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
    <p className="text-brown-light ml-8">
      Bu sitenin reposu:
      <a
        href="https://github.com/example-user/your-website-repo" // Replace with your website repository URL
        target="_blank"
        rel="noopener noreferrer"
        className="underline ml-2"
      >
        GitHub
      </a>
    </p>
  </div>
  <p className="text-brown-light mt-2">
    Made with 🤎 by{' '}
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