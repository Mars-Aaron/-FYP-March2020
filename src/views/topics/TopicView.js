import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';

import AppStyles from '../../config/Styles';
import AppColors from '../../config/Colors';
import Topic from '../../models/NLTopic';
import Note from '../../models/NLNote';
import NotesPage from '../../components/notes/NLNotes';
import NoteHeader from '../../components/notes/NLNoteHeader';
import NoteTool from '../../components/notes/NLNoteTool';
import InputDialog from '../../components/NLInputDialog';
import LoaderImage from '../../../static/loading-color.png';
import CollectionFactory from '../../models/NLCollectionFactory';

export default class TopicView extends React.Component {
  constructor(props) {
    super(props);
    this.topic = props.route.params.topic;
    props.navigation.setOptions({
      title: this.topic[Topic.Fields.TopicName],
    });
    this.state = {
      isLoading: false,
      loaderRotate: new Animated.Value(0),
      showingInputDialog: false,
      notes: [],
      flag: 0,
    };
    this.dialogInfo = {};
    this.noteRef = CollectionFactory.createNoteCollectionReference(
      this.topic.id,
    );
  }

  _addNote = (note, callback) => {
    this.state.notes.push(note);
    callback();
  };

  _refreshState = () => {
    this.setState({flag: 0});
  };

  _hideDialog = callback => {
    this.setState({showingInputDialog: false}, callback);
  };

  _showDialog = () => {
    this.setState({showingInputDialog: true});
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
    console.log(this.state.notes);
    this.setState({isLoading: false});
  };

  _fetchNotes = () => {
    this._startLoading();
    this.noteRef.GetAllNotes(notes => {
      console.log(notes);
      let notesData = notes.map(noteData => {
        // console.log({...topicData._data, id: topicData.id});
        // return {...noteData._data, id: noteData.id};
        let note = noteData._data;
        if (note[Note.Fields.NoteType] === Note.NoteTypes.Header) {
          return (
            <NoteHeader
              added={true}
              id={noteData.id}
              title={note[Note.Fields.Title]}
            />
          );
        }
      });
      this.setState({notes: notesData}, this._finishActivity);
    });
  };

  componentDidMount = () => {
    this._fetchNotes();
  };

  render = () => {
    const RotateData = this.state.loaderRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={[AppStyles.rootViewStyle, styles.viewContainer]}>
        <NotesPage
          ref={component => (this.pageRef = component)}
          parentRef={this}
          notes={this.state.notes}
        />
        <ScrollView
          style={styles.notesToolbar}
          contentContainerStyle={styles.notesToolbarContent}
          horizontal={true}>
          <NoteTool topic={this.topic} parentRef={this} />
        </ScrollView>
        {this.state.showingInputDialog && (
          <InputDialog
            title={this.dialogInfo.title}
            actions={this.dialogInfo.actions}
            inputs={this.dialogInfo.inputs}
            onClose={this._hideDialog}
          />
        )}
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
  };
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: 10,
  },
  notesToolbar: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: AppColors.accentColorLighter,
  },
  notesToolbarContent: {
    padding: 10,
    paddingRight: 0,
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
});
