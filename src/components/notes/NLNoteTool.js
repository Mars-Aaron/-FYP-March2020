import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import AppColors from '../../config/Colors';
import NoteHeader from '../notes/NLNoteHeader';

export default class NLNoteTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleValid: true,
    };
  }

  _addTitle = () => {
    this.props.parentRef.dialogInfo = {
      title: 'Enter Note',
      actions: [
        {
          title: 'Cancel',
          isPrimary: false,
          callback: () => {
            this.setState({title: '', titleValid: true}, () => {
              this.props.parentRef._hideDialog(
                this.props.parentRef.pageRef._forceRefresh,
              );
            });
          },
        },
        {
          title: 'Okay',
          isPrimary: true,
          callback: () => {
            console.log(`State: ${this.state.titleValid}, ${this.state.title}`);
            if (this.state.titleValid && this.state.title !== '') {
              this.props.parentRef._addNote(
                <NoteHeader
                  topic={this.props.topic}
                  title={this.state.title}
                />,
                () => {
                  this.setState({title: '', titleValid: true}, () => {
                    this.props.parentRef._hideDialog(
                      this.props.parentRef.pageRef._forceRefresh,
                    );
                  });
                },
              );
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Title',
          type: 'name',
          performValidation: true,
          getValue: () => {
            console.log(`Value picked: ${this.state.title}`);
            return this.state.title;
          },
          onChangeValue: (title, titleValid) => {
            console.log(title);
            this.setState(
              {title: title, titleValid: titleValid},
              this.props.parentRef._refreshState,
            );
          },
          containerStyle: {marginBottom: 20},
        },
      ],
    };
    this.props.parentRef._showDialog();
  };

  render = () => {
    return (
      <TouchableOpacity style={styles.tool} onPress={this._addTitle}>
        <Text style={styles.title}>Add Note</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  tool: {
    height: '100%',
    aspectRatio: 2,
    borderRadius: 10,
    marginRight: 10,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.secondaryAccentColor,
  },
  title: {
    fontSize: 20,
    color: AppColors.secondaryTextColor,
  },
});
