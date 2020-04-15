import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Notebook from '../../components/NLNotebook';
import NotebookThemes from '../../config/NotebookThemes';
import AppStyles from '../../config/Styles';
import AppColors from '../../config/Colors';
import Textfield from '../../components/NLTextField';
import SmallButton from '../../components/NLSmallButton';
import NotebookList from '../../components/NLNotebookList';
import Dialog from '../../components/NLDialog';
import CollectionFactory from '../../models/NLCollectionFactory';
import Topic from '../../models/NLTopic';
import ActivityIndicator from '../../components/NLActivityIndicator';
import rootNavigation from '../../navigation/RootNavigation';

const SHOWING_NOTEBOOK_LIST = 10;
const HIDING_NOTEBOOK_LIST = -110;

export default class AddTopicView extends React.Component {
  constructor(props) {
    super(props);
    this.topicReference = CollectionFactory.createTopicCollectionReference();
    props.navigation.setOptions({
      headerRight: () => (
        <SmallButton
          ref={component => (this.addTopicButtonRef = component)}
          iconName="ios-checkmark"
          labelType="icon"
          isPrimary={true}
          onPress={this._addTopic}
        />
      ),
    });

    this.state = {
      topicName: '',
      tags: [],
      hasActivity: false,
      showingDialog: false,
      dialogInfo: {
        title: '',
        message: '',
        actions: [],
      },
      tagValue: '',
      tagValueModelState: true,
      topicNameModelState: true,
      notebookTheme: NotebookThemes.SOPHISTICATED,
      notebookListX: new Animated.Value(HIDING_NOTEBOOK_LIST),
    };
  }

  _onChangeTopicName = (topicName, isValidInput) => {
    this.setState(
      {topicNameModelState: isValidInput, topicName: topicName},
      () => this.notebookRef.setTopicName(this.state.topicName),
    );
  };

  _getTopicName = () => {
    return this.state.topicName;
  };

  _getTagValue = () => {
    return this.state.tagValue;
  };

  _onChangeTagValue = (tagValue, isValidInput) => {
    this.setState({tagValueModelState: isValidInput, tagValue: tagValue});
  };

  _getTags = () => {
    return this.state.tags.map((tag, index) => {
      return (
        <View key={index} style={styles.tagContainer}>
          <TouchableOpacity
            style={styles.tagRemoveButton}
            onPress={() => {
              this.setState(
                {
                  tags: this.state.tags.filter((_value, indx) => {
                    return indx !== index;
                  }),
                },
                () => console.log(this.state.tags),
              );
            }}>
            <Ionicons
              name="ios-close-circle-outline"
              size={20}
              color={AppColors.secondaryAccentColorDarker}
            />
          </TouchableOpacity>
          <Text>{tag}</Text>
        </View>
      );
    });
  };

  _showThemes = () => {
    Animated.timing(this.state.notebookListX, {
      useNativeDriver: false,
      toValue: SHOWING_NOTEBOOK_LIST,
    }).start();
  };

  _hideThemes = () => {
    Animated.timing(this.state.notebookListX, {
      useNativeDriver: false,
      toValue: HIDING_NOTEBOOK_LIST,
    }).start();
  };

  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  selectNotebook = notebookTheme => {
    this.setState({notebookTheme: notebookTheme}, this._hideThemes);
  };

  _isTopicNameEmpty = () => {
    return this.state.topicName === '';
  };

  _isTopicNameValid = () => {
    return this.state.topicNameModelState;
  };

  isValid = () => {
    return !this._isTopicNameEmpty() && this._isTopicNameValid();
  };

  _toggleActivity = () => {
    this.setState({hasActivity: !this.state.hasActivity});
  };

  _toggleDialog = () => {
    this.setState({showingDialog: !this.state.showingDialog});
  };

  _completeAdd = () => {
    this._toggleActivity();
    this.addTopicButtonRef._stopLoading();
    this.state.dialogInfo.title = 'Success';
    this.state.dialogInfo.message = 'The topic has been successfully added!';
    this.state.dialogInfo.actions = [
      {
        title: 'Okay',
        isPrimary: true,
        callback: () => {
          this._toggleDialog();
          this.props.navigation.goBack();
          this.props.route.params.doRefresh();
        },
      },
    ];
    this.setState({
      tags: [],
      topicName: '',
      notebookTheme: NotebookThemes.SOPHISTICATED,
      showingDialog: true,
    });
  };

  _addTopic = () => {
    this._dismissKeyboard();
    if (this.isValid()) {
      this._toggleActivity();
      this.addTopicButtonRef._startLoading();
      let data = {};
      data[Topic.Fields.TopicName] = this.state.topicName;
      data[Topic.Fields.Tags] = this.state.tags;
      data[Topic.Fields.theme] = this.state.notebookTheme.name;
      this.topicReference.CreateTopic(data, this._completeAdd);
    } else {
      this.topicNameTextfieldRef._makeInvalid();
    }
  };

  _addTag = () => {
    // add topic (refer controller)
    // console.log(this.state.tagValue);
    if (this.state.tagValue !== '') {
      // alert('entered');
      this.state.tags.push(this.state.tagValue);
      this.setState({tagValue: ''});
    }
  };

  render = () => {
    // console.log(this.state.topicName);
    return (
      <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
        <View style={[AppStyles.rootViewStyle, styles.viewContainer]}>
          <View style={styles.notebookContainer}>
            <Notebook
              ref={component => (this.notebookRef = component)}
              theme={this.state.notebookTheme}
              getTopicName={this._getTopicName}
              style={styles.notebook}
            />
            <TouchableOpacity
              style={styles.showThemesButton}
              onPress={this._showThemes}>
              <Text style={AppStyles.primaryButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.topicNameContainer}>
              <View style={styles.topicNameLabelContainer}>
                {/* <MCIcon name="book-outline" style={styles.usernameAnnotation} /> */}
                <Text style={styles.topicNameLabelText}>Topic Name</Text>
              </View>
              <Textfield
                ref={component => (this.topicNameTextfieldRef = component)}
                type="topic"
                placeholder="Name"
                _getValue={this._getTopicName}
                _onChangeValue={this._onChangeTopicName}
                containerStyle={styles.textfieldContainerStyle}
              />
            </View>
            <View style={styles.topicNameContainer}>
              <View style={styles.topicNameLabelContainer}>
                {/* <MCIcon name="book-outline" style={styles.usernameAnnotation} /> */}
                <Text style={styles.topicNameLabelText}>Tags</Text>
              </View>
              <Textfield
                type="name"
                placeholder="Tag Name"
                _getValue={this._getTagValue}
                _onChangeValue={this._onChangeTagValue}
                containerStyle={styles.textfieldContainerStyle}
              />
              <TouchableOpacity
                style={styles.tagsAddButtonContainer}
                onPress={this._addTag}>
                <Ionicons name="ios-add" style={styles.tagsAddButtonText} />
              </TouchableOpacity>
            </View>
            <View style={styles.tagsContent}>
              <ScrollView
                style={styles.tagsScrollView}
                contentContainerStyle={styles.tagsScrollViewContent}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {this._getTags()}
              </ScrollView>
            </View>
          </View>
          <Animated.View
            style={[
              styles.themeListContainer,
              {right: this.state.notebookListX},
            ]}>
            <NotebookList
              onSelectNotebook={this.selectNotebook}
              onHide={this._hideThemes}
            />
          </Animated.View>
          {this.state.showingDialog && (
            <Dialog
              title={this.state.dialogInfo.title}
              message={this.state.dialogInfo.message}
              actions={this.state.dialogInfo.actions}
              onClose={() => {
                this._toggleDialog();
                this.props.navigation.goBack();
                this.props.route.params.doRefresh();
              }}
            />
          )}
          {this.state.hasActivity && <ActivityIndicator />}
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    padding: 20,
  },
  notebookContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: AppColors.secondaryAccentColor,
  },
  inputContainer: {
    // backgroundColor: AppColors.secondaryAccentColor,
    flex: 1,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  notebook: {
    width: '80%',
    height: '80%',
  },
  topicNameContainer: {
    flexDirection: 'row',
  },
  topicNameLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: AppColors.secondaryAccentColorDarker,
  },
  topicNameLabelText: {
    fontSize: 20,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
  textfieldContainerStyle: {
    marginBottom: 20,
    flex: 1,
  },
  showThemesButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    bottom: 30,
    padding: 10,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: AppColors.accentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeListContainer: {
    position: 'absolute',
    top: 20,
    elevation: 20,
    // backgroundColor: AppColors.accentColor,
  },
  tagsAddButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: AppColors.accentColor,
  },
  tagsAddButtonText: {
    fontSize: 25,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.textColor,
  },
  tagsContent: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    backgroundColor: AppColors.secondaryAccentColor,
  },
  tagsScrollView: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
  },
  tagsScrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  tagContainer: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    borderWidth: 2,
    marginRight: 10,
    borderColor: AppColors.secondaryAccentColorDarker,
    alignItems: 'center',
    justifyContent: 'center',
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
  addTopicButtonContainer: {
    marginRight: 20,
  },
});
