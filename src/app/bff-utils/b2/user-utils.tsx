import bffB2Request from './bff-b2-request';

/**
 * Contains required attributes for a new user.
 */
export interface UserCreateDto {
  username: string;
  email: string;
  password: string;
}

/**
 * Contains updated attributes for an existing user.
 */
export interface UserUpdateDto {
  username?: string;
  email?: string;
}

/**
 * Represents an application user.
 */
export interface UserDto {
  id: string;
  username: string;
  email: string;
}

/**
 * Provides functions related to application users.
 */
const userUtils = {
  /**
   * Creates a new user with the B2 API.
   *
   * @param dto {@link UserCreateDto}
   * @param signal {@link AbortController.signal}
   * @returns A {@link UserDto}.
   */
  createOne: async (
    dto: UserCreateDto,
    signal?: AbortSignal
  ): Promise<UserDto> => {
    const { data, errors } = await bffB2Request({
      path: '/users',
      options: {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dto),
        signal
      }
    });

    if (errors) console.error(errors);
    return data;
  },

  /**
   * Gets the identified user.
   *
   * @param userId A user id.
   * @param signal {@link AbortController.signal}
   * @returns A {@link UserDto}.
   */
  getOne: async (userId: string, signal?: AbortSignal): Promise<UserDto> => {
    const { data, errors } = await bffB2Request({
      path: '/users/' + userId,
      options: { signal }
    });

    if (errors) console.error(errors);
    return data;
  },

  /**
   * Updates the identified user.
   *
   * @param userId A user id.
   * @param dto {@link UserUpdateDto}
   * @param signal {@link AbortController.signal}
   * @returns True if the update was successful, or false otherwise.
   */
  updateOne: async (
    userId: string,
    dto: UserUpdateDto,
    signal?: AbortSignal
  ): Promise<boolean> => {
    const { errors } = await bffB2Request({
      path: '/users/' + userId,
      options: {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dto),
        signal
      }
    });
    if (errors) {
      console.error(errors);
      return false;
    }
    return true;
  }
};

export default userUtils;
