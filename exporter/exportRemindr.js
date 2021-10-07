const dateTime = require('../utils/getDateTime');
const fetch = require('node-fetch');
require('dotenv').config({path: "../.env"});

const remindrExporter = async () => {

  const URL = process.env.BASEURL || 'http://localhost:3001'

  const timeObj = dateTime();

  const {current_date, current_time, am_pm} = timeObj;

  if (current_date && current_time && am_pm) {
    // Send a POST request to the API endpoint
    const response = await fetch(`${URL}/api/messages/export`, {
      method: 'POST',
      body: JSON.stringify({ current_date, current_time, am_pm }),
      headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok){
      return;
    } else {
      console.error( {message: 'Export Failed'} );
    }
  }
}

module.exports = remindrExporter;