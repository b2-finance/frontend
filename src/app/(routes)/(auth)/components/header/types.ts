import { LinkProps } from 'next/link';

/**
 * Modes used for determining logic based on the user's authentication state.
 *
 * `auth`: True when the user is authenticated.
 * `noAuth`: True when the user is not authenticated.
 * `both`: Always true, regardless of the user's authentication state.
 */
export type AuthMode = 'auth' | 'noAuth' | 'both';

/**
 * Extension of next/link LinkProps to provide a display name for the link.
 */
export type HeaderLinkProps = LinkProps & {
  /**
   * The label displayed on the screen.
   */
  display: string;
  /**
   * Specifies under which authentication states the link should be rendered.
   */
  authMode: AuthMode;
};
