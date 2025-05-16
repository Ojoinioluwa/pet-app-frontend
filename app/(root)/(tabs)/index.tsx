import PetCard from '@/components/PetCard';
import { ListPetsAPI } from '@/services/pet/petServices';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const HomePage = () => {
  const {data: pets, isLoading: petLoading, error, isError, refetch} = useQuery({
    queryKey: ["listPets"],
    queryFn:ListPetsAPI,
  })

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
      <TouchableOpacity className={`${bgClass} p-5 rounded-lg items-center mb-4 w-1/2`}>
        <Text className="text-white font-semibold text-center text-sm">{label}</Text>
      </TouchableOpacity>
    </Link>
  );

  if(petLoading){
    return (
      <View className='flex-1 items-center justify-center'>
         <ActivityIndicator  size="large" color="blue" />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center bg-white p-4 shadow rounded-b-lg mb-6">
        <View className="flex-1 pr-4">
          <Text numberOfLines={1} ellipsizeMode="tail" className="text-xl font-semibold text-blue-950">
            Welcome, {user.name}
          </Text>
          <Text className="text-sm text-gray-600">
            You have {pets?.length} pets and {notifications.length} notifications
          </Text>
        </View>
        <View className="flex-row items-center space-x-4">
          {/* Notifications */}
          <Link href="/AllReminders" asChild>
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
        {renderQuickAction('+ Add Pet', '/AddPet', 'bg-blue-500')}
        {renderQuickAction('View Records', '/AllHealthRecords', 'bg-green-500')}
      </View>

      {/* Pets Horizontal List */}
      <Text className="text-lg font-bold mb-2">Your Pets</Text>
      <FlatList
        data={pets?.pets}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        // ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
          <PetCard
            image={item.image}
            name={item.name}
            age={item.age}
            breed={item.breed}
            species={item.species}
            width='fit'
            petId={item._id}
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
