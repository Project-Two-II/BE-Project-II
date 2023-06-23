const axios = require('axios');
const fs = require('fs');

const fetchAndSaveData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/subjects/1/chapters/1/questions/');
    const data = response.data;

    // Save data to a JSON file
    fs.writeFileSync('data.json', JSON.stringify(data));
    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchAndSaveData();
