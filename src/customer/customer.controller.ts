import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./customer.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { CustomerEntity } from "./customer.entity";

@Controller('customer')
export class CustomerController{
    constructor(private readonly customerService: CustomerService){}

    /**
     * **********************************
     * ROUTE FOR THE LAB TASK 1
     * ********************************** 
     */
    // @Get('get-exhibition')
    // getExhibition():string{
    //     return this.customerService.getExhibition();
    // }

    // @Get('find-exhibition')
    // findExhibitionbyid(@Query('id') id:number, @Query('title') title:string):object{
    //     return this.customerService.findExhibitionbyid(id, title); 
    // }

    // @Patch('update-booking/:id')
    // updatebooking(@Param('id') id:number){
    //     return this.customerService.updatebooking(id); 
    // }

    // @Delete('delete-booking/:id')
    // deletebooking(@Param('id') id:number){
    //     return this.customerService.deletebooking(id);
    // }

    /**
     * ********************************************
     *  UPDATED ROUTE FOR THE LAB TASK 2
     * ********************************************
     */ 

    // @Post('add-exhibition')
    // @UsePipes(new ValidationPipe())
    // @UseInterceptors(FileInterceptor('file', {
         
    //     fileFilter: (req, file, cb) => {
    //     if(!file){
    //         return cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
    //     }
    //     if(!file.mimetype.match(/\/(pdf)$/))
    //        return cb(new Error("Only Pdf Are Allowed"), false);
    //     else
    //        return cb(null, true);
    //     },
    //     limits: {fileSize: 200*1024}, //2kb
    //     storage: diskStorage({
    //         destination: './upload',
    //         filename: function(req, file, cb){
    //             cb(null, Date.now()+file.originalname)
    //         },
    //     })
    // }))
    // addExhibition(@Body() customerdata:CustomerDTO, @UploadedFile() file: Express.Multer.File){
    //     return this.customerService.addExhibition(customerdata, file);
    // }


    /**
     * **********************************
     * UPDATED ROUTE FOR THE LAB TASK 3
     * ***********************************
     */

    @Post('create')
    @UsePipes(new ValidationPipe())
    async createCustomer(@Body() data:CustomerDTO):Promise<CustomerEntity>{
        return this.customerService.createCustomer(data); 
    }

    @Get('search')
    async search(@Query('substring') substring: string):Promise<CustomerEntity[]>{
        return this.customerService.findCustomerByFullNameSubsstring(substring);
    }

    @Get(':username')
    async getUserByName(@Param('username') username:string):Promise<CustomerEntity | null>{
        return this.customerService.findByUserName(username); 
    }

    @Delete(':username')
    async deleteCustomer(@Param('username') username:string):Promise<{message: string}>{
        await this.customerService.deleteCustomer(username);
        return {message: 'Customer Deleted'}; 
    }
}