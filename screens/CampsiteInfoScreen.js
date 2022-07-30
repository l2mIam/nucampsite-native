import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from './RenderCampsite'
import { toggleFavorite } from '../features/favorites/favoritesSlice';

const CampsiteInfoScreen = ({ route }) => {
  /* destructure to get campsite param from route params object
  where all the params for the route exist */
  const { campsite } = route.params
  const comments = useSelector((state) => state.comments)
  const favorites = useSelector((state) => state.favorites)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
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
            <Text style={StyleSheet.commentsTitle}>Comments</Text>
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
          {/* <Text style={styles.modalTitle}>
            Search Campsite Reservations
          </Text>
          <Text style={styles.modalText}>
            Number of Campers: {campers}
          </Text>
          <Text style={styles.modalText}>
            Hike-In?: {hikeIn ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.modalText}>
            Date: {date.toLocaleDateString('en-US')}
          </Text> */}
          <View style={{ margin:10 }}>
            <Button
              onPress={() => {
                setShowModal(!showModal);
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
    padding: 10,
    paddingTop: 30
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  }
})

export default CampsiteInfoScreen;