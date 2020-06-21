import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';

import { IPost } from '../models/post';

axios.defaults.baseURL = process.env.REACT_APP_API_URL_BASE!;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(undefined, (error) => {
	if (error.message === 'Network Error' && !error.response) {
		toast.error('Network error - make sure API is running.');
	}
	const { status, data, config } = error.response;
	if (status === 404) {
		history.push('/notfound');
	}
	if (status === 401) {
		history.push('/');
	}
	if (
		status === 400 &&
		config.method === 'get' &&
		data.errors.hasOwnProperty('id')
	) {
		history.push('/notfound');
	}
	if (status === 500) {
		toast.error('Server error - check terminal');
	}
	throw error.response;
});

//simulate server response delay in ms
const sleepDuration = 0;

const sleep = (ms: number) => (response: AxiosResponse) =>
	new Promise<AxiosResponse>((resolve) =>
		setTimeout(() => resolve(response), ms)
	);

const requests = {
	get: (url: string) =>
		axios.get(url).then(sleep(sleepDuration)).then(responseBody),
	// post: (url: string, body: {}) =>
	// 	axios.post(url, body).then(sleep(sleepDuration)).then(responseBody),
	// put: (url: string, body: {}) =>
	// 	axios.put(url, body).then(sleep(sleepDuration)).then(responseBody),
	// del: (url: string) =>
	// 	axios.delete(url).then(sleep(sleepDuration)).then(responseBody),
};

const Posts = {
	list: (): Promise<IPost[]> => requests.get('/static-posts.json'),
};

export default {
	Posts,
};
