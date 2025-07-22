import { Injectable } from '@nestjs/common';

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
    
}
