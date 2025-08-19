import { Get, Injectable } from '@nestjs/common';
import { AdminDto } from './admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateAdminDto } from './createadmin.dto';
import { isNull } from 'util';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(AdminEntity) private userRepository: Repository<AdminEntity>) {}
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

    createAdminUser(admin: CreateAdminDto) : Promise<AdminEntity> {
        const entity = this.userRepository.create(admin);
        return this.userRepository.save(entity);
    }
    getAdminData(): Promise<AdminEntity[]> {
        return this.userRepository.find();
    }
    editAdmin(id: string, phonenum: { phone: number }) {
        return this.userRepository.update(id, {phone: phonenum.phone});
    }

    nullName(): Promise<AdminEntity[]> {
    return this.userRepository.find({where: { fullname: IsNull() },});
    }

    deleteAdmin(id: string) {
        return this.userRepository.delete(id);
    }
    
}
