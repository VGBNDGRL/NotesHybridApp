import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  AppRegistry,
  Button,
  NativeModules,
} from 'react-native';
import * as ReactNative from 'react-native';

const NotesHybridApp = () => {
  const [dataSource, setDataSource] = useState([
    {title: 'Title 1 ', body: 'Body 1', timestamp: '12pm'},
    {title: 'Title 2 ', body: 'Body 2', timestamp: '1pm'},
  ]);

  let [addNewNoteClicked, setAddNewNoteClicked] = useState(false);

  const EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title}
        {'\n'}
        {item.body}
        {'\n'}
        {'Last modified: '}
        {item.timestamp}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#19031c',
        }}
      />
    );
  };

  const ListHeader = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Notes</Text>
        <Button
          title="Add new note"
          color={'#f194ff'}
          titleStyle={{
            fontSize: 30,
          }}
          buttonStyle={{
            borderRadius: 60,
            flex: 1,
            height: 50,
            width: 50,
          }}
          onPress={() => CreateNewNote()}
        />
      </View>
    );
  };

  function CreateNewNote() {
    addNewNoteClicked = true;
    console.log('addNewNoteClicked is set to ' + addNewNoteClicked);
    NativeModules.CreateNewNote.showAlert();
  }

  function SaveNewNote() {
    addNewNoteClicked = false;
    return;
  }

  const getItem = item => {
    // Function for click on an item
    alert(
      'Title: ' +
        item.title +
        ' Body: ' +
        item.body +
        'Last Modified:' +
        item.timestamp,
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={dataSource}
        addNewNoteBool={addNewNoteClicked}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        ListHeaderComponent={ListHeader}
        renderItem={ItemView}
        ListEmptyComponent={EmptyListMessage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  itemStyle: {
    padding: 10,
  },
  headerFooterStyle: {
    width: '100%',
    height: 70,
    backgroundColor: '#606070',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    padding: 7,
  },
});

export default NotesHybridApp;
AppRegistry.registerComponent('NotesHybridApp', () => NotesHybridApp);
