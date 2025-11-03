import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibition } from './exhibition.entity';
import { CreateExhibitionDto } from './createExhibition.dto';
import { Booking } from 'src/customer/booking.entity';
import { Feedback } from 'src/customer/feedback.entity';
import { pusher } from "../pusher";


@Injectable()
export class HostService {
  constructor(
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) { }

  // async createExhibition(dto: CreateExhibitionDto): Promise<Exhibition> {
  //   const exhibition = this.exhibitionRepository.create({
  //     ...dto,
  //     host: { userID: dto.hostID } as any,
  //   });
  //   return await this.exhibitionRepository.save(exhibition);
  // }

  async createExhibition(dto: CreateExhibitionDto): Promise<Exhibition> {
    // 1. Create new exhibition entity
    const exhibition = this.exhibitionRepository.create({
      ...dto,
      host: { userID: dto.hostID } as any,
    });

    // 2. Save it to DB
    const created = await this.exhibitionRepository.save(exhibition);

    // 3. Trigger Pusher event
    await pusher.trigger("exhibitions", "created", {
      exhibitionID: created.exhibitionID,
      title: created.title,
      imageUrl: created.imageUrl ?? null,
      description: created.description ?? null,
      ticketPrice: created.ticketPrice ?? null,
    });

    // 4. Return saved entity
    return created;
  }


  async listExhibitions(): Promise<Exhibition[]> {
    return await this.exhibitionRepository.find({ relations: ['host'] });
  }

  async getExhibition(id: string): Promise<Exhibition> {
    const exhibition = await this.exhibitionRepository.findOne({ where: { exhibitionID: id }, relations: ['host'] });
    if (!exhibition) throw new HttpException('Exhibition not found', 404);
    return exhibition;
  }

  async updateExhibition(id: string, dto: Partial<CreateExhibitionDto>): Promise<Exhibition> {
    const exhibition = await this.getExhibition(id);
    Object.assign(exhibition, dto);
    if (dto.hostID) {
      (exhibition as any).host = { userID: dto.hostID };
    }
    return await this.exhibitionRepository.save(exhibition);
  }

  async updateWholeExhibition(id: string, dto: CreateExhibitionDto): Promise<Exhibition> {
    const exhibition = await this.getExhibition(id);
    Object.assign(exhibition, dto);
    if (dto.hostID) {
      (exhibition as any).host = { userID: dto.hostID };
    }
    return await this.exhibitionRepository.save(exhibition);
  }

  async removeExhibition(id: string): Promise<{ message: string }> {
    const result = await this.exhibitionRepository.delete(id);
    if (result.affected === 0) throw new HttpException('Exhibition not found', 404);
    return { message: 'Exhibition deleted successfully' };
  }

  async updateExhibitionImage(id: string, filename?: string): Promise<Exhibition> {
    const exhibition = await this.getExhibition(id);
    exhibition.cover_image = filename ?? (undefined as unknown as string);
    return await this.exhibitionRepository.save(exhibition);
  }

  // Host-centric helpers
  async listMyExhibitions(hostId: string): Promise<Exhibition[]> {
    return await this.exhibitionRepository.find({ where: { host: { userID: hostId } }, relations: ['host'] });
  }

  async listExhibitionBookings(exhibitionId: string) {
    return await this.bookingRepository.find({ where: { exhibition: { exhibitionID: exhibitionId } }, relations: ['customer', 'exhibition'] });
  }

  async listExhibitionFeedback(exhibitionId: string) {
    return await this.feedbackRepository.find({ where: { exhibition: { exhibitionID: exhibitionId } }, relations: ['customer', 'exhibition'] });
  }

  async getExhibitionStats(exhibitionId: string) {
    const bookings = await this.listExhibitionBookings(exhibitionId);
    const totalTickets = bookings.reduce((sum, b) => sum + b.ticketsBooked, 0);
    const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0);
    const feedback = await this.listExhibitionFeedback(exhibitionId);
    const avgRating = feedback.length ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length : 0;
    return { totalTickets, totalRevenue, feedbackCount: feedback.length, avgRating };
  }
}
