import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = 'http://localhost:5252/api/';

const responseBdoy = (response: AxiosResponse) => response.data;

// unfufilled일 때 desc 출력
axios.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  const {data, status} = error.response as AxiosResponse;
  switch (status) {
      case 400:
          if (data.errors) {
              const modelStateErrors: string[] = [];
              for (const key in data.errors) {
                  if (data.errors[key]) {
                      modelStateErrors.push(data.errors[key])
                  }
              }
              throw modelStateErrors.flat();
          }
          toast.error(data.title);
          break;
      case 401:
          toast.error(data.title);
          break;
      case 403:
          toast.error('You are not allowed to do that!');
          break;
      case 500:
          router.navigate('/server-error', {state: {error: data}})
          break;
      case 404:
          router.navigate('/notfound', {state: {error: data}})
      break;
      default:
          break;
  }
  return Promise.reject(error.response);
})

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