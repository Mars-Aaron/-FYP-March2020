import React from 'react';
import {ScrollView, Dimensions, View, StyleSheet} from 'react-native';

// import PageLine from './NLPageLine';
import NotePage from './NLNotePage';

export default class NLNotesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pageNotes: [],
      flag: 0,
    };
    // this.state.pageNotes.push(this.props.test);
  }

  // _addTitle = noteContent => {
  //   // console.log(noteContent);
  //   this.state.pageNotes.push(noteContent);
  //   this.setState({flag: 1});
  // };

  _forceRefresh = () => {
    console.log(this.props.notes);
    this.setState({flag: 1}, this.props.parentRef._refreshState);
  };

  render = () => {
    // console.log(this.props.notes);
    // // this.state.pageNotes.push(<NoteHeader title="tits" />);
    return (
      <ScrollView
        style={styles.scrollbar}
        horizontal={false}
        showsHorizontalScrollIndicator={false}>
        <View ref={component => (this.page = component)} style={styles.page}>
          <NotePage />
          {this.props.notes}
        </View>
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  scrollbar: {
    height: 440,
    marginBottom: 10,
    borderRadius: 10,
  },
  page: {
    height: 10000,
    width: Dimensions.get('window').width - 20,
    // backgroundColor: AppColors.secondaryAccentColorDarker,
  },
});
