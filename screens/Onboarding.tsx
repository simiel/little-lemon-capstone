import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import useAuthStore from '../contexts/AuthContext';

const Onboarding = () => {
  const { toggleOnboarding, setProfileData } = useAuthStore();
  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');

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
          style={{ height: 100, width: 300 }}
          resizeMode='contain'
          source={require('../assets/icon.png')}
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
          onChangeText={(e: any) => setName(e)}
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
          onChangeText={(e) => setEmail(e)}
          value={email}
        />

        {/* next button */}

        <TouchableOpacity
          style={{
            backgroundColor: name === '' || email === '' ? 'gray' : 'black',
            padding: 10,
            borderRadius: 5,
            width: '40%',
            alignSelf: 'flex-end',
            marginTop: 'auto',
          }}
          disabled={name === '' || email === ''}
          onPress={() => {
            setProfileData({ firstName: name, email });
            console.log('🚀 ~ Onboarding ~ name, email }:', {
              firstName: name,
              email,
            });
            toggleOnboarding();
          }}
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
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
