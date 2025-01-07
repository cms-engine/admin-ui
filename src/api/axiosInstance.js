import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://engine.pp.ua/',
  headers: {
    'Content-Type': 'application/json',
  },
})
