import React from 'react';
import {View, Image, ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import AppColors from '../config/Colors';
import AppValues from '../config/Values';

import SLIcon from 'react-native-vector-icons/SimpleLineIcons';

export default class TopicsList extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.viewContainer}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.topicNode}>
          <View style={styles.topicColor} />
          <View style={styles.topicImageContainer}>
            <Image
              style={styles.topicImage}
              source={AppValues.PICTURE_PLACEHOLDER_IMAGE}
            />
          </View>
          <View style={styles.topicTextContainer}>
            <View style={styles.topicTitleContainer}>
              <Text style={styles.topicTitleText}>Title Example</Text>
            </View>
            <View style={styles.topicdescriptionContainer}>
              <Text style={styles.topicDescriptionText}>
                Description Example
              </Text>
            </View>
          </View>
          <TouchableRipple
            borderless={true}
            onPress={() => {
              console.log('Test');
            }}
            rippleColor={AppColors.secondaryAccentColorDarker}
            style={styles.topicOptionsContainer}>
            <SLIcon name="options" size={20} />
          </TouchableRipple>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    borderRadius: 10,
    backgroundColor: AppColors.secondaryAccentColor,
    margin: 20,
    flex: 1,
  },
  topicColor: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    width: 7,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  topicNode: {
    borderRadius: 10,
    backgroundColor: AppColors.primaryColor,
    margin: 20,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 10,
  },
  topicImageContainer: {
    width: '25%',
    aspectRatio: 1,
  },
  topicImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  topicTextContainer: {
    width: '75%',
    justifyContent: 'center',
  },
  topicTitleContainer: {},
  topicTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  topicDescriptionContainer: {},
  topicDescriptionText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: AppColors.secondaryAccentColorDarker,
  },
  topicOptionsContainer: {
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 5,
  },
});
