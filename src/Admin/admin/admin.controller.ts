import { Body, Controller,Delete,Get, Param, Post, Put, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

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

}
