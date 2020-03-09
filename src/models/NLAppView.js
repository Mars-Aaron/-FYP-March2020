import React from 'react';
import {} from 'react-native';

export default class NLAppView extends React.Component {
  constructor(props, state) {
    super(props);
    this.state = {
      ...{
        showingDialog: false,
        isLoading: false,
        modelStateValid: true,
      },
      ...state,
    };
  }
}
