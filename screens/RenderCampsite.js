import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";

const RenderCampsite = (props) => {
  const { campsite } = props
  if (campsite) {
    return (
      <Card containerStyle={styles.cardContainer}>
        <Card.Image source={campsite.image}>
          <View style={{
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 1
          }}>
            <Text
              style={{
                color: '#DDF',
                textAlign: 'center',
                textAlignVertical: 'bottom',
                fontSize: 20,
                paddingBottom: 20,
                textShadowColor: 'black',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 10,
              }}
            >
              {campsite.name}
            </Text>
          </View>
        </Card.Image>
        <Text style={{ margin: 20 }}>{campsite.description}</Text>
        <Icon
          name={props.isFavorite ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          raised
          reverse
          onPress={() => props.toggleFavorite()}
        />
      </Card>
    )
  }
  return <View />;
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom:20 
  }
})

export default RenderCampsite;