import './login.screen.scss';

import type { Location } from 'history';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'src/common/component/button/button.component';
import { Input } from 'src/common/component/input/input.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { Authenticator } from 'src/common/component/user/authenticator.component';

export const LoginScreen = (): JSX.Element => {
  const { translate } = useTranslate();
  const navigate = useNavigate();
  const location: Location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';
  const [state, setState] = React.useState<{ error: string } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    waiting(true);
    Authenticator.signIn(
      { username, password },
      () => {
        navigate(from, { replace: true });
        waiting(false);
      },
      () => {
        setState({ error: translate('Invalid_email_or_password') });
        waiting(false);
      },
    );
  };
  const waiting = (status: boolean): void => {
    setLoading(status);
  };

  return (
    <div className="login-screen container">
      <img src="/images/logo.svg" alt="logo" className="logo" />
      <p className="direction">You must log in to view the page at {from}</p>
      {state?.error && <p className="error">{state?.error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <Input label={translate('Username')} defaultValue={'player1'} width="100%" name="username" />
        <Input label={translate('Password')} defaultValue={'player1'} type="password" name="password" iconRight="eyes" />
        <Button type="submit" className="btn-primary login-button" disabled={loading}>
          {!loading ? translate('Login') : <img src="/images/common/loading.svg" className="loading-icon" />}
        </Button>
      </form>
    </div>
  );
};
