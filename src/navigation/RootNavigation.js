import * as React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (name, params) =>
  navigationRef.current?.dispatch(CommonActions.navigate(name, params));

export const push = (name, params) =>
  navigationRef.current?.dispatch(StackActions.push(name, params));

export const pop = count =>
  navigationRef.current?.dispatch(StackActions.pop(count));

export const replace = (name, params) =>
  navigationRef.current?.dispatch(StackActions.replace(name, params));
