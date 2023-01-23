import { BaseService } from "../base/BaseService";
import { Product } from '../../models/product/Product'

export class ProductService extends BaseService<Product> {

    constructor() {
        super("/products");
    }

}