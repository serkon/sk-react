import { AnyAction, Reducer } from 'redux';
import { User } from 'src/common/dto/dto';

export enum USER_ACTION {
  SET_USER = 'SET_USER',
  SET_USER_STATUS = 'SET_USER_STATUS',
}

export interface UserState {
  status: boolean;
  user: User | null;
}

const init: UserState = {
  status: false,
  user: null,
};

export const UserReducer: Reducer = (state: UserState = init, action): UserState => {
  switch (action.type) {
    case USER_ACTION.SET_USER: {
      return { ...state, user: action.payload };
    }
    case USER_ACTION.SET_USER_STATUS: {
      return { ...state, status: action.payload };
    }
    default:
      return state;
  }
};

export const set_user = (payload: User): AnyAction => ({
  type: USER_ACTION.SET_USER,
  payload,
});

export const set_user_status = (payload: boolean): AnyAction => ({
  type: USER_ACTION.SET_USER_STATUS,
  payload,
});
