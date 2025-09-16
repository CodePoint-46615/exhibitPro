import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './createUsers.dto';
import { UpdateUserDto } from './updateUsers.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createUser(user: CreateUserDto): Promise<Users> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, this.SALT_ROUNDS);

    const save = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return await this.userRepository.save(save);
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { userID: id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, data: UpdateUserDto): Promise<Users> {
    const user = await this.findOne(id); // Ensures user exists

    // Always hash the password since it's required
    data.password = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    Object.assign(user, data);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Users not found');
    return { message: 'User deleted successfully' };
  }

  async updateProfileImage(id: string, filename?: string): Promise<Users> {
    const user = await this.findOne(id);
    user.profile_image = filename ?? (undefined as unknown as string);
    return await this.userRepository.save(user);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<Users | null> {
    const user = await this.findByEmail(email);
    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.findOne(userId);

    // Verify current password
    if (!(await this.comparePassword(currentPassword, user.password))) {
      return false;
    }

    // Hash and update new password
    const hashedNewPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
    user.password = hashedNewPassword;
    await this.userRepository.save(user);

    return true;
  }

  private excludePassword(user: Users): Omit<Users, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findOneWithoutPassword(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.findOne(id);
    return this.excludePassword(user);
  }

  async findAllWithoutPassword(): Promise<Omit<Users, 'password'>[]> {
    const users = await this.findAll();
    return users.map((user) => this.excludePassword(user));
  }

  async getProfilePicture(id: string): Promise<Buffer | null> {
    const user = await this.findOne(id);
    if (!user.profile_image) return null;
    const fs = await import('fs/promises');
    const path = await import('path');
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      user.profile_image,
    );
    try {
      return await fs.readFile(imagePath);
    } catch {
      return null;
    }
  }
}
