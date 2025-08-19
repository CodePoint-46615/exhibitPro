import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Booking } from './booking.entity';
import { Feedback } from './feedback.entity';
import { CreateBookingDto } from './create-booking.dto';
import { CreateFeedbackDto } from './create-feedback.dto';
import { CustomerGuard } from './customer.guard';
import { UpdateFeedbackDto } from './update-feedback.dto';

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
  @Post('feedbacks')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createFeedback(@Body() body: CreateFeedbackDto): Promise<Feedback> {
    return this.customerService.createFeedback(body);
  }

  @UseGuards(CustomerGuard)
  @Get('exhibitions')
  listExhibitions() {
    return this.customerService.listExhibitions();
  }

  @UseGuards(CustomerGuard)
  @Get('exhibitions/:id')
  getExhibition(@Param('id') id: string) {
    return this.customerService.getExhibitionPublic(id);
  }

  @UseGuards(CustomerGuard)
  @Get('bookings')
  listMyBookings(@Req() req: any) {
    const customerId = req.user?.sub;
    return this.customerService.listBookingsByCustomer(customerId);
  }

  @UseGuards(CustomerGuard)
  @Get('feedbacks')
  listMyFeedbacks(@Req() req: any) {
    const customerId = req.user?.sub;
    return this.customerService.listFeedbacksByCustomer(customerId);
  }

  @UseGuards(CustomerGuard)
  @Patch('feedbacks/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  updateFeedback(@Param('id') id: string, @Body() body: UpdateFeedbackDto) {
    return this.customerService.updateFeedback(id, body);
  }

  @UseGuards(CustomerGuard)
  @Patch('bookings/:id/cancel')
  cancelBooking(@Param('id') id: string) {
    return this.customerService.cancelBooking(id);
  }

  @UseGuards(CustomerGuard)
  @Patch('bookings/:id/pay')
  markBookingPaid(@Param('id') id: string) {
    return this.customerService.markBookingPaid(id);
  }
}
