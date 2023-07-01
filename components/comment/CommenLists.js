import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import ItemComment from './ItemComment';
import { readDataFirebase, readDataFirebaseWithChildCondition } from '../../firebase/controllerDB';

const CommentList = ({ comments, SetSignal, signal, setIdRep }) => {

  // console.log(comments)

  return (
    <View style={styles.container}>
      {/* <ScrollView>
        {comments.map((comment, index) => (
          <ItemComment comment={comment} key={index} SetSignal={SetSignal} signal={signal} />
        ))}
      </ScrollView> */}
      {
        comments && <FlatList
          data={comments}
          renderItem={({ item, index }) =>
            <ItemComment comment={item} SetSignal={SetSignal} signal={signal} setIdRep={setIdRep} />}

          // keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}

        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '80%',
    width: '100%',
  }
})

export default CommentList;
