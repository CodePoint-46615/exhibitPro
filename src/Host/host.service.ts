import { Injectable } from '@nestjs/common';

@Injectable()
export class HostService {
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
}
