import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosPromise,
    AxiosResponse,
    AxiosError
} from "axios";

export interface AjaxOptions {
    baseURL: string;
    headers?: object;
    headerAuthorization?: string | (() => string);
}

export default class Ajax {
    private options?: AjaxOptions;

    public constructor(options?: AjaxOptions) {
        this.options = options;
    }

    private static buildOptions(options: AjaxOptions): AxiosRequestConfig {
        const config: AxiosRequestConfig = {};
        if (options.baseURL) {
            config.baseURL = options.baseURL;
        }
        return config;
    }

    private static instance(options?: AjaxOptions): AxiosInstance {
        const result: AxiosInstance = options
            ? axios.create(Ajax.buildOptions(options))
            : axios.create();
        result.interceptors.response.use(
            (response: AxiosResponse) => response.data,
            (error: AxiosError) => Promise.reject(error.response)
        );
        return result;
    }

    public instance = (): AxiosInstance => Ajax.instance(this.options);

    public get = (url: string): AxiosPromise => {
        return this.instance().get(`${url}&apikey=4a3b711b`) as AxiosPromise;
    };
}
