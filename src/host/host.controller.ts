import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, UseGuards, Put } from '@nestjs/common';
import { HostService } from './host.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { extname } from 'path';
import { CreateExhibitionDto } from './createExhibition.dto';
import { UpdateExhibitionDto } from './updateExhibition.dto';
import { HostGuard } from './host.guard';


@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}
  
  @UseGuards(HostGuard)
  @Post('exhibitions')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createExhibition(@Body() dto: CreateExhibitionDto) {
    return this.hostService.createExhibition(dto);
  }

  @UseGuards(HostGuard)
  @Get('exhibitions')
  listExhibitions() {
    return this.hostService.listExhibitions();
  }

  @UseGuards(HostGuard)
  @Get('exhibitions/:id')
  getExhibition(@Param('id') id: string) {
    return this.hostService.getExhibition(id);
  }

  @UseGuards(HostGuard)
  @Patch('exhibitions/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  updateExhibition(@Param('id') id: string, @Body() dto: UpdateExhibitionDto) {
    return this.hostService.updateExhibition(id, dto);
  }

  @UseGuards(HostGuard)
  @Put('exhibition/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  updateWholeExhibition(@Param('id') id: string, @Body() dto: CreateExhibitionDto) {
    return this.hostService.updateWholeExhibition(id, dto);
  }

  @UseGuards(HostGuard)
  @Delete('exhibitions/:id')
  removeExhibition(@Param('id') id: string) {
    return this.hostService.removeExhibition(id);
  }

  @UseGuards(HostGuard)
  @Post('exhibitions/:id/upload-image')
  @UseInterceptors(FileInterceptor('file', { fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) cb(null, true);
    else {
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    } },
    limits: { fileSize: 30000 }, storage:diskStorage({
      destination: './uploads/exhibitions',
      filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname) },
      })
    }))
  uploadExhibitionImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.hostService.updateExhibitionImage(id, file?.filename);
  }


  @UseGuards(HostGuard)
  @Get(':hostId/exhibitions')
  listMyExhibitions(@Param('hostId') hostId: string) {
    return this.hostService.listMyExhibitions(hostId);
  }

  @UseGuards(HostGuard)
  @Get('exhibitions/:id/bookings')
  listExhibitionBookings(@Param('id') id: string) {
    return this.hostService.listExhibitionBookings(id);
  }

  @UseGuards(HostGuard)
  @Get('exhibitions/:id/feedback')
  listExhibitionFeedback(@Param('id') id: string) {
    return this.hostService.listExhibitionFeedback(id);
  }

  @UseGuards(HostGuard)
  @Get('exhibitions/:id/stats')
  getExhibitionStats(@Param('id') id: string) {
    return this.hostService.getExhibitionStats(id);
  }
}
