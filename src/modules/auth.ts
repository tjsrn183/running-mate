import { createAction, handleActions, Action } from 'redux-actions';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

type AuthFormKey =
  | 'id'
  | 'password'
  | 'name'
  | 'phoneNumber'
  | 'nickname'
  | 'birthday'
  | 'sex';

interface AuthState {
  register: {
    [key in AuthFormKey]: string;
  };
  login: {
    id: string;
    password: string;
  };
}

interface ChangeFieldPayload {
  form: 'register' | 'login';
  key: AuthFormKey;
  value: string;
}

export const changeField = createAction<
  ChangeFieldPayload,
  { form: 'register' | 'login'; key: AuthFormKey; value: string }
>(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value
}));

export const initializeForm = createAction<keyof AuthState, keyof AuthState>(
  INITIALIZE_FORM,
  (form) => form
);

const initialState: AuthState = {
  register: {
    id: '',
    password: '',
    name: '',
    phoneNumber: '',
    nickname: '',
    birthday: '',
    sex: ''
  },
  login: {
    id: '',
    password: ''
  }
};

const auth = handleActions<AuthState, any>(
  {
    [CHANGE_FIELD]: (
      state,
      { payload: { form, key, value } }: Action<ChangeFieldPayload>
    ) => ({
      ...state,
      [form]: {
        ...state[form],
        [key]: value
      }
    }),
    [INITIALIZE_FORM]: (state, { payload: form }: Action<keyof AuthState>) => ({
      ...state,
      [form]: initialState[form]
    })
  },
  initialState
);

export default auth;
