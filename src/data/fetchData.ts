const url = process.env.NODE_ENV === 'development' ? 'https://raw.githubusercontent.com/code-a-man/calisma-mekanlari/main/README.md' : 'https://raw.githubusercontent.com/acikkaynak/calisma-mekanlari/main/README.md';
import type { VenueData } from './types';


function convertLinksToMarkdown(text: string) {
  const linkRegex = /<((?:https?:\/\/)?[^\s]+)>/g;
  const convertedText = text.replace(linkRegex, (_, url) => `[Link](${url})`);
  return convertedText;
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
            instagram: rowData[8] === 'N/A' ? null : rowData[8],
            harita: rowData[9] === 'N/A' ? null : convertLinksToMarkdown(rowData[9]),
            notlar: rowData[10] === 'N/A' ? null : convertLinksToMarkdown(rowData[10]),
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
