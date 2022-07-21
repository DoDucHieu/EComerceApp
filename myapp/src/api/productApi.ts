import axiosConfig from "./axiosConfig";
import { ProductType } from "../type";

const URL = "http://localhost:8080";

const userApi = {
    getAll: () => axiosConfig.get("/get-all-product"),
    update: (body: ProductType) => axiosConfig.put(`/update-product`, body),
    delete: (id: string) => axiosConfig.delete(`${URL}/delete-product/${id}`),
};

export default userApi;
