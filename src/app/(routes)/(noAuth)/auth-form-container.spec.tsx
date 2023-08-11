import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthFormContainer, {
  AuthFormContainerProps
} from './auth-form-container';

let authFormContainer = (props?: Partial<AuthFormContainerProps>) => (
  <AuthFormContainer
    title={props?.title ?? ''}
    submit={{
      label: props?.submit?.label ?? '',
      action: props?.submit?.action ?? (() => {})
    }}
    switchAuthForm={{
      prompt: props?.switchAuthForm?.prompt ?? '',
      linkLabel: props?.switchAuthForm?.linkLabel ?? '',
      route: props?.switchAuthForm?.route ?? ''
    }}
    errors={props?.errors ?? []}
    children={props?.children ?? undefined}
  />
);

describe('AuthFormContainer', () => {
  it('should render the expected header', () => {
    const title = 'form-title';

    render(authFormContainer({ title }));
    const header = screen.getByRole('heading', { name: title });

    expect(header).toBeInTheDocument();
  });

  it('should render the expected submit button', () => {
    const props = {
      submit: {
        label: 'submit-label',
        action: () => {}
      }
    };
    render(authFormContainer(props));
    const button = screen.getByRole('button', { name: props.submit.label });

    expect(button).toBeInTheDocument();
  });

  it('should render the expected link to another auth form', () => {
    const props = {
      switchAuthForm: {
        prompt: 'switch-auth-form',
        route: '/route',
        linkLabel: 'link-label'
      }
    };
    render(authFormContainer(props));

    const link = screen.getByRole('link', {
      name: props.switchAuthForm.linkLabel
    });
    const prompt = screen.getByText(props.switchAuthForm.prompt);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', props.switchAuthForm.route);
    expect(prompt).toBeInTheDocument();
  });

  it('should render the expected child', () => {
    const props = {
      children: <input placeholder="input-placeholder" />
    };
    render(authFormContainer(props));

    const input = screen.getByPlaceholderText('input-placeholder');
    expect(input).toBeInTheDocument();
  });

  it('should render the expected errors', () => {
    const props = {
      errors: ['error1', 'error2']
    };
    render(authFormContainer(props));

    const error1 = screen.getByText(props.errors[0]);
    const error2 = screen.getByText(props.errors[1]);

    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
  });
});
