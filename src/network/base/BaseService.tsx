import { northwindApiInstance } from "../core/northwindApiInstance";
import { ResponseModel } from '../../models/core/ResponseModel'

export class BaseService<T> {

    private endpointUrl: string = "";

    constructor(url: string) {
        this.endpointUrl = url;
    }

    async getAll(url: string = this.endpointUrl): Promise<ResponseModel> {

        try {

            let apiResponse = await northwindApiInstance.get(url);

            let response: ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: apiResponse.status,
                errorMessage: ''
            }
            return response;
        } catch (error:any) {

            let response: ResponseModel = {
                data: {},
                status: false,
                statusCode: error.response.status,
                errorMessage: error.message
            }

            return response;
        }

    }

    async add(data: T, url: string = this.endpointUrl): Promise<ResponseModel> {

        try {
            let apiResponse = await northwindApiInstance.post(url, data);

            let response: ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: apiResponse.status,
                errorMessage: ''
            }
            return response;

        } catch (error :any) {
            let response: ResponseModel = {
                data: {},
                status: false,
                statusCode: error.response.status,
                errorMessage: error.message
            }

            return response;
        }

    }

    async delete(id: number, url: string = this.endpointUrl): Promise<ResponseModel> {

        try {
            let apiResponse = await northwindApiInstance.delete(url+ "/" + id);

            let response: ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: apiResponse.status,
                errorMessage: ''
            }
            return response;

        } catch (error :any) {
            let response: ResponseModel = {
                data: {},
                status: false,
                statusCode: error.response.status,
                errorMessage: error.message
            }

            return response;
        }

    }

    async update(data: T,id: number, url: string = this.endpointUrl): Promise<ResponseModel> {

        try {
            let apiResponse = await northwindApiInstance.put(url+ "/" + id,data);

            let response: ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: apiResponse.status,
                errorMessage: ''
            }
            return response;

        } catch (error :any) {
            let response: ResponseModel = {
                data: {},
                status: false,
                statusCode: error.response.status,
                errorMessage: error.message
            }

            return response;
        }

    }

}