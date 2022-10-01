import { applyMiddleware, CombinedState, combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { GameReducer } from 'src/common/store/reducers/GameReducer';
import { GroupReducer } from 'src/common/store/reducers/GroupReducer';
import { ProviderReducer } from 'src/common/store/reducers/ProviderReducer';

import { UserReducer } from './reducers/UserReducer';

const combine = combineReducers({
  games: GameReducer,
  groups: GroupReducer,
  providers: ProviderReducer,
  user: UserReducer,
});
const loggerMiddleware =
  (storeAPI: any) =>
    (next: any) =>
      (action: any): any => {
        // console.log('dispatching', action);
        // OKU: https://redux.js.org/tutorials/fundamentals/part-6-async-logic
        storeAPI;
        const result = next(action);

        // console.log('next state', storeAPI.getState());
        return result;
      };

export type RootState = ReturnType<typeof combine>;
export const store: CombinedState<any> = createStore(combine, applyMiddleware(loggerMiddleware));
export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
// store.subscribe(() => console.log(store.getState().user));
