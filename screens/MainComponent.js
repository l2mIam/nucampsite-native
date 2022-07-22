// platorm allows us to get platform of device and set styles based on
import { Platform, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from './DirectoryScreen';
import HomeScreen from "./HomeScreen";
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
        options={{ title: 'Home' }}
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
        options={{ title: 'Campsite Directory'}}
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
          options={{ title: 'Home' }}
        />
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          options={{ title: 'Campsite Directory' }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;