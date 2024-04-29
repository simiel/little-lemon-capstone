import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import useAuthStore from './contexts/AuthContext';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  // get onboard and toggleOnboarding from the zustand store
  const { onboarded, toggleOnboarding } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {onboarded ? (
          <>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Profile' component={Profile} />
          </>
        ) : (
          <Stack.Screen name='Onboarding' component={Onboarding} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
