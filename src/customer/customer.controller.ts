import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { CustomerService } from "./customer.service";

@Controller('customer')
export class CustomerController{
    constructor(private readonly customerService: CustomerService){}

    @Get('get-exhibition')
    getExhibition():string{
        return this.customerService.getExhibition();
    }

    @Post('add-exhibition')
    addExhibition(@Body() customerdata:object):object{
        return this.customerService.addExhibition(customerdata);
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
}