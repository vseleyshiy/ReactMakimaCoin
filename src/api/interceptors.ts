import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: 'https://rmcbackend.local/api',
	headers: {
		'Content-Type': 'application/json',
	},
	// withCredentials: true,
}

const axiosClassic = axios.create(options)

export { axiosClassic }
