import icons from '@/constants/icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
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
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Pet name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .required('Age is required'),
  breed: Yup.string().required('Breed is required'),
  species: Yup.string().required('Species is required'),
});

const AddPet = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

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

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      breed: '',
      species: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log({ ...values, imageUri });
      Alert.alert('Success', 'Pet added successfully!');
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <KeyboardAvoidingView className="flex-1">
        <ScrollView className="flex-1 pt-5 px-5"  >
          <Text className="text-4xl text-center text-blue-950 font-rubik-extrabold">
            Add Pet Form
          </Text>
          <Text className="pt-2 font-rubix-light text-blue-950 text-lg text-center">
            Fill in all details About Your Pet
          </Text>

          <View className="flex-1 items-center justify-center px-5 mt-5 gap-5">
            {/* Name */}
            <View className="w-full">
              <TextInput
                className="bg-white w-full px-2 py-5 rounded-lg"
                placeholder="Enter your pet name"
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <Text className="text-red-600 text-sm mt-1">{formik.errors.name}</Text>
              )}
            </View>

            {/* Age */}
            <View className="w-full">
              <TextInput
                className="bg-white w-full px-2 py-5 rounded-lg"
                placeholder="Enter your pet's Age"
                keyboardType="number-pad"
                onChangeText={formik.handleChange('age')}
                onBlur={formik.handleBlur('age')}
                value={formik.values.age}
              />
              {formik.touched.age && formik.errors.age && (
                <Text className="text-red-600 text-sm mt-1">{formik.errors.age}</Text>
              )}
            </View>

            {/* Breed */}
            <View className="w-full">
              <TextInput
                className="bg-white w-full px-2 py-5 rounded-lg"
                placeholder="Enter your pet's Breed"
                onChangeText={formik.handleChange('breed')}
                onBlur={formik.handleBlur('breed')}
                value={formik.values.breed}
              />
              {formik.touched.breed && formik.errors.breed && (
                <Text className="text-red-600 text-sm mt-1">{formik.errors.breed}</Text>
              )}
            </View>

            {/* Species */}
            <View className="w-full">
              <TextInput
                className="bg-white w-full px-2 py-5 rounded-lg"
                placeholder="Enter your pet's Species"
                onChangeText={formik.handleChange('species')}
                onBlur={formik.handleBlur('species')}
                value={formik.values.species}
              />
              {formik.touched.species && formik.errors.species && (
                <Text className="text-red-600 text-sm mt-1">{formik.errors.species}</Text>
              )}
            </View>

            {/* Display Picked Image */}
            

            {/* Image Upload */}
            <TouchableOpacity
              onPress={pickImage}
              className="w-full h-[100] bg-white px-2 py-5 items-center rounded-lg"
            >
              
              {!imageUri ? <Image
                source={icons.uploadImage}
                tintColor={'#172554'}
                className="size-full"
                resizeMode="contain"
              />   : (
              <View className="items-center w-full h-16">
                <Image
                  source={{ uri: imageUri }}
                  className="w-full h-16 rounded-2xl mt-4"
                  resizeMode="contain"
                />
              </View>
            )}
            </TouchableOpacity>

            

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-blue-950 w-full px-2 py-5 mt-5 rounded-lg"
              onPress={formik.handleSubmit}
            >
              <Text className="text-white text-center text-lg font-rubik-extrabold">
                Add Pet
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPet;
