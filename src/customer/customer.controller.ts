import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./customer.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";

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
    @UseInterceptors(FileInterceptor('saikot', {
         
        fileFilter: (req, file, cb) => {
        if(file.originalname.match(/^.*\.(pdf)$/))
            cb(null, true);
        else
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
        },
        limits: {fileSize: 200*1024}, //2kb
        storage: diskStorage({
            destination: './upload',
            filename: function(req, file, cb){
                cb(null, Date.now()+file.originalname)
            },
        })
    }))
    addExhibition(@Body() customerdata:CustomerDTO, @UploadedFile() file: Express.Multer.File){
        return this.customerService.addExhibition(customerdata, file);
    }




}