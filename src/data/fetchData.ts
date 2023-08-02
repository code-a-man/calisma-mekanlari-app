const url = 'https://raw.githubusercontent.com/acikkaynak/calisma-mekanlari/main/README.md';

interface CityData {
  konum: string;
  isim: string;
  kategoriler: string;
  priz: string;
  wifi: string;
  wifiHiz: string;
  gurultu: string;
  calismaSaatleri: string;
  instagram: string | null;
  harita: string | null;
}

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.text();

    const regex = /## 📚 (.*?)\n((?:.*\n)+?)(?=(?:## 📚|$))/g;
    let match;

    const result: { [key: string]: CityData[] } = {};

    while ((match = regex.exec(data)) !== null) {
      const cityName = match[1].trim();
      const cityDataContent = match[2];

      const regexCityData = /.*\|.*\n/g;
      const cityData = cityDataContent.match(regexCityData);
      if (cityData) {
        result[cityName] = cityData.map((row) => {
          const rowData = row.split('|').map((item) => item.trim());
					rowData.shift();
					rowData.pop();
          return {
            konum: rowData[0],
            isim: rowData[1],
            kategoriler: rowData[2],
            priz: rowData[3],
            wifi: rowData[4],
            wifiHiz: rowData[5],
            gurultu: rowData[6],
            calismaSaatleri: rowData[7],
            instagram: rowData[8] === '-' ? null : rowData[8],
            harita: rowData[9] === '-' ? null : rowData[9],
          };
        }).filter((item) => !item.konum.includes('--') && item.konum !== 'Konum');
      }
    }

    return result;
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default fetchData;
