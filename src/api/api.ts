import axios from 'axios'

const api = {
    spotify: axios.create({baseURL: 'https://api.spotify.com/v1'})
}

export default api