import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  SectionList,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useAuthStore from '../contexts/AuthContext';
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from '../database';
import { getSectionListData, useUpdateEffect } from '../utils';
import debounce from 'lodash.debounce';
import { Searchbar } from 'react-native-paper';
import Filters from '../components/FilterBar';

const URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const sections = ['starters', 'mains', 'desserts'];

const Home = ({ navigation }) => {
  const { profileData } = useAuthStore();
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchMenu = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      const menuList = json.menu.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        category: item.category,
      }));

      return menuList;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      let menuItems: any = [];
      try {
        await createTable();
        menuItems = await getMenuItems();
        if (!menuItems.length) {
          menuItems = await fetchMenu();
          saveMenuItems(menuItems);
        }
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);
  console.log('🚀 ~ Home ~ data', data[0]);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image
          style={{
            height: 100,
            width: 300,
          }}
          resizeMode='contain'
          source={require('../assets/icon.png')}
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          onPress={() => navigation.navigate('Profile')}
        >
          {profileData.image !== '' ? (
            <Image
              source={{ uri: profileData.image }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
              }}
            />
          ) : (
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: '#FFD700',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#333333',
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                {profileData.firstName &&
                  (Array.from(profileData.firstName)[0] as any)}
                {profileData.lastName && Array.from(profileData.lastName)[0]}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          Little Lemon
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 10,
          }}
        >
          <View
            style={{
              width: '50%',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: 'right',
              }}
            >
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
            }}
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1673830185894-9030c9e7eba9?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            accessible={true}
            accessibilityLabel={'Little Lemon Food'}
          />
        </View>
        <Searchbar
          placeholder='Search'
          placeholderTextColor='#333333'
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={{
            backgroundColor: '#FFD700',
            width: '100%',
            borderRadius: 0,
            borderBottomWidth: 2,
            borderBottomColor: '#333333',
          }}
          iconColor='#333333'
          inputStyle={{ color: '#333333' }}
          elevation={0}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        ORDER FOR DELIVERY!
      </Text>
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <SectionList
        style={{
          width: '100%',
          flex: 1,
        }}
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        )}
        renderSectionHeader={({ section: { name } }) => (
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              textAlign: 'center',
              backgroundColor: '#FFD700',
              color: '#333333',
              padding: 10,
              marginBottom: 10,
            }}
          >
            {name}
          </Text>
        )}
      />
    </View>
  );
};

export default Home;

const Item = ({ name, price, description, image }) => {
  console.log('🚀 ~ Item ~ image', image);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
      }}
    >
      <View
        style={{
          width: '50%',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#333333',
          }}
        >
          {description}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#FFD700',
          }}
        >
          ${price}
        </Text>
      </View>
      <Image
        style={{
          height: 100,
          width: 100,
          backgroundColor: '#333333',
        }}
        source={{
          uri: `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${image}`,
        }}
      />
    </View>
  );
};
