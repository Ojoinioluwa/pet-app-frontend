import icons from '@/constants/icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddPet = () => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access media library is needed!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <KeyboardAvoidingView className="flex-1">
        <ScrollView className="flex-1 pt-5 px-5">
          <Text className="text-4xl text-center text-blue-950 font-rubik-extrabold">
            Add Pet Form
          </Text>
          <Text className="pt-2 font-rubix-light text-blue-950 text-lg text-center">
            Fill in all details About Your Pet
          </Text>

          <View className="flex-1 items-center justify-center px-5 mt-5 gap-5">
            {/* Name field */}
            <View className="w-full flex gap-2">
              <TextInput
                className="bg-white  w-full px-2 py-5 outline-0"
                placeholder="Enter your pet name"
              />
            </View>

            {/* Age field */}
            <View className="w-full flex gap-2">
              <TextInput
                keyboardType="number-pad"
                className="bg-white  w-full px-2 py-5 outline-0"
                placeholder="Enter your pet's Age"
              />
            </View>
            <View className="w-full flex gap-2">
                <TextInput
                    className="bg-white  w-full px-2 py-5 outline-0"
                    placeholder="Enter your pet's Breed"
                />
            </View>
            <View className="w-full flex gap-2">
                <TextInput
                    className="bg-white  w-full px-2 py-5 outline-0"
                    placeholder="Enter your pet's species"
                />
            </View>

            {/* Image Upload Text */}
            <TouchableOpacity onPress={pickImage} className='w-full h-[100] bg-white  px-2 py-5 items-center'>
             <Image source={icons.uploadImage} tintColor={"#172554"} className='size-full' resizeMode='contain'/>
            </TouchableOpacity>

            {/* Display selected image URI */}
            {imageUri && (
              <View className="items-center w-full">
                <Image
                  source={{ uri: imageUri }}
                  className="w-full h-44 rounded-2xl mt-4"
                  resizeMode='contain'
                />
              </View>
            )}
            <TouchableOpacity className="bg-blue-950  w-full px-2 py-5 mt-5"
            >
              <Text className="text-white text-center text-lg font-rubik-extrabold">Add Pet</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPet;
