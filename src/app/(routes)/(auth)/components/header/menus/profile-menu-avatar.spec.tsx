import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenuAvatar from './profile-menu-avatar';
import userUtils from '@/app/bff-utils/b2/user-utils';
import { randomUUID } from 'crypto';

jest.mock('../../../../../bff-utils/b2/user-utils');

describe('ProfileAvatar', () => {
  it('should return the first letter of the expected username', async () => {
    const username = 'Joe';
    jest
      .spyOn(userUtils, 'getOne')
      .mockResolvedValue({
        id: randomUUID(),
        username,
        email: 'username@email.com'
      });
    render(<ProfileMenuAvatar />);

    const avatarText = await screen.findByText(username.charAt(0));
    expect(avatarText.innerHTML).toEqual(username.charAt(0));
  });
});
