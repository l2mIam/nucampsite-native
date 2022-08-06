import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from './RenderCampsite'
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';

const CampsiteInfoScreen = ({ route }) => {
  /* destructure to get campsite param from route params object
  where all the params for the route exist */
  const { campsite } = route.params
  const comments = useSelector((state) => state.comments)
  const favorites = useSelector((state) => state.favorites)
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    const newComment = {
      author,
      rating,
      text,
      campsiteId: campsite.id
    }
    dispatch(postComment(newComment))
    setShowModal(!showModal)
  }

  const resetForm = () => {
    setRating(5)
    setAuthor('')
    setText('')
  }

  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        {/* outer { this is javascript} inner { object literal (inline style)} */}
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
          readonly
        ></Rating>
        <Text style={{ fontSize: 12 }}>{item.rating}</Text>
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={comments.commentsArray.filter(
          (comment) => comment.campsiteId === campsite.id
        )}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingVertical: 20 
        }}
        ListHeaderComponent={
          // need to pass a single component thus the <> tags </>
          <>
            <RenderCampsite
              campsite={campsite}
              isFavorite={favorites.includes(campsite.id)}
              toggleFavorite={() => dispatch(toggleFavorite(campsite.id))}
              onShowModal={() => setShowModal(!showModal)}
            />
            <Text style={styles.commentsTitle}>Comments</Text>
          </>
        }
      />
      <Modal
        animationType='slide'
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Rating
            showRating
            startingValue={rating}
            imageSize={40}
            onFinishRating={setRating}
            style={{ paddingVertical: 10 }}
          />
          <Input
            placeholder='Author'
            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={setAuthor}
            value={author}
          />
          <Input
            placeholder='Comment'
            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={setText}
            value={text}
          />
          <View name='submit' style={{ margin: 10 }}>
            <Button
              onPress={() => {
                handleSubmit()
                resetForm()
              }}
              color='#5637DD'
              title='Submit'
            />
          </View>
          <View name='cancel' style={{ margin: 10 }}>
            <Button
              onPress={() => {
                setShowModal(!showModal)
                resetForm()
              }}
              color='#808080'
              title='Cancel'
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: 'center',
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#434840',
    borderBottomColor: 'lightgrey',
    borderRadius: 15,
    paddingVertical: 15,
    borderBottomWidth: 2
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomColor: 'grey',
    borderRadius: 15,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  }
})

export default CampsiteInfoScreen;