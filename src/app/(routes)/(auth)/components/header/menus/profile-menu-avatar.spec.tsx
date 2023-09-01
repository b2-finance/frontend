import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenuAvatar from './profile-menu-avatar';
import * as b2ServerFetch from '@/common/fetch/b2-server-fetch';
import { randomUUID } from 'crypto';

jest.mock('../../../../../../common/fetch/b2-server-fetch');

describe(ProfileMenuAvatar.name, () => {
  it('should return the first letter of the expected username', async () => {
    const username = 'Joe';

    jest.spyOn(b2ServerFetch, 'default').mockResolvedValue({
      data: { id: randomUUID(), username, email: 'username@email.com' }
    });

    /*
      Workaround for rendering async components.
      https://github.com/testing-library/react-testing-library/issues/1209#issuecomment-1546644411
    */
    const ResolvedProfileMenuAvatar = await ProfileMenuAvatar();
    render(ResolvedProfileMenuAvatar);

    const avatarText = await screen.findByText(username.charAt(0));
    expect(avatarText.innerHTML).toEqual(username.charAt(0));
  });
});
