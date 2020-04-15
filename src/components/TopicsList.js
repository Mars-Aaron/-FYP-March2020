import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

import AppColors from '../config/Colors';
import LoaderImage from '../../static/loading-color.png';
import CollectionFactory from '../models/NLCollectionFactory';
import Topic from '../models/NLTopic';
import {
  getNotesWhere,
  Fields as NotebookThemeFields,
} from '../config/NotebookThemes';
import {push} from '../navigation/RootNavigation';
import SmallButton from '../components/NLSmallButton';

export default class TopicsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loaderRotate: new Animated.Value(0),
      topics: [],
    };
    this.topicReference = CollectionFactory.createTopicCollectionReference();
  }

  _navigateToTopic = topic => {
    push('Topic', {topic: topic});
  };

  renderTopics = () => {
    // console.log(this.state.topics);
    return this.state.topics.map((topic, index) => {
      let notebookTheme = getNotesWhere(
        NotebookThemeFields.Name,
        topic[Topic.Fields.theme],
      );
      // console.log(notebookTheme);
      let itemMarginBottom = index === this.state.topics.length - 1 ? 20 : 10;
      return (
        <View
          style={[styles.topicItem, {marginBottom: itemMarginBottom}]}
          key={index}>
          <View
            style={[
              styles.topicNotebookContainer,
              {
                backgroundColor: `${notebookTheme.TextContainerColor}88`,
              },
            ]}>
            <notebookTheme.Component style={styles.topicNotebook} />
          </View>
          <View style={styles.topicNameContainer}>
            <Text
              style={[
                styles.topicNameText,
                {
                  color: AppColors.secondaryTextColor,
                },
              ]}>
              {topic[Topic.Fields.TopicName].trim()}
            </Text>
          </View>
          <SmallButton
            title="Open"
            isPrimary={true}
            onPress={() => this._navigateToTopic(topic)}
          />
        </View>
      );
    });
  };

  _startLoading = () => {
    // this.setState({isLoading: true});
    this.state.loaderRotate.setValue(0);
    this.loadingAnimation = Animated.timing(this.state.loaderRotate, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    });
    this.loadingAnimation.start(() => {
      this.state.isLoading && this._startLoading();
    });
  };

  _finishActivity = () => {
    this.setState({isLoading: false});
  };

  _fetchTopics = () => {
    this._startLoading();
    this.topicReference.GetAllTopics(topics => {
      let topicsData = topics.map(topicData => {
        // console.log({...topicData._data, id: topicData.id});
        return {...topicData._data, id: topicData.id};
      });
      this.setState({topics: topicsData}, this._finishActivity);
    });
  };

  componentDidMount = () => {
    this._fetchTopics();
  };

  render() {
    const RotateData = this.state.loaderRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.viewContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {!this.state.isLoading && this.renderTopics()}
        </ScrollView>
        {this.state.isLoading && (
          <View style={styles.loadingOverlay}>
            <Animated.Image
              width={50}
              height={50}
              source={LoaderImage}
              style={{transform: [{rotate: RotateData}]}}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    borderRadius: 10,
    backgroundColor: AppColors.secondaryAccentColorDarker,
    margin: 10,
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    padding: 10,
  },
  topicItem: {
    padding: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.primaryColor,
  },
  topicNotebookContainer: {
    borderRadius: 1000,
    padding: 10,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicNameAndTagsContainer: {
    // backgroundColor: `${AppColors.secondaryAccentColor}55`,
    // borderRadius: 5,
    padding: 10,
    width: '70%',
  },
  topicNameContainer: {
    // backgroundColor: `${AppColors.accentColor}55`,
    // borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  topicTagsContainer: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicNameText: {
    fontFamily: 'FaxSansBeta',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'left',
    // backgroundColor: AppColors.secondaryAccentColor,
  },
  topicNotebook: {
    width: 50,
    aspectRatio: 1,
  },
  tagContainer: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 40,
    borderWidth: 2,
    marginRight: 5,
    marginBottom: 5,
    borderColor: AppColors.secondaryAccentColorDarker,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 10,
  },
  tagRemoveButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: AppColors.secondaryAccentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicNameTitleLabel: {
    backgroundColor: `${AppColors.secondaryAccentColor}99`,
    padding: 5,
    borderRadius: 3,
  },
  topicNameLabel: {
    backgroundColor: `${AppColors.secondaryAccentColor}99`,
    padding: 5,
    borderRadius: 3,
  },
});
