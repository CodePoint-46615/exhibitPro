import { Injectable } from "@nestjs/common";
import { CustomerDTO } from "./customer.dto";

@Injectable()
export class CustomerService{

    getExhibition():string{
        return "Upcoming Exhibition will start from 28 September.";
    }

    findExhibitionbyid(id:number, title:string):object{
        return {id:id, title:title}; 
    }

    updatebooking(id:number){
        return "Booking updated for the exhibition id: "+id ; 
    }

    deletebooking(id:number){
        return "Delete Booking for the exhibition id: "+id; 
    }

    /**
     * **********************************
     * UPDATED CONTENT FOR THE LAB TASK 2
     * **********************************
     */

    addExhibition(customerdata:CustomerDTO, file: Express.Multer.File){
        return {customerdata, file};
    }
}