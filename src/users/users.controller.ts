import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { CreateUserDto } from './createUsers.dto';
import { UpdateUserDto } from './updateUsers.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';

import { access } from 'fs';
import { UserGuard } from './user.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.userService.findAllWithoutPassword();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneWithoutPassword(id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @UseGuards(UserGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  replace(@Param('id') id: string, @Body() data: UpdateUserDto) {
    // Treat PUT as a full update semantically equivalent to update for this API
    return this.userService.update(id, data);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(UserGuard)
  @Get(':id/file')
  getProfilePicture(@Param('id') id: string) {
    return this.userService.getProfilePicture(id);
  }

  @UseGuards(UserGuard)
  @Post(':id/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  uploadProfileImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateProfileImage(id, file?.filename);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async login(@Body() credentials: LoginDto) {
    const user = await this.userService.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    // Return user data without password
    const payload = { sub: user.userID, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      }),
      user: {
        userID: user.userID,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    };
  }

  @UseGuards(UserGuard)
  @Post(':id/change-password')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async changePassword(
    @Param('id') id: string,
    @Body() data: ChangePasswordDto,
  ) {
    const success = await this.userService.changePassword(
      id,
      data.currentPassword,
      data.newPassword,
    );

    if (!success) {
      throw new NotFoundException('Current password is incorrect');
    }

    return { message: 'Password changed successfully' };
  }
}
