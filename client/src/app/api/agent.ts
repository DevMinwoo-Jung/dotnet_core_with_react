import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5252/api/';

const responseBdoy = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBdoy),
  post: (url: string, body: object) => axios.post(url, body).then(responseBdoy),
  put: (url: string,  body: object) => axios.put(url, body).then(responseBdoy),
  delete: (url: string) => axios.delete(url).then(responseBdoy),
}

const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorised'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
  Catalog,
  TestErrors
}

export default agent;