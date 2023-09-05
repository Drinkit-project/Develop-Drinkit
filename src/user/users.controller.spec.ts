import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import createUserDto from './dto/createUser.dto';
import { Response } from 'express';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signUp', () => {
    it('should sign up a user', async () => {
      const userData: createUserDto = {
        name: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        address: {
          address: '서울특별시 강서구 방화동',
          name: '집',
          lat: 37,
          lng: 127,
        },
        phoneNumber: '01095450146',
        nickname: '땅콩',
        confirm: 'password123',
        isAdmin: false,
        isPersonal: false,
      };

      let expectedResult: Promise<void>; // 예상되는 결과를 설정

      // UserService의 signUp 메서드를 가로채고 가짜 데이터 반환
      jest.spyOn(usersService, 'signUp').mockResolvedValue(expectedResult);

      const result = await usersController.signUp(userData);

      expect(result).toBe(expectedResult);
    });
  });
});
