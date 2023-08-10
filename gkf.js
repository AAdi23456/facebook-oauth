const axios = require('axios');

const apiKey = 'cvwnt7rzukuhrigy9wkhlpy8vwvtaxnh';
const phone = '918210523156';
const message = 'Hello from Gupshup SMS!';

const apiUrl = 'https://api.gupshup.io/sm/api/v1/msg';

const headers = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/x-www-form-urlencoded',
  'apikey': apiKey
};

const data = `channel=sms&source=8210523156&destination=${phone}&message=${message}`;

axios.post(apiUrl, data, { headers })
  .then(response => {
    console.log('SMS sent successfully:', response);
  })
  .catch(error => {
    console.error('Error sending SMS:', console.log(error));
  });
