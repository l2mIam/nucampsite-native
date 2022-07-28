import { useState } from 'react'
import { Text, ScrollView } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useSelector } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'

const Mission = () => {
  return (
    <Card>
      <Card.Title>Our Mission</Card.Title>
      <Card.Divider />
      <Text style={{margin: 10}}>
        We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
      </Text>
    </Card>
  )
}

const CommunityPartners = () => {
  const partners = useSelector((state) => state.partners)
  return (
    <Card>
      <Card.Title>Community Partners</Card.Title>
      <Card.Divider />
      {partners.partnersArray. map((partner) => {
        return (
          <ListItem key={partner.id}>
            <Avatar source={{ uri: baseUrl + partner.image }} rounded/>
            <ListItem.Content>
              <ListItem.Title>{partner.name}</ListItem.Title>
              <ListItem.Subtitle>
                {partner.description}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      })}
    </Card>
  )
}

const AboutScreen = () => {

    return (
      <ScrollView>
        <Mission />
        <CommunityPartners />
      </ScrollView>
    )
}

export default AboutScreen