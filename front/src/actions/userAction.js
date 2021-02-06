import * as type from './actionTypes';
import { createAction } from 'redux-actions';

export const getLoginRequest = createAction(type.LOG_IN_REQUEST);
export const getLoginSuccess = createAction(type.LOG_IN_SUCCESS);
export const getLoginFailure = createAction(type.LOG_IN_FAILURE);

export const getLogoutRequest = createAction(type.LOG_OUT_REQUEST);
export const getLogoutSuccess = createAction(type.LOG_OUT_SUCCESS);
export const getLogoutFailure = createAction(type.LOG_OUT_FAILURE);

export const getLoginData = createAction(type.GET_LOG_IN_DATA);
