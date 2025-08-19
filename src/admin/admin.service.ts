import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/createUsers.dto';
import { UserRole, Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Exhibition } from 'src/host/exhibition.entity';
import { Booking } from 'src/customer/booking.entity';
import { Feedback } from 'src/customer/feedback.entity';
import { AdminAction } from './adminAction.entity';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        @InjectRepository(Exhibition) private exhibitionRepository: Repository<Exhibition>,
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
        @InjectRepository(Feedback) private feedbackRepository: Repository<Feedback>,
        @InjectRepository(AdminAction) private adminActionRepository: Repository<AdminAction>,
      ) {}
    
    async allCustomers(): Promise<Users[]> {
        return await this.userRepository.find({where: { role: UserRole.CUSTOMER }});
    }

    async allHosts(): Promise<Users[]> {
        return await this.userRepository.find({where: { role: UserRole.HOST }});
    }
    async allUsers(): Promise<Users[]> {
        return await this.userRepository.find();
    }
    


      
    async updateUserRole(id:string, data: Partial<CreateUserDto>, adminId?: string): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { userID: id } });
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        Object.assign(user, data);
        const saved = await this.userRepository.save(user);
        if (adminId) {
            await this.adminActionRepository.save(
                this.adminActionRepository.create({
                    admin: { userID: adminId } as Users,
                    actionType: 'update_user_role',
                    targetType: 'user',
                    targetID: id,
                    description: `Updated user role for ${id}`,
                }),
            );
        }
        return saved;
    }

    // Exhibitions
    async listExhibitions() {
        return await this.exhibitionRepository.find({ relations: ['host'] });
    }

    async getExhibition(id: string) {
        const exhibition = await this.exhibitionRepository.findOne({ where: { exhibitionID: id }, relations: ['host'] });
        if (!exhibition) throw new HttpException('Exhibition not found', 404);
        return exhibition;
    }

    async updateExhibition(id: string, data: Partial<Exhibition>, adminId?: string) {
        const exhibition = await this.getExhibition(id);
        Object.assign(exhibition, data);
        const saved = await this.exhibitionRepository.save(exhibition);
        if (adminId) {
            await this.adminActionRepository.save(
                this.adminActionRepository.create({
                    admin: { userID: adminId } as Users,
                    actionType: 'update_exhibition',
                    targetType: 'exhibition',
                    targetID: id,
                    description: `Updated exhibition ${id}`,
                }),
            );
        }
        return saved;
    }

    async deleteExhibition(id: string, adminId?: string) {
        const result = await this.exhibitionRepository.delete(id);
        if (result.affected === 0) throw new HttpException('Exhibition not found', 404);
        if (adminId) {
            await this.adminActionRepository.save(
                this.adminActionRepository.create({
                    admin: { userID: adminId } as Users,
                    actionType: 'delete_exhibition',
                    targetType: 'exhibition',
                    targetID: id,
                    description: `Deleted exhibition ${id}`,
                }),
            );
        }
        return { message: 'Exhibition deleted successfully' };
    }

    // Bookings
    async listBookings() {
        return await this.bookingRepository.find({ relations: ['exhibition', 'customer'] });
    }

    async getBooking(id: string) {
        const booking = await this.bookingRepository.findOne({ where: { bookingID: id }, relations: ['exhibition', 'customer'] });
        if (!booking) throw new HttpException('Booking not found', 404);
        return booking;
    }

    async listFeedbacks() {
        return await this.feedbackRepository.find({ relations: ['exhibition', 'customer'] });
    }

    async listAdminActions() {
        return await this.adminActionRepository.find({ relations: ['admin'] });
    }



}
