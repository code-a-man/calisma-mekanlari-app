const url = process.env.NODE_ENV === 'development' ? 'https://raw.githubusercontent.com/code-a-man/calisma-mekanlari/main/README.md' : 'https://raw.githubusercontent.com/ramazansancar/acikkaynak_calisma-mekanlari/main/README.md';
import type { VenueData } from './types';

function convertLinksToMarkdown(text: string) {
  if (!text) return null;
  const linkRegex = /<((https?:\/\/[^\s]+)>)/g;
  const convertedText = text.replace(linkRegex, (_, url) => `[Link](${url})`);
  return convertedText;
}

function nullCheck(value: string) {
  return (value === 'N/A' || value === undefined || value === null || value === "") ? null : value;
}

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.text();

    const regex = /## 📚 (.*?)\n((?:.*\n)+?)(?=(?:## 📚|$))/g;
    let match;

    const result: { [key: string]: VenueData[] } = {};

    while ((match = regex.exec(data)) !== null) {
      const cityName = match[1].trim();
      const cityDataContent = match[2];

      const regexCityData = /.*\|.*\n/g;
      const cityData = cityDataContent.match(regexCityData);
      if (cityData) {
        result[cityName] = cityData.map((row) => {
          const rowData = row.split('|').map((item: any) => {
            item = nullCheck(item.trim());
            if (item !== null) item = convertLinksToMarkdown(item);
            return item;
          });
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
            instagram: rowData[8],
            harita: rowData[9],
            notlar: rowData[10],
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
