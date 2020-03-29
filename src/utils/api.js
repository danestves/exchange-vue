// Dependencies
import axios from 'axios'

const url = 'https://api.coincap.io/v2'

async function getAssets() {
  return await axios
    .get(`${url}/assets?limit=20`)
    .then(res => res.data.data)
    .catch(err => {
      throw new Error(err)
    })
}

async function getAsset(coin) {
  return await axios
    .get(`${url}/assets/${coin}`)
    .then(res => res.data.data)
    .catch(err => {
      throw new Error(err)
    })
}

async function getAssetHistory(coin) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return await axios
    .get(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
    .then(res => res.data.data)
    .catch(err => {
      throw new Error(err)
    })
}

async function getMarkets(coin) {
  return await axios
    .get(`${url}/assets/${coin}/markets?limit=5`)
    .then(res => res.data.data)
    .catch(err => {
      throw new Error(err)
    })
}

async function getExchange(id) {
  return await axios
    .get(`${url}/exchanges/${id}`)
    .then(res => res.data.data)
    .catch(err => {
      throw new Error(err)
    })
}

export { getAssets, getAsset, getAssetHistory, getMarkets, getExchange }
