import { Body, Controller, Delete, Get, Param, Post, Put,Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { HostService } from './host.service';
import { HostDto } from './host.dto';
import { CreateUserDto } from './createUser.dto';
import { UpdateStatusDto } from './updateStatus.dto';


@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('hall')
  getHall() {
    return this.hostService.getHall();
  }

  @Post('addExhibition')
  addExhibition(@Body() data: object) {
    return this.hostService.addExhibition(data);
  }

  @Put('editExhibition/:id')
  editExhibition(@Param('id') id: string, @Body() data: object) {
    return this.hostService.editExhibition(id, data);
  }

  @Post('bookhall')
  bookHall(@Body() data: object) {
    return this.hostService.bookHall(data);
  }

  @Get('hallSearchByName')
  hallSearchByName(@Query('name') name: string) {
    return this.hostService.hallSearchByName(name);
  }

  @Get('exhibition')
  getExhibition() {
    return this.hostService.getExhibition();
  }

  @Delete('exhibitionByName/:name')
  deleteExhibitionByName(@Param('name') name: string) {
    return this.hostService.deleteExhibitionByName(name);
  }

  @Get('hallByLocation')
  getHallByLocation(@Query('location') location: string) {
    return this.hostService.getHallByLocation(location);
  }

  @Get('customerData')
  getCustomerData() {
    return this.hostService.getCustomerData();
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() hostData:HostDto){
    return this.hostService.createUser(hostData);
  }


  @Post()
  create(@Body() createUserDto:CreateUserDto){
    return this.hostService.create(createUserDto);
  }

  
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.hostService.updateStatus(+id, dto);
  }

  @Get('inactive')
  findInactive() {
    return this.hostService.findInactive();
  }

  @Get('older-than-40')
  findOlderThan40() {
    return this.hostService.findOlderThan40();
  }

}
