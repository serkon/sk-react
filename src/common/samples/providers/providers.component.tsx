import './providers.component.scss';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from 'src/common/component/axios/axios.component';
import { Filter } from 'src/common/component/filter/Filter';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { Provider } from 'src/common/dto/dto';
import { filter_game_by_provider } from 'src/common/store/reducers/GameReducer';
import { set_providers, set_selected_providers } from 'src/common/store/reducers/ProviderReducer';
import { RootState } from 'src/common/store/store';

export const Providers = (): JSX.Element => {
  const { translate } = useTranslate();
  const dispatch = useDispatch();
  const store = useSelector<RootState>((state: RootState): RootState => state) as RootState;
  const filterByTags = (providers: Provider[]): void => {
    dispatch(filter_game_by_provider(providers));
    dispatch(set_selected_providers(providers));
  };
  const memoizedCallback = useCallback(async () => {
    const response = await api.get('/providers');

    dispatch(set_providers(response.data.data));
  }, [dispatch]);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);

  return (
    <>
      <section className="provider-list">
        <h2 className="provider-title">{translate('Providers')}</h2>
        <Filter
          path="name"
          placeholder={'Search Providers'}
          data={store.providers?.list}
          onClick={(providers: Provider[]): void => filterByTags(providers)}
          reset={store.games?.reset}
        />
      </section>
    </>
  );
};
