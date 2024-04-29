import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function Onboarding() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image
          style={{ height: 100, width: 100 }}
          source={require('./assets/icon.png')}
        />
        <Text
          style={{
            fontWeight: '700',
            fontSize: 28,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Let us get to know you
        </Text>
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          First Name
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 2,
            width: '100%',
            borderRadius: 5,
          }}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          Email
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 2,
            width: '100%',
            borderRadius: 5,
          }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        {/* next button */}
        <TouchableOpacity
          style={{
            backgroundColor: name === '' || email === '' ? 'gray' : 'black',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            width: '40%',
            alignSelf: 'flex-end',
            marginTop: 'auto',
          }}
          disabled={name === '' || email === ''}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Onboarding'
        component={Onboarding}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
