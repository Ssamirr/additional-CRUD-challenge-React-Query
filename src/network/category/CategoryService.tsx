import { BaseService } from "../base/BaseService";
import { Category } from '../../models/category/Category'

export class CategoryService extends BaseService<Category> {

    constructor() {
        super("/categories");
    }

}