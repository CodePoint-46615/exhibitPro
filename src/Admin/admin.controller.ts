import { Body, Controller,Delete,Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { CreateAdminDto } from './createadmin.dto';
import { get } from 'http';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    getAdminData() {
        return 'Admin data';
    }
    @Get('customerdata')
    getCustomerData() {
        return this.adminService.getCustomerData();
    }
    @Get('totalcustomer')
    getTotalCustomer() {
        return this.adminService.getCustomerData();
    }
    @Get('hostdata')
    getHostData() {
        return this.adminService.getTotalHost();
    }
    @Get('totalhost')
    getTotalHost() {
        return this.adminService.getTotalHost();
    }
    @Get('venuedata')
    getVenueData() {
        return this.adminService.getVenueData();
    }
    @Get('totalvenue')
    getTotalVenue() {
        return this.adminService.getTotalVenue();
    }

    @Get('venuebyname/:name')
    getVenueByName(@Param('name') name: string) {
        return 'Venue data for '+ name;
    }

    @Get('exhibitiondata')
    getExhibitionData() {
        return this.adminService.getExhibitionData();
    }

    @Get('exhibitionbyname')
    getExhibitionByName(@Query('name') name: string) {
        return this.adminService.getExhibitionByName(name);
    }

    @Post('addvenue')
    createVenueData(@Body() data: object) {
        return data;
    }

    @Delete('deletevenue/:id')
    deleteVenueData(@Param('id') id: string) {
        return this.adminService.getVenueData() + " with ID " + id + " deleted";
    }

    @Post('addadmin')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: { fileSize: 2 * 1024 * 1024 },
        storage:diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                callback(null, Date.now()+file.originalname);
            }
        })
    }))
    createAdmin(@UploadedFile() file:Express.Multer.File ,@Body() adminData: AdminDto) {
        return this.adminService.createAdmin(adminData,file);
    }

    @Post('createadmin')
    addAdmin(@Body() admin: CreateAdminDto) {
        return this.adminService.createAdminUser(admin);
    }
    @Get('getalladmin')
    getAllAdmin() {
        return this.adminService.getAdminData();
    }
    @Patch('updateadmin/:id')
    updateAdmin(@Param('id') id: string, @Body() phone: {phone: number}) {
        return this.adminService.editAdmin(id, phone);
    }
    @Get('nullname')
    getNullName() {
        return this.adminService.nullName();
    }
    @Delete('deleteadmin/:id')
    deleteAdmin(@Param('id') id: string) {
        return this.adminService.deleteAdmin(id);
    }

}
