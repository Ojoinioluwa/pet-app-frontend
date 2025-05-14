import icons from '@/constants/icons';
import { AddPetAPI } from '@/services/pet/petServices';
import { Picker } from '@react-native-picker/picker';
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Pet name is required'),
  age: Yup.string()
    .required('Age is required'),
  breed: Yup.string().required('Breed is required'),
  species: Yup.string().required('Species is required'),
  weight: Yup.string().required("weight is required"),
  sex: Yup.string().required("Pet's sex is required").oneOf(["male", "female"]),
  description: Yup.string().required("Description field is required"),

});

interface PetFormValues {
  name: string;
  age: string;
  breed: string;
  species: string;
  weight: string;
  sex: string;
  description: string;
}


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
      const uri = result.assets[0].uri;
      setImageUri(uri);
    }
  };

  const {mutateAsync, isPending} = useMutation({
    mutationKey: ["AddPet"],
    mutationFn: AddPetAPI,
  })

  const formik = useFormik<PetFormValues>({
    initialValues: {
      name: '',
      age: "",
      breed: '',
      species: '',
      weight: "",
      sex: "",
      description: "",
    },
    validationSchema,
    onSubmit:  async (values) => {
      if (!imageUri) return Alert.alert('Please pick an image');
      try {
        const ageNum = parseInt(values.age, 10)
        const weightNum = parseInt(values.weight, 10)
        if (isNaN(ageNum) || isNaN(weightNum)) {
          return Alert.alert('Invalid number', 'Please enter valid age and weight');
        }

        const data = new FormData();
        data.append("name", values.name);
        data.append("age", String(ageNum));
        data.append("breed", values.breed);
        data.append("species", values.species);
        data.append("weight", String(weightNum));
        data.append("sex", values.sex);
        data.append("description", values.description);
        data.append("image", {
          uri: imageUri,
          name: "pet.jpg",
          type: "image/jpeg",
        } as any)

        await mutateAsync(data);
        Toast.show({ type: 'success', text1: 'Pet added!' });
        formik.resetForm();
        setImageUri(null);
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: error.message
        })
      }
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <KeyboardAvoidingView className="flex-1">
        <ScrollView 
          className="flex-1 pt-5 px-5" 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
              editable={!isPending}
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
                editable={!isPending}
                className="bg-white w-full px-2 py-5 rounded-lg"
                placeholder="Enter your pet's Age"
                keyboardType="number-pad"
                
                onChangeText={formik.handleChange('age')}
                onBlur={formik.handleBlur('age')}
                value={formik.values.age.toString()}
              />
              {formik.touched.age && formik.errors.age && (
                <Text className="text-red-600 text-sm mt-1">{formik.errors.age}</Text>
              )}
            </View>

            {/* weight */}
            <View className="w-full">
              <TextInput
                editable={!isPending}
                className="bg-white w-full px-2 py-5 rounded-lg"
                placeholder="Enter your pet's weight"
                keyboardType="number-pad"
                onChangeText={formik.handleChange('weight')}
                onBlur={formik.handleBlur('weight')}
                value={formik.values.weight.toString()}
              />
              {formik.touched.weight && formik.errors.weight && (
                <Text className="text-red-600 text-sm mt-1">{formik.errors.weight}</Text>
              )}
            </View>

            {/* Breed */}
            <View className="w-full">
              <TextInput
                editable={!isPending}
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
                editable={!isPending}
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

              <View className="w-full flex gap-2 rounded-3xl bg-white">
                <Picker
                  selectedValue={formik.values.sex}
                  onValueChange={(itemValue) => formik.setFieldValue('sex', itemValue)}
                  style={{ backgroundColor: 'white', borderRadius: 100 }}
                >
                  <Picker.Item label="Select Pet's Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
                {formik.touched.sex && formik.errors.sex && (
                  <Text className="text-red-600 text-sm mt-1">{formik.errors.sex}</Text>
                )}
              </View>


            {/* Display Picked Image */}
            

            {/* Image Upload */}
            <TouchableOpacity
              disabled={isPending}
              onPress={pickImage}
              className="w-full h-[24px] bg-white px-2 py-5 items-center rounded-lg"
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
            {!imageUri && <Text className="text-red-600">Image is required</Text>}


            {/* description */}
            <View className="w-full">
              <TextInput
                editable={!isPending}
                className="bg-white w-full px-2 py-5 rounded-lg"
                placeholder="Enter your description"
                multiline
                numberOfLines={4}
                onChangeText={formik.handleChange('description')}
                onBlur={formik.handleBlur('description')}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <Text className="text-red-600 text-sm mt-1">{formik.errors.description}</Text>
              )}
            </View>

            

            {/* Submit Button */}
            <TouchableOpacity
              disabled={isPending}
              className="bg-blue-950 w-full px-2 py-5 mt-5 rounded-lg"
              onPress={formik.handleSubmit}
            >
              {isPending ? <ActivityIndicator/> : <Text className="text-white text-center text-lg font-rubik-extrabold">Add Pet</Text>}

            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPet;
