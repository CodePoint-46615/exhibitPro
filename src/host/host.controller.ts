import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { HostService } from './host.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  @Delete('exhibitions/:id')
  removeExhibition(@Param('id') id: string) {
    return this.hostService.removeExhibition(id);
  }

  @UseGuards(HostGuard)
  @Post('exhibitions/:id/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/exhibitions',
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  uploadExhibitionImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.hostService.updateExhibitionImage(id, file?.filename);
  }

  // Host extras
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
