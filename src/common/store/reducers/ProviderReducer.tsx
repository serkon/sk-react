import { AnyAction, Reducer } from 'redux';
import { Provider } from 'src/common/dto/dto';

export enum PROVIDER_ACTION {
  SET_PROVIDERS = 'SET_PROVIDERS',
  SET_SELECTED_PROVIDERS = 'SET_SELECTED_PROVIDERS',
}

export interface ProviderState {
  list: Provider[];
  selected: Provider[];
}

const init: ProviderState = {
  list: [],
  selected: [],
};

export const ProviderReducer: Reducer = (state: ProviderState = init, action) => {
  switch (action.type) {
    case PROVIDER_ACTION.SET_PROVIDERS: {
      return { ...state, list: action.payload };
    }
    case PROVIDER_ACTION.SET_SELECTED_PROVIDERS: {
      return { ...state, selected: action.payload };
    }
    default:
      return state;
  }
};

export const set_providers = (payload: Provider[]): AnyAction => ({
  type: PROVIDER_ACTION.SET_PROVIDERS,
  payload,
});

export const set_selected_providers = (payload: Provider[]): AnyAction => ({
  type: PROVIDER_ACTION.SET_SELECTED_PROVIDERS,
  payload,
});
