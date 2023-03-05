import './home.screen.scss';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/common/component/button/button.component';
import { Filter } from 'src/common/component/filter/Filter';
import { Header } from 'src/common/component/header/header.component';
import { Input } from 'src/common/component/input/input.component';
import { Slider } from 'src/common/component/slider/slider.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { Authenticator } from 'src/common/component/user/authenticator.component';
import { useDirection } from 'src/common/hooks/hooks';
import { filter_game_by_search_string, set_game_columns } from 'src/common/store/reducers/GameReducer';
import { RootState } from 'src/common/store/store';

export const HomeScreen = (): JSX.Element => {
  let timeout: number;
  const { translate } = useTranslate();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  /**
   * It takes the value of the input field, clears the timeout, sets a new timeout, and then dispatches
   * the filter_game_by_search_string action with the value of the input field
   */
  const change = (): void => {
    const value = inputRef.current?.value;

    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (typeof value === 'string' && value?.length >= 0) {
        dispatch(filter_game_by_search_string(inputRef.current?.value ? inputRef.current?.value : ''));
      }
    }, 400);
  };
  /**
   * It signs out the user and navigates to the home page.
   */
  const signOut = (): void => {
    Authenticator.signOut(() => {
      navigate('/');
    });
  };
  /**
   * It sets the number of columns in the game.
   * @param {number} columns - number
   */
  const setColumn = (columns: number): void => {
    dispatch(set_game_columns(columns));
  };
  const direction = useDirection();

  useEffect(() => console.log(store));

  return (
    <>
      <Header className="header">
        <div className="container">
          <div className="row show-filters" title="test-case-goes-here">
            <div className="col-xs-12" style={{ alignItems: 'center', flexDirection: 'row' }}>
              <img src="/images/logo.svg" alt="logo" className="logo" />
              <p style={{ flexGrow: 1, textAlign: 'end' }}>{Authenticator.user?.name}</p>
              <Button
                className="btn-error ghost signout-button"
                iconLeft="eyes"
                onClick={(): void => {
                  direction({ to: 'about' });
                }}
              >
                {translate('About')}
              </Button>
              <Button className="btn-error ghost signout-button" iconLeft="eyes" onClick={signOut}>
                {translate('Logout')}
              </Button>
            </div>
          </div>
        </div>
      </Header>
      <div className="container main-section">
        <section className="col-xs-12 col-md-12 filter-section">
          <Input label={translate('Search')} iconRight="search" onInput={(): void => change()} ref={inputRef} />
          <h2>Store</h2>
          {<code>{JSON.stringify(store)}</code>}
          <div className={`menu ${isMenuOpen ? 'open' : 'close'}`}>filter showing</div>
          <Filter path="name" placeholder={'Search Groups'} data={store.groups?.list} onClick={(): void => console.log('filter click')} reset={store.games?.reset} />
          <Slider count={5} onClick={setColumn} reset={store.games?.reset} />
        </section>
        <section className="col-xs-12 col-md-12 content">
          <Button className="btn-primary ghost" iconLeft="menu" onClick={(): void => setMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? translate('Hide filters') : translate('Show filters')}
          </Button>
        </section>
      </div>
    </>
  );
};
