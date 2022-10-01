import './columns.component.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'src/common/component/slider/slider.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { set_game_columns } from 'src/common/store/reducers/GameReducer';
import { RootState } from 'src/common/store/store';

export const Columns = (): JSX.Element => {
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const setColumn = (columns: number): void => {
    dispatch(set_game_columns(columns));
  };

  return (
    <section className="columns-list">
      <h2 className="column-title">{translate('Columns')}</h2>
      <Slider count={3} onClick={setColumn} reset={store.games?.reset} />
    </section>
  );
};
