import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useAuthStore from '../contexts/AuthContext';

const Home = ({ navigation }) => {
  const { onboarded, toggleOnboarding } = useAuthStore();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 5,
          width: '40%',
          alignSelf: 'flex-end',
          marginTop: 'auto',
        }}
        onPress={() => {
          navigation.navigate('Profile');
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
          Toggle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
