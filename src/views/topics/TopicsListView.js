import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import NoTopicView from '../../components/NoTopicsView';
import TopicsList from '../../components/TopicsList';
import AppStyles from '../../config/Styles';
import AppColors from '../../config/Colors';
import {push} from '../../navigation/RootNavigation';

import AddBookIcon from '../../../static/add-book.png';

export default class TopicsListView extends React.Component {
  state = {
    isEmpty: false,
  };

  _navigateToAdd = () => {
    push('AddTopic', {doRefresh: this.topicListRef._fetchTopics});
  };

  render() {
    return (
      <View style={AppStyles.rootViewStyle}>
        {this.state.isEmpty ? (
          <NoTopicView />
        ) : (
          <TopicsList
            ref={component => (this.topicListRef = component)}
            {...this.props}
          />
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={this._navigateToAdd}>
          <View style={styles.addButtonImageContainer}>
            <Image style={styles.addButtonImage} source={AddBookIcon} />
          </View>
          <Text style={styles.addButtonText}>Add Topic</Text>
        </TouchableOpacity>
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
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    borderRadius: 10,
    padding: 10,
    backgroundColor: AppColors.secondaryAccentColor,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonImageContainer: {
    height: '100%',
    aspectRatio: 1,
    marginRight: 10,
  },
  addButtonImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  addButtonText: {
    fontSize: 17,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
});
