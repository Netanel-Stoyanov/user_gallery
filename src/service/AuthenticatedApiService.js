import axios from "axios";

class AuthenticatedApiService {
    api = null;
    constructor() {
        this.api=   axios
        .create();
        this.api
        .interceptors
        .request
        .use(config => {
            config.headers = {
                'x-access-token': localStorage.getItem('token') // "bearer "+ loginService.getUserToken()
            };
            return config;
        });


    }

    getApi = () => this.api;
}

const authenticatedApiService = new AuthenticatedApiService();
export const authApi = authenticatedApiService.getApi();
export default authenticatedApiService;
