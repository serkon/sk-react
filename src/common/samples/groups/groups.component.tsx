import './groups.component.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from 'src/common/component/axios/axios.component';
import { Filter } from 'src/common/component/filter/Filter';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { Group } from 'src/common/dto/dto';
import { filter_game_by_group } from 'src/common/store/reducers/GameReducer';
import { set_groups, set_selected_groups } from 'src/common/store/reducers/GroupReducer';
import { RootState } from 'src/common/store/store';

export const Groups = (): JSX.Element => {
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const filterByTags = (groups: Group[]): void => {
    dispatch(filter_game_by_group(groups));
    dispatch(set_selected_groups(groups));
  };

  filterByTags;

  useEffect(() => {
    const groups = async (): Promise<void> => {
      const response = await api.get('/groups');

      dispatch(set_groups(response.data.data));
    };

    groups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="groups-list">
        <h2 className="group-title">{translate('Groups')}</h2>
        <Filter path="name" placeholder={'Search Groups'} data={store.groups?.list} onClick={(groups: Group[]): void => filterByTags(groups)} reset={store.games?.reset} />
      </section>
    </>
  );
};
