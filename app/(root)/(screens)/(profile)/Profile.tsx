import images from '@/constants/images';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfilePage = () => {
  // Assuming you get user data from an API or global state
  const [user, setUser] = useState({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '+1234567890',
      address: '123 Main St, Cityville, Country',
    });


  if (!user) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-blue-900">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-5 pt-10">
      <ScrollView className="flex-1">
        <Text className="text-3xl text-blue-900 font-bold text-center">User Profile</Text>

        <View className="flex-row justify-center mt-5">
          {/* Profile Picture */}
          <Image
            source={images.LandingPage} // Example URL, change as per real data
            className="w-32 h-32 rounded-full"
            resizeMode="cover"
          />
        </View>

        <View className="mt-8">
          {/* Display User Information */}
          {[
            { label: 'Name', value: user.name },
            { label: 'Email', value: user.email },
            { label: 'Phone Number', value: user.phoneNumber },
            { label: 'Address', value: user.address },
          ].map((field, index) => (
            <View className="mt-5" key={index}>
              <Text className="text-blue-900 font-semibold">{field.label}</Text>
              <Text className="bg-white p-4 mt-2 rounded-xl border border-gray-300">
                {field.value}
              </Text>
            </View>
          ))}

          {/* Edit Button */}
          <TouchableOpacity
            className="bg-blue-900 mt-8 py-4 rounded-xl"
            onPress={() => alert('Navigate to Edit Profile')}
          >
            <Text className="text-white text-center font-bold text-lg">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
