const { default: axios } = require('axios');
/*
Variables to replace
YOUR_API_KEY => The unique identifier for a Gupshup account.
YOUR_APP_ID=> The unique identifier for an app. An app's appid can be found in the cURL request generated on the dashboard.
*/
const sendMessage = (msg, phone) => {
    const params = new URLSearchParams()
    params.append('destination', phone);
    params.append('message', msg);
    params.append('source', 'GSDSMS'); 

    const config = {
        headers: {
            'apikey': "cvwnt7rzukuhrigy9wkhlpy8vwvtaxnh",
            
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    axios.post('http://api.gupshup.io/sms/v1/message/:a9153eb6-e179-4f1b-99b1-4aa2cc3d2ef2', params, config)
        .then((result) => {
            console.log('Message sent');
            console.log(result);
           // callbackFunc(result.data);
        })
        .catch((err) => {
            console.log(err);

           // callbackFunc(err);
        })
}

sendMessage("hello","+918210523156")
// module.exports = {
//     sendMessage
// }