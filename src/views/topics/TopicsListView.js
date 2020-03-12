import React from 'react';
import {View, StyleSheet} from 'react-native';

import NoTopicView from '../../components/NoTopicsView';
import TopicsList from '../../components/TopicsList';
import AppStyles from '../../config/Styles';

export default class TopicsListView extends React.Component {
  state = {
    isEmpty: false,
  };

  render() {
    return (
      <View style={AppStyles.rootViewStyle}>
        {this.state.isEmpty ? <NoTopicView /> : <TopicsList />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
