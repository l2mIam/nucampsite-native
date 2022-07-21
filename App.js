import Main from "./screens/MainComponent";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  /* Navigation Container used to manage navigation
  must wrap all components that will use navigation */
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}