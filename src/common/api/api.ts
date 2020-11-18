import axios from 'axios'

const api = {
    spotify: axios.create({baseURL: 'https://api.spotify.com/v1'}),
    server: axios.create({baseURL: process.env.REACT_APP_SERVER_URL})
}

export default api