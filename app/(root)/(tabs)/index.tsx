import PetCard from '@/components/PetCard';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const HomePage = () => {
  const [pets] = useState([
    { id: '1', name: 'Max', age: 2, breed: 'Labrador', species: 'Dog', photo: 'https://placedog.net/200/200?id=1' },
    { id: '2', name: 'Luna', age: 3, breed: 'Siamese', species: 'Cat', photo: 'https://placekitten.com/200/200' },
    { id: '3', name: 'Bella', age: 4, breed: 'Golden Retriever', species: 'Dog', photo: 'https://placedog.net/200/200?id=2' },
    { id: '4', name: 'Charlie', age: 1, breed: 'Maine Coon', species: 'Cat', photo: 'https://placekitten.com/201/201' }
  ]);

  const user = {
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/100'
  };

  const notifications = [
    { id: '1', message: 'Max needs a vaccine booster on 15 May 2025' },
    { id: '2', message: 'Luna has a vet appointment tomorrow' }
  ];

  const renderQuickAction = (label: string, href: any, bgClass: string) => (
    <Link href={href} asChild>
      <TouchableOpacity className={`${bgClass} p-5 rounded-lg items-center mb-4`}>
        <Text className="text-white font-semibold text-center text-sm">{label}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center bg-white p-4 shadow rounded-b-lg mb-6">
        <View className="flex-1 pr-4">
          <Text numberOfLines={1} ellipsizeMode="tail" className="text-xl font-semibold text-blue-950">
            Welcome, {user.name}
          </Text>
          <Text className="text-sm text-gray-600">
            You have {pets.length} pets and {notifications.length} notifications
          </Text>
        </View>
        <View className="flex-row items-center space-x-4">
          {/* Notifications */}
          <Link href="/Notifications" asChild>
            <TouchableOpacity className="p-2" >
              <Text className="text-2xl">🔔</Text>
              {notifications.length > 0 && (
                <View className="absolute top-0 right-0 bg-red-500 w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-white text-xs">{notifications.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Link>

          {/* Avatar */}
          <Image
            source={{ uri: user.avatar }}
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Quick Actions Row */}
      <View className="flex-row justify-between mb-6 gap-2">
        {renderQuickAction('+ Add Pet', '/add-pet', 'bg-blue-500')}
        {renderQuickAction('View Records', '/health-records', 'bg-green-500')}
        {renderQuickAction('+ Reminder', '/Notifications', 'bg-yellow-500')}
      </View>

      {/* Pets Horizontal List */}
      <Text className="text-lg font-bold mb-2">Your Pets</Text>
      <FlatList
        data={pets}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        // ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
          <PetCard
            image={{ uri: item.photo }}
            name={item.name}
            age={item.age}
            breed={item.breed}
            species={item.species}
            width='fit'
          />
        )}
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingLeft: 4,
    marginBottom: 40,
    height: 400
  }
})

export default HomePage;
