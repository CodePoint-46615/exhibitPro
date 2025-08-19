import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, PaymentStatus } from './booking.entity';
import { Feedback } from './feedback.entity';
import { Exhibition } from 'src/host/exhibition.entity';
import { Users } from 'src/users/users.entity';
import { CreateBookingDto } from './create-booking.dto';
import { UpdateFeedbackDto } from './update-feedback.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(Exhibition) private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
  ) {}

  async createBooking(body: CreateBookingDto): Promise<Booking> {
    const exhibition = await this.exhibitionRepository.findOne({ where: { exhibitionID: body.exhibitionID } });
    if (!exhibition) throw new HttpException('Exhibition not found', 404);
    const customer = await this.usersRepository.findOne({ where: { userID: body.customerID } });
    if (!customer) throw new HttpException('Customer not found', 404);

    const totalPrice = Number(exhibition.ticketPrice) * body.ticketsBooked;
    const booking = this.bookingRepository.create({
      exhibition,
      customer,
      ticketsBooked: body.ticketsBooked,
      totalPrice,
      paymentStatus: PaymentStatus.UNPAID,
    });
    return await this.bookingRepository.save(booking);
  }

  async getBooking(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { bookingID: id }, relations: ['exhibition', 'customer'] });
    if (!booking) throw new HttpException('Booking not found', 404);
    return booking;
  }

  async createFeedback(body: { exhibitionID: string; customerID: string; rating: number; comment: string }): Promise<Feedback> {
    const exhibition = await this.exhibitionRepository.findOne({ where: { exhibitionID: body.exhibitionID } });
    if (!exhibition) throw new HttpException('Exhibition not found', 404);
    const customer = await this.usersRepository.findOne({ where: { userID: body.customerID } });
    if (!customer) throw new HttpException('Customer not found', 404);
    const feedback = this.feedbackRepository.create({ exhibition, customer, rating: body.rating, comment: body.comment });
    return await this.feedbackRepository.save(feedback);
  }

  async listExhibitions(): Promise<Exhibition[]> {
    return await this.exhibitionRepository.find({ relations: ['host'] });
  }

  async getExhibitionPublic(id: string): Promise<Exhibition> {
    const exhibition = await this.exhibitionRepository.findOne({ where: { exhibitionID: id }, relations: ['host'] });
    if (!exhibition) throw new HttpException('Exhibition not found', 404);
    return exhibition;
  }

  async updateFeedback(id: string, body: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({ where: { feedbackID: id }, relations: ['exhibition', 'customer'] });
    if (!feedback) throw new HttpException('Feedback not found', 404);
    if (typeof body.rating === 'number') feedback.rating = body.rating;
    if (typeof body.comment === 'string') feedback.comment = body.comment;
    return await this.feedbackRepository.save(feedback);
  }

  async cancelBooking(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { bookingID: id }, relations: ['exhibition', 'customer'] });
    if (!booking) throw new HttpException('Booking not found', 404);
    booking.paymentStatus = PaymentStatus.CANCELLED;
    return await this.bookingRepository.save(booking);
  }

  async markBookingPaid(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { bookingID: id }, relations: ['exhibition', 'customer'] });
    if (!booking) throw new HttpException('Booking not found', 404);
    booking.paymentStatus = PaymentStatus.PAID;
    return await this.bookingRepository.save(booking);
  }

  async listBookingsByCustomer(customerID: string): Promise<Booking[]> {
    return await this.bookingRepository.find({ where: { customer: { userID: customerID } }, relations: ['exhibition', 'customer'] });
  }

  async listFeedbacksByCustomer(customerID: string): Promise<Feedback[]> {
    return await this.feedbackRepository.find({ where: { customer: { userID: customerID } }, relations: ['exhibition', 'customer'] });
  }
}
