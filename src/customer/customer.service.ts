import { Injectable } from "@nestjs/common";
import { CustomerDTO } from "./customer.dto";
import { CustomerEntity } from "./customer.entity";
import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { promises } from "dns";

@Injectable()
export class CustomerService{

    constructor(
        @InjectRepository(CustomerEntity) private readonly customerRepo: Repository<CustomerEntity>,
    ){}

    /**
     ********************************
     * TASK FOR LAB TASK 1
     * ******************************
     */

    // getExhibition():string{
    //     return "Upcoming Exhibition will start from 28 September.";
    // }

    // findExhibitionbyid(id:number, title:string):object{
    //     return {id:id, title:title}; 
    // }

    // updatebooking(id:number){
    //     return "Booking updated for the exhibition id: "+id ; 
    // }

    // deletebooking(id:number){
    //     return "Delete Booking for the exhibition id: "+id; 
    // }

    /**
     * **********************************
     * UPDATED CONTENT FOR THE LAB TASK 2
     * **********************************
     */

    // addExhibition(customerdata:CustomerDTO, file: Express.Multer.File){
    //     return {customerdata, file};
    // }

    /**
     * ********************************
     * UPDATED CONTENT FOR LAB TASK 3
     * ********************************
     */

    async createCustomer(data: CustomerDTO): Promise<CustomerEntity>{
        return this.customerRepo.save(data);
    }

    async findCustomerByFullNameSubsstring(substring: string):Promise<CustomerEntity[]>{
        return this.customerRepo.find({
            where: {
                fullName: ILike(`%${substring}%`)
            }
        });
    }

    async findByUserName(username: string):Promise<CustomerEntity | null>{
        return this.customerRepo.findOne({
            where: {username}
        });
    }

    async deleteCustomer(username:string):Promise<void>{
        await this.customerRepo.delete({username}); 
    }
}