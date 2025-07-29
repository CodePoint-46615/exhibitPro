import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./customer.dto";

@Controller('customer')
export class CustomerController{
    constructor(private readonly customerService: CustomerService){}

    @Get('get-exhibition')
    getExhibition():string{
        return this.customerService.getExhibition();
    }

    @Get('find-exhibition')
    findExhibitionbyid(@Query('id') id:number, @Query('title') title:string):object{
        return this.customerService.findExhibitionbyid(id, title); 
    }

    @Patch('update-booking/:id')
    updatebooking(@Param('id') id:number){
        return this.customerService.updatebooking(id); 
    }

    @Delete('delete-booking/:id')
    deletebooking(@Param('id') id:number){
        return this.customerService.deletebooking(id);
    }

    /**
     * ********************************************
     *  UPDATED CONTENT FOR THE LAB TASK 2
     * *********************************************
     */ 
    
    @Post('add-exhibition')
    @UsePipes(new ValidationPipe())
    addExhibition(@Body() customerdata:CustomerDTO):string{
        return this.customerService.addExhibition(customerdata);
    }
}