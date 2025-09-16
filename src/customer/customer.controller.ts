import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe, Req, Patch, Put, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Booking } from './booking.entity';
import { Feedback } from './feedback.entity';
import { CreateBookingDto } from './create-booking.dto';
import { CreateFeedbackDto } from './create-feedback.dto';
import { CustomerGuard } from './customer.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(CustomerGuard)
  @Post('bookings')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createBooking(@Body() body: CreateBookingDto): Promise<Booking> {
    return this.customerService.createBooking(body);
  }

  @UseGuards(CustomerGuard)
  @Get('bookings/:id')
  getBooking(@Param('id') id: string): Promise<Booking> {
    return this.customerService.getBooking(id);
  }

  @UseGuards(CustomerGuard)
  @Patch('bookings/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  updateBooking(@Param('id') id: string, @Body() body: Partial<CreateBookingDto>): Promise<Booking> {
    return this.customerService.updateBooking(id, body);
  }

  @UseGuards(CustomerGuard)
  @Put('bookings/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  replaceBooking(@Param('id') id: string, @Body() body: Partial<CreateBookingDto>): Promise<Booking> {
    return this.customerService.updateBooking(id, body);
  }

  @UseGuards(CustomerGuard)
  @Delete('bookings/:id')
  deleteBooking(@Param('id') id: string) {
    return this.customerService.deleteBooking(id);
  }

  @UseGuards(CustomerGuard)
  @Get('bookings')
  listMyBookings(@Req() req: any): Promise<Booking[]> {
    const customerId = req.user?.userID || req.user?.sub;
    return this.customerService.listBookingsForCustomer(customerId);
  }

  @UseGuards(CustomerGuard)
  @Post('feedbacks')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createFeedback(@Body() body: CreateFeedbackDto): Promise<Feedback> {
    return this.customerService.createFeedback(body);
  }

  @UseGuards(CustomerGuard)
  @Get('feedbacks')
  listMyFeedbacks(@Req() req: any): Promise<Feedback[]> {
    const customerId = req.user?.userID || req.user?.sub;
    return this.customerService.listFeedbacksForCustomer(customerId);
  }

  @UseGuards(CustomerGuard)
  @Put('feedbacks/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  updateFeedback(@Param('id') id: string, @Body() body: Partial<CreateFeedbackDto>): Promise<Feedback> {
    return this.customerService.updateFeedback(id, body);
  }

  @Get('exhibitions')
  listExhibitions() {
    return this.customerService.listExhibitions();
  }

  @Get('exhibitions/:id')
  getExhibition(@Param('id') id: string) {
    return this.customerService.getExhibitionPublic(id);
  }
}
