const axios = require('axios');

const getToken = async () => {
  try {
    const response = await axios.post(
      'https://api.artsy.net/api/tokens/xapp_token',
      {},
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      }
    );

    const token = response.data.token;
    console.log(`Access Token: ${token}`);
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

module.exports = getToken;
