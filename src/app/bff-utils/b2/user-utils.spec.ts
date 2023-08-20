import { randomUUID } from 'crypto';
import * as bffB2Request from './bff-b2-request';
import userUtils, { UserCreateDto, UserDto, UserUpdateDto } from './user-utils';

jest.mock('./bff-b2-request');

describe('userUtils', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createOne', () => {
    it('should return the created user', async () => {
      const createDto: UserCreateDto = {
        username: 'username',
        email: 'email@username.com',
        password: 'password'
      };
      const userDto: UserDto = {
        id: randomUUID(),
        username: createDto.username,
        email: createDto.email
      };
      jest.spyOn(bffB2Request, 'default').mockResolvedValue({ data: userDto });

      const actual = await userUtils.createOne(createDto);
      expect(actual).toEqual(userDto);
    });
  });

  describe('getOne', () => {
    it('should return the expected user', async () => {
      const userDto: UserDto = {
        id: randomUUID(),
        username: 'username',
        email: 'email@username.com'
      };
      jest.spyOn(bffB2Request, 'default').mockResolvedValue({ data: userDto });

      const actual = await userUtils.getOne(userDto.id);
      expect(actual).toEqual(userDto);
    });
  });

  describe('updateOne', () => {
    it('should return true when the update succeeds', async () => {
      const updateDto: UserUpdateDto = {
        username: 'username'
      };
      jest
        .spyOn(bffB2Request, 'default')
        .mockResolvedValue({ data: updateDto });

      const actual = await userUtils.updateOne(randomUUID(), updateDto);
      expect(actual).toEqual(true);
    });

    it('should return false when the update fails', async () => {
      const updateDto: UserUpdateDto = {
        username: 'username'
      };
      jest
        .spyOn(bffB2Request, 'default')
        .mockResolvedValue({ errors: ['Error!'] });

      jest.spyOn(console, 'error').mockImplementation(() => {});

      const actual = await userUtils.updateOne(randomUUID(), updateDto);
      expect(actual).toEqual(false);
    });
  });
});
