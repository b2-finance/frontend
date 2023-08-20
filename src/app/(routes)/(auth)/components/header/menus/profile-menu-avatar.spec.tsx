import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenuAvatar from './profile-menu-avatar';
import * as bffB2Request from '@/app/bff-utils/b2/bff-b2-request';

jest.mock('../../../../../bff-utils/b2/bff-b2-request');

describe('ProfileAvatar', () => {
  it('should return the first letter of the expected username', async () => {
    const username = 'Joe';
    jest
      .spyOn(bffB2Request, 'default')
      .mockResolvedValue({ data: { username } });
    render(<ProfileMenuAvatar />);

    const avatarText = await screen.findByText(username.charAt(0));
    expect(avatarText.innerHTML).toEqual(username.charAt(0));
  });
});
