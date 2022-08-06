import Main from "./screens/MainComponent";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/LoadingComponent';

export default function App() {
  /* Navigation Container used to manage navigation
  must wrap all components that will use navigation */
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}