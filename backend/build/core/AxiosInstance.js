"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
exports.axiosInstance = axios_1.default.create({
    baseURL: `${process.env.BASE_URL}`,
    headers: {
        Accept: 'application/json',
    },
});
// Request Interceptor to append API key
exports.axiosInstance.interceptors.request.use((config) => {
    if (!config.params) {
        config.params = {};
    }
    config.params['key'] = process.env.WEATHERBIT_API_KEY;
    return config;
}, (error) => {
    return Promise.reject(error);
});
//# sourceMappingURL=AxiosInstance.js.map