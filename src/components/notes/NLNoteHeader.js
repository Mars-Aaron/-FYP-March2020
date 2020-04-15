import React from 'react';
import {
  View,
  Text,
  TextInput,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppColors from '../../config/Colors';
import Loading from '../../../static/loading-color.png';
import CollectionFactory from '../../models/NLCollectionFactory';
import Note from '../../models/NLNote';

const DEFAULT_TITLE = 'Title Here';

export default class NLNoteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      added: this.props.added ?? false,
      iconTransform: new Animated.Value(0),
    };
    if (!this.state.added) {
      this.noteRef = CollectionFactory.createNoteCollectionReference(
        this.props.topic.id,
      );
    }
    // console.log(this.noteRef._name);
  }

  _startLoading = () => {
    this.state.iconTransform.setValue(0);
    this.loadingAnimation = Animated.timing(this.state.iconTransform, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    });
    this.loadingAnimation.start(() => {
      !this.state.added && this._startLoading();
    });
  };

  componentDidMount = () => {
    if (!this.state.added) {
      this._startLoading();
      var data = {};
      data[Note.Fields.Title] = this.props.title;
      data[Note.Fields.NoteType] = Note.NoteTypes.Header;
      this.noteRef.AddNote(data, () => {
        this.setState({added: true});
      });
    }
  };

  render = () => {
    const RotateData = this.state.iconTransform.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.headerTitle}>
          {this.props.title === '' ? DEFAULT_TITLE : this.props.title}
        </Text>
        <View style={styles.loadingContainer}>
          {!this.state.added ? (
            <Animated.Image
              source={Loading}
              style={[styles.loadingImage, {transform: [{rotate: RotateData}]}]}
            />
          ) : (
              <Ionicons
                name="ios-checkmark"
                size={25}
                color={AppColors.accentColor}
              />
            )}
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    justifyContent: 'center',
    borderBottomColor: AppColors.secondaryTextColor,
  },
  headerTitleEditorContainer: {
    backgroundColor: AppColors.secondaryAccentColor,
    borderRadius: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  headerTitleEditor: {
    fontFamily: 'FaxSansBeta',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 0,
    flex: 1,
  },
  doneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingHorizontal: 10,
    backgroundColor: AppColors.accentColor,
  },
  headerTitle: {
    fontFamily: 'FaxSansBeta',
    fontSize: 22,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

/**
 * {this.state.hasFocus ? (
          <View style={styles.headerTitleEditorContainer}>
            <TextInput
              ref={component => (this.textInput = component)}
              style={styles.headerTitleEditor}
              onChange={this._textOnChange}
              onBlur={this._loseFocus}
            />
            <TouchableOpacity
              ref={component => (this.doneButton = component)}
              style={styles.doneButton}
              onPress={this._done}>
              <Ionicons
                name="ios-checkmark"
                size={20}
                color={AppColors.primaryColor}
              />
            </TouchableOpacity>
            </View>
 */
