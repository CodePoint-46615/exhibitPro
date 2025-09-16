import { Injectable, NotFoundException } from '@nestjs/common';
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
            throw new Error(`User with id ${id} not found`);
        }
        Object.assign(user, data);
        const saved = await this.userRepository.save(user);
        if (adminId) {
            await this.adminActionRepository.save(
                this.adminActionRepository.create({
                    admin: { userID: adminId } as Users,
                    action_type: 'update_user_role',
                    target_type: 'user',
                    target_id: id,
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
        const exhibition = await this.exhibitionRepository.findOne({ where: { exhibition_id: id }, relations: ['host'] });
        if (!exhibition) throw new NotFoundException('Exhibition not found');
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
                    action_type: 'update_exhibition',
                    target_type: 'exhibition',
                    target_id: id,
                    description: `Updated exhibition ${id}`,
                }),
            );
        }
        return saved;
    }

    async deleteExhibition(id: string, adminId?: string) {
        const result = await this.exhibitionRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Exhibition not found');
        if (adminId) {
            await this.adminActionRepository.save(
                this.adminActionRepository.create({
                    admin: { userID: adminId } as Users,
                    action_type: 'delete_exhibition',
                    target_type: 'exhibition',
                    target_id: id,
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
        const booking = await this.bookingRepository.findOne({ where: { booking_id: id }, relations: ['exhibition', 'customer'] });
        if (!booking) throw new NotFoundException('Booking not found');
        return booking;
    }

    // Feedbacks
    async listFeedbacks() {
        return await this.feedbackRepository.find({ relations: ['exhibition', 'customer'] });
    }

    // Admin actions
    async listAdminActions() {
        return await this.adminActionRepository.find({ relations: ['admin'] });
    }

    async createAdminAction(adminId: string, description: string) {
        const action = this.adminActionRepository.create({
            admin: { userID: adminId } as Users,
            action_type: 'custom',
            target_type: 'note',
            target_id: 'n/a',
            description: description || 'Admin action',
        });
        return await this.adminActionRepository.save(action);
    }



}
