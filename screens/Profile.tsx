import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import useAuthStore from '../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { onboarded, toggleOnboarding, setProfileData, profileData } =
    useAuthStore();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    image: '',
  });
  const [discard, setDiscard] = useState(false);

  const validateName = (name: string) => {
    return /^[a-zA-Z ]+$/.test(name);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]+$/.test(phone);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const updateProfile = (key: string, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  const isFormValid = () => {
    return (
      validateName(profile.firstName) &&
      validateName(profile.lastName) &&
      validatePhone(profile.phoneNumber) &&
      validateEmail(profile.email)
    );
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      updateProfile('image', result.assets[0].uri);
    }
  };

  const resetImage = () => {
    updateProfile('image', '');
  };

  // initial profile data state from store
  useEffect(() => {
    setProfile({ ...profile, ...profileData });
    console.log('🚀 ~ useEffect ~ profileData:', profileData);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, padding: 20, backgroundColor: 'white' }}
      >
        {/* Logo header */}
        <View
          style={{
            // flex: 1,
            justifyContent: 'center',
          }}
        >
          <Image
            style={{ height: 100, width: 100 }}
            source={require('../assets/icon.png')}
          />
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          {/* info */}
          <Text>User Info</Text>
          <View style={{ flexDirection: 'row' }}>
            {profile.image ? (
              <Image
                source={{ uri: profile.image }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            ) : (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#0b9a6a',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontSize: 32, color: '#FFFFFF', fontWeight: 'bold' }}
                >
                  {profile.firstName && Array.from(profile.firstName)[0]}
                  {profile.lastName && Array.from(profile.lastName)[0]}
                </Text>
              </View>
            )}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#495e57',
                  borderRadius: 9,
                  marginHorizontal: 18,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#3f554d',
                }}
                // title='Pick an image from camera roll'
                onPress={selectImage}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    alignSelf: 'center',
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 9,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#83918c',
                }}
                title='Pick an image from camera roll'
                onPress={resetImage}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: '#3e524b',
                    alignSelf: 'center',
                  }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* more inputs */}
          <Text style={{ fontSize: 18, marginBottom: 10 }}>First name</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 2,
              width: '100%',
              borderRadius: 5,
            }}
            value={profile.firstName}
            onChangeText={(newValue) => updateProfile('firstName', newValue)}
            placeholder={'First Name'}
          />
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Last name
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 2,
              width: '100%',
              borderRadius: 5,
            }}
            value={profile.lastName}
            onChangeText={(newValue) => updateProfile('lastName', newValue)}
            placeholder={'Last Name'}
          />
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
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
            value={profile.email}
            keyboardType='email-address'
            onChangeText={(newValue) => updateProfile('email', newValue)}
            placeholder={'Email'}
          />
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Phone number
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 2,
              width: '100%',
              borderRadius: 5,
            }}
            value={profile.phoneNumber}
            keyboardType='phone-pad'
            onChangeText={(newValue) => updateProfile('phoneNumber', newValue)}
            placeholder={'Phone number'}
          />
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Email notifications
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Checkbox
              style={{
                marginRight: 10,
              }}
              value={profile.orderStatuses}
              onValueChange={(newValue) =>
                updateProfile('orderStatuses', newValue)
              }
              color={'#495e57'}
            />
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Order statuses
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Checkbox
              style={{
                marginRight: 10,
              }}
              value={profile.passwordChanges}
              onValueChange={(newValue) =>
                updateProfile('passwordChanges', newValue)
              }
              color={'#495e57'}
            />
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Password changes
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Checkbox
              style={{
                marginRight: 10,
              }}
              value={profile.specialOffers}
              onValueChange={(newValue) =>
                updateProfile('specialOffers', newValue)
              }
              color={'#495e57'}
            />
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Special offers
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Checkbox
              style={{
                marginRight: 10,
              }}
              value={profile.newsletter}
              onValueChange={(newValue) =>
                updateProfile('newsletter', newValue)
              }
              color={'#495e57'}
            />
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Newsletter
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              padding: 10,
              borderRadius: 5,
              width: '100%',
              alignSelf: 'flex-end',
              marginTop: 'auto',
            }}
            onPress={() => {
              toggleOnboarding();
              setProfileData({});
            }}
          >
            <Text
              style={{
                backgroundColor: 'black',
                padding: 5,
                borderRadius: 5,
                width: '100%',
                alignSelf: 'center',
                marginTop: 'auto',
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              Log out
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                padding: 10,
                borderRadius: 5,
                width: '40%',
                alignSelf: 'flex-end',
                marginTop: 'auto',
              }}
              onPress={() => setDiscard(true)}
            >
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '500',
                }}
              >
                Discard changes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: 'black',
                  padding: 10,
                  borderRadius: 5,
                  width: '40%',
                  justifyContent: 'center',
                },
                isFormValid()
                  ? {}
                  : {
                      backgroundColor: 'gray',
                    },
              ]}
              onPress={() => {
                setProfileData(profile);
              }}
              disabled={!isFormValid()}
            >
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '500',
                }}
              >
                Save changes
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
