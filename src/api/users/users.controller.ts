import { SuccessConstant } from '@/commons/constant';
import { Controller, Get, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async findAll() {
    const users = await this.userService.findAllUsers();
    if (!users) {
      throw new HttpException(
        'Desculpe, houve um problema ao consultar os usuarios, Por favor tente novamente mais tarde.',
        403,
      );
    }
    return users;
  }

  @Get('/save')
  async saveAll() {
    try {
      await this.userService.saveDataUsers();
      return SuccessConstant.success;
    } catch (error) {
      throw new HttpException(
        'Desculpe, houve um problema ao salvar os usuarios, Por favor tente novamente mais tarde.',
        403,
      );
    }
  }
}
