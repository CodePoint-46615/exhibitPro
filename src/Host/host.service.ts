import { Injectable } from '@nestjs/common';
import { HostDto } from './host.dto';
import { CreateUserDto } from './createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HostEntity } from './host.entity';
import{Repository}from 'typeorm';
import { UpdateStatusDto } from './updateStatus.dto';
import { MoreThan } from 'typeorm';

@Injectable()
export class HostService {
   constructor(
    @InjectRepository(HostEntity)
    private readonly hostRepo: Repository<HostEntity>,
  ) {}

  getHall() {
    return 'List of halls';
  }

  addExhibition(data: object) {
    return 'Exhibition added successfully' +data;
  }

  editExhibition(id: string, data: object) {
    return 'Exhibition with ID' + id + 'edited successfully'+data;
  }

  bookHall(data: object) {
    return 'Hall booked successfully'+data;
  }

  hallSearchByName(name: string) {
    return 'Search result for hall with name:' +name;
  }

  getExhibition() {
    return 'List of exhibitions';
  }

  deleteExhibitionByName(name: string) {
    return 'Exhibition named'+name +'deleted successfully';
  }

  getHallByLocation(location: string) {
    return 'List of halls in' + location;
  }

  getCustomerData() {
    return 'Customer data (for host)';
  }

  createUser(hostData:HostDto){
    return hostData;
  }


  create(createUserDto: CreateUserDto){
    const user=this.hostRepo.create(createUserDto);
    return this.hostRepo.save(user);

  }

    async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    await this.hostRepo.update(id, { status: updateStatusDto.status });
    return this.hostRepo.findOne({ where: { id } });
  }


   findInactive() {
    return this.hostRepo.find({ where: { status: 'inactive' } });
  }

  findOlderThan40() {
    return this.hostRepo.find({ where: { age: MoreThan(40) } });
  }

}
