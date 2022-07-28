import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import RenderCampsite from './RenderCampsite'

const CampsiteInfoScreen = ({ route }) => {
  /* destructure to get campsite param from route params object
  where all the params for the route exist */
  const { campsite } = route.params
  const comments = useSelector((state) => state.comments)
  const [favorite, setFavorite] = useState(false)

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
            isFavorite={favorite}
            toggleFavorite={() => setFavorite(!favorite)}
          />
          <Text style={StyleSheet.commentsTitle}>Comments</Text>
        </>
      }
    />
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
  }
})

export default CampsiteInfoScreen;