import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommenLists'
import HeaderComment from './HeaderComment'
import { colors } from '../../constants'
import { readDataFirebaseWithChildCondition, readDataFirebase } from '../../firebase/controllerDB'

export default function Comments({ setIsComment, songId }) {
  const [signal, SetSignal] = useState(false)
  const [comments, setComments] = useState([])
  const [ idRep, setIdRep ] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const rep = await readDataFirebaseWithChildCondition('comments', 'songId', songId)
        const users = await readDataFirebase('users')
        // console.log(users)
        // console.log(rep);
        if (rep && users) {
          const data = await Object.entries(rep).map(([key, value]) => {
            // console.log(key, value)
            // return { ...value, id: key }
            return { ...value, id: key, nameUser: users[value.userId].displayName, imageUrl: users[value.userId].image }
          })
          // console.log(data);
          setComments(data)
        }
      } catch (e) {
        console.log(e);
      }
    }
    getData()

  }, [signal])

  // console.log(comments)


  return (
    <View style={styles.centeredView} >
      <View style={styles.modalView}>
        {/* <View style={styles.close}>
          <TouchableOpacity onPress={() => setIsComment(false)}>
            <Text>Đóng</Text>
          </TouchableOpacity>
        </View> */}
        <HeaderComment onClose={() => setIsComment(false)} />
        <CommentList comments={comments} SetSignal={SetSignal} signal={signal} setIdRep={setIdRep} />
        <CommentForm songId={songId} SetSignal={SetSignal} signal={signal} setIdRep={setIdRep} idRep={idRep}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  centeredView:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200
  },
  modalView:
  {
    // margin: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    paddingLeft: 10,
    paddingRight: 10

  },
})