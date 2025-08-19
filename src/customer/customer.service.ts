import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, PaymentStatus } from './booking.entity';
import { Feedback } from './feedback.entity';
import { Exhibition } from 'src/host/exhibition.entity';
import { Users } from 'src/users/users.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(Exhibition) private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
  ) {}

  async createBooking(body: { exhibition_id: string; customer_id: string; tickets_booked: number }): Promise<Booking> {
    const exhibition = await this.exhibitionRepository.findOne({ where: { exhibition_id: body.exhibition_id } });
    if (!exhibition) throw new NotFoundException('Exhibition not found');
    const customer = await this.usersRepository.findOne({ where: { userID: body.customer_id } });
    if (!customer) throw new NotFoundException('Customer not found');

    const total_price = Number(exhibition.ticket_price) * body.tickets_booked;
    const booking = this.bookingRepository.create({
      exhibition,
      customer,
      tickets_booked: body.tickets_booked,
      total_price,
      payment_status: PaymentStatus.UNPAID,
    });
    return await this.bookingRepository.save(booking);
  }

  async getBooking(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { booking_id: id }, relations: ['exhibition', 'customer'] });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async createFeedback(body: { exhibition_id: string; customer_id: string; rating: number; comment: string }): Promise<Feedback> {
    const exhibition = await this.exhibitionRepository.findOne({ where: { exhibition_id: body.exhibition_id } });
    if (!exhibition) throw new NotFoundException('Exhibition not found');
    const customer = await this.usersRepository.findOne({ where: { userID: body.customer_id } });
    if (!customer) throw new NotFoundException('Customer not found');
    const feedback = this.feedbackRepository.create({ exhibition, customer, rating: body.rating, comment: body.comment });
    return await this.feedbackRepository.save(feedback);
  }

  async listExhibitions(): Promise<Exhibition[]> {
    return await this.exhibitionRepository.find({ relations: ['host'] });
  }

  async getExhibitionPublic(id: string): Promise<Exhibition> {
    const exhibition = await this.exhibitionRepository.findOne({ where: { exhibition_id: id }, relations: ['host'] });
    if (!exhibition) throw new NotFoundException('Exhibition not found');
    return exhibition;
  }
}
