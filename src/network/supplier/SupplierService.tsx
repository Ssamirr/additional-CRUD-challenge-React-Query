import { BaseService } from "../base/BaseService";
import { Supplier } from '../../models/supplier/Supplier'

export class SupplierService extends BaseService<Supplier> {

    constructor() {
        super("/suppliers");
    }

}