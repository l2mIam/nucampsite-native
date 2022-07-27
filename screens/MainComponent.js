// platorm allows us to get platform of device and set styles based on
import { Platform, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from './DirectoryScreen';
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: '#fff',
  headerStyle: { backgroundColor: '#5637DD'}
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
           title: 'Home',
           headerLeft: () => (
            <Icon
              name='home'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
           )
        })}
      />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();

  // options ommited, will use the name value
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='About'
        component={AboutScreen}
        options={({ navigation }) => ({
           headerLeft: () => (
            <Icon
              name='info-circle'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
           )
        })}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name='Contact'
        component={ContactScreen}
        options={({ navigation }) => ({
           title: 'Contact Us',
           headerLeft: () => (
            <Icon
              name='address-card'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
           )
        })}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  /* returns an object with 2 props: Screen and Navigator
  (react components used to configure the stack navigator) */
  const Stack = createStackNavigator();
  /* initial Route name is default route navigator will use when first loaded
  Screen options defines look and feel of nav header 
  name: name of the screen
  component: in charge of displaying the screen
  options: this will be displayed in navigation header
    can return an object or a function that returns an object*/
  return (
    <Stack.Navigator
      initialRouteName='Directory'
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name='Directory'
        component={DirectoryScreen}
        options={({ navigation }) => ({
           title: 'Campsite Directory',
           headerLeft: () => (
            <Icon
              name='list'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
           )
        })}
      />
      <Stack.Screen
        name='CampsiteInfo'
        component={CampsiteInfoScreen}
        options={({ route }) => ({
          title: route.params.campsite.name
        })}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop:
          Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
      }}
    >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ backgroundColor: '#CEC8FF' }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => (
              <Icon
                name='home'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24}}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          options={{
            title: 'Campsite Directory',
            drawerIcon: ({ color }) => (
              <Icon
                name='list'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24}}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name='About'
          component={AboutNavigator}
          options={{
            title: 'About',
            drawerIcon: ({ color }) => (
              <Icon
                name='info-circle'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24}}
                color={color}
              />
            )
          }}
        />
        <Drawer.Screen
          name='Contact'
          component={ContactNavigator}
          options={{
            title: 'Contact Us',
            drawerIcon: ({ color }) => (
              <Icon
                name='address-card'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24}}
                color={color}
              />
            )
          }}
        />

      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24
  }
})
export default Main;
