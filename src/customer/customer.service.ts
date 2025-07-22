import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService{

    getExhibition():string{
        return "Upcoming Exhibition will start from 28 September.";
    }

    addExhibition(customerdata:object):object{
        return {return: customerdata};
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
}