import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import AppStyles from '../config/Styles';
import NotebookThemes from '../config/NotebookThemes';

// import NotebookCreme from '../../static/notebook/Notebook-Creme.svg';
// import NotebookSophisticated from '../../static/notebook/Notebook-Sophisticated.svg';

export default class NLNotebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicName: this.props.topicName,
    };
  }

  setTopicName = topicName => {
    this.setState({topicName: topicName}, () =>
      console.log(this.state.topicName),
    );
  };

  render() {
    const notebookTheme = this.props.theme;
    return (
      <View style={styles.viewContainer}>
        <notebookTheme.Component style={styles.notebook} />
        {/* <View style={styles.notebookTitleWrapper}>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              styles.notebookTitleContainer,
              {
                transform: [
                  {rotateX: '53deg'},
                  {rotateY: '-10deg'},
                  {rotateZ: '-40deg'},
                ],
                // transform: [{rotateX: 0.85}, {rotateY: -0.15}, {rotateZ: -0.7}],
              },
            ]}>
            <Text
              style={[
                styles.notebookTitle,
                {
                  backgroundColor: notebookTheme.TextContainerColor,
                  color:
                    this.state.topicName === ''
                      ? notebookTheme.TextContainerColor
                      : notebookTheme.textColor,
                },
              ]}>
              {this.state.topicName === ''
                ? 'Placeholder Text'
                : this.state.topicName}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    // backgroundColor: 'green',
    width: '80%',
    height: '80%',
  },
  notebookTitleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    // backgroundColor: '#f006',
    // alignItems: 'center',
  },
  notebookTitleContainer: {
    position: 'absolute',
    top: -45,
    left: 80,
    height: 270,
    width: 160,
    padding: 10,
    // borderRadius: 5,
    // backgroundColor: '#61dafbdd',
    alignItems: 'center',
  },
  notebookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
    borderRadius: 5,
    padding: 10,
    color: NotebookThemes.CREME.textColor,
    textAlign: 'center',
  },
  notebookSpineTextWrapper: {
    position: 'absolute',
    top: 190,
    left: -20,
  },
  notebookSpineTextContainer: {
    backgroundColor: '#61dafbdd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notebookSpineText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
    borderRadius: 5,
    padding: 10,
    color: NotebookThemes.CREME.spineTextColor,
  },
  notebook: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
