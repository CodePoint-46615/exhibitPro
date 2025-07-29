import { Injectable } from '@nestjs/common';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
    getCustomerData() {
        return 'Customer data';
    }
    getTotalCustomer() {
        return 'Total customer count';
    }
    getHostData() {
        return 'Host data';
    }
    getTotalHost() {
        return 'Total host count';
    }
    getVenueData() {
        return 'Venue data';
    }
    getTotalVenue() {
        return 'Total venue count';
    }
    getExhibitionData() {
        return 'Exhibition data';
    }
    getExhibitionByName(name: string) {
        return `Exhibition data for ${name}`;
    }

    createAdmin(adminData: AdminDto, file: Express.Multer.File) {
        // Logic to save admin data
        return {adminData,file};
    }
    
}
