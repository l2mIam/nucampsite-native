import Main from "./screens/MainComponent";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  /* Navigation Container used to manage navigation
  must wrap all components that will use navigation */
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}