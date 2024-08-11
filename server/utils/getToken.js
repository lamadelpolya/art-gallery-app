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
};const fetchArtworks = async () => {
  try {
      let token = localStorage.getItem('artsyToken');
      if (!token) {
          token = await getArtsyToken();
          localStorage.setItem('artsyToken', token);
      }

      const artworksResponse = await axios.get('https://api.artsy.net/api/artworks', {
          headers: {
              'X-Xapp-Token': token,
          },
      });

      setArtworks(artworksResponse.data._embedded.artworks);
  } catch (error) {
      console.error('Error fetching artworks:', error);
      setError('Failed to load artworks. Please try again later.');
  } finally {
      setLoading(false);
  }
};


module.exports = getToken;
