import './games.component.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from 'src/common/component/axios/axios.component';
import { Button } from 'src/common/component/button/button.component';
import { reset_game, set_games } from 'src/common/store/reducers/GameReducer';
import { RootState } from 'src/common/store/store';

export const Games = ({ inputRef }: { inputRef: React.RefObject<HTMLInputElement> }): JSX.Element => {
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const [games, setGames] = useState<any[]>([]);
  const [columns, setColumns] = useState<number>(store.games?.columns);
  const reset = (): void => {
    dispatch(reset_game());
    (inputRef.current as HTMLInputElement).value = '';
  };

  useEffect(() => {
    const games = async (): Promise<void> => {
      const response = await api.get('/games');

      dispatch(set_games(response.data.data));
    };

    games();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGames(store.games?.filtered);
  }, [store.games?.filtered]);

  useEffect(() => {
    setColumns(store.games?.columns);
  }, [store.games?.columns]);

  return (
    <>
      <section className="game-list" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {games &&
          games.map((game, key) => (
            <div
              className="game"
              key={key}
              style={{ backgroundImage: `url(${game.cover})`, height: `${store.games?.columns === 2 ? '291px' : store.games?.columns === 3 ? '191px' : '141px'}` }}
            />
          ))}
      </section>
      {games && games.length <= 0 && (
        <div className="no-game">
          <div>No game found</div>
          <div className="reset">
            <Button className="btn-secondary" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
