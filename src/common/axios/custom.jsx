import axios from 'axios'

const axiosAdmin = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {
    Accept: 'application/json',
  },
})

export { axiosAdmin }
