import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService{

    getExhibition():string{
        return "Upcoming Exhibition will start from 28 September";
    }
}