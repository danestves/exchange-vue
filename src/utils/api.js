// Dependencies
import axios from 'axios'

const url = 'https://api.coincap.io/v2'

async function getAssets() {
  return await axios
    .get(`${url}/assets?limit=20`)
    .then(res => res.data.data)
    .catch(err => console.error(err))
}

export default {
  getAssets
}
