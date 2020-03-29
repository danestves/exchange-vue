// Dependencies
import axios from 'axios'

const url = 'https://api.coincap.io/v2'

async function getAssets() {
  return await axios
    .get(`${url}/assets?limit=20`)
    .then(res => res.data.data)
    .catch(err => console.error(err))
}

async function getAsset(coin) {
  return await axios
    .get(`${url}/assets/${coin}`)
    .then(res => res.data.data)
    .catch(err => console.error(err))
}

async function getAssetHistory(coin) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return await axios
    .get(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
    .then(res => res.data.data)
    .catch(err => console.error(err))
}

export { getAssets, getAsset, getAssetHistory }
