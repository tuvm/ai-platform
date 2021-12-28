import axios from 'axios';
import UserService from './userService';

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const _axios = axios.create({
  baseURL: 'http://console.local.ai:8199/console',
  responseType: 'json',
});

const configure = () => {
  _axios.interceptors.request.use(async (config) => {
    console.log(config);
    try {
      if (
        !(
          UserService &&
          UserService.isLoggedIn &&
          UserService.getPermissionToken()
        )
      ) {
        await UserService.updateToken(() => {});
        config.headers.Authorization = `Bearer ${UserService.getPermissionToken()}`;
        return config;
      } else {
        config.headers.Authorization = `Bearer ${UserService.getPermissionToken()}`;
        return config;
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const getAxiosClient = () => _axios;

const HttpService = {
  HttpMethods,
  configure,
  getAxiosClient,
};

export default HttpService;
