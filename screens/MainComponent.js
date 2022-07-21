// platorm allows us to get platform of device and set styles based on
import { Platform, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from './DirectoryScreen';
import { createStackNavigator } from "@react-navigation/stack";

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
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5637DD'
        },
        headerTintColor: '#fff'
      }}
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
      <DirectoryNavigator />
    </View>
  );
};

export default Main;