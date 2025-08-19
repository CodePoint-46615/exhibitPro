import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from 'src/users/createUsers.dto';
import { Users } from 'src/users/users.entity';
import { AdminGuard } from './admin.guard';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @UseGuards(AdminGuard)
    @Get('all-customers')
    findAllCustomers(): Promise<Users[]> {
        return this.adminService.allCustomers();
    }

    @UseGuards(AdminGuard)
    @Get('all-hosts')
    findAllHosts(): Promise<Users[]> {
        return this.adminService.allHosts();
    }

    @UseGuards(AdminGuard)
    @Get('all-users')
    findAllUsers(): Promise<Users[]> {
        return this.adminService.allUsers();
    }

    @UseGuards(AdminGuard)
    @Patch('update-role')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateUserRole(@Body('id') id: string, @Body() data: Partial<CreateUserDto>, @Query('admin_id') adminId?: string) : Promise<Users> {
        return this.adminService.updateUserRole(id, data, adminId);
    }

    // Exhibitions
    @UseGuards(AdminGuard)
    @Get('exhibitions')
    listExhibitions() {
        return this.adminService.listExhibitions();
    }

    @UseGuards(AdminGuard)
    @Get('exhibitions/:id')
    getExhibition(@Param('id') id: string) {
        return this.adminService.getExhibition(id);
    }

    @UseGuards(AdminGuard)
    @Patch('exhibitions/:id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateExhibition(@Param('id') id: string, @Body() data: any, @Query('admin_id') adminId?: string) {
        return this.adminService.updateExhibition(id, data, adminId);
    }

    @UseGuards(AdminGuard)
    @Delete('exhibitions/:id')
    deleteExhibition(@Param('id') id: string, @Query('admin_id') adminId?: string) {
        return this.adminService.deleteExhibition(id, adminId);
    }

    @UseGuards(AdminGuard)
    @Get('bookings')
    listBookings() {
        return this.adminService.listBookings();
    }

    @UseGuards(AdminGuard)
    @Get('bookings/:id')
    getBooking(@Param('id') id: string) {
        return this.adminService.getBooking(id);
    }

    @UseGuards(AdminGuard)
    @Get('feedbacks')
    listFeedbacks() {
        return this.adminService.listFeedbacks();
    }

    @UseGuards(AdminGuard)
    @Get('actions')
    listAdminActions() {
        return this.adminService.listAdminActions();
    }
}
