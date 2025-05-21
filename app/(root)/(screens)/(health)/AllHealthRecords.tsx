import HealthRecordCard from "@/components/HealthRecordCard";
import icons from "@/constants/icons";
import { getHealthRecordByUserAPI } from "@/services/health/healthService";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HealthRecord = {
  _id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  veterinarian: string;
  cost: number;
};

const AllHealthRecords = () => {
  const [type, setType] = useState("")
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["AllHealthRecord"],
    queryFn: getHealthRecordByUserAPI,
  });
  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 mb-3">
          Failed to load health records.
        </Text>
        {/* <TouchableOpacity title="Retry" onPress={refetch} /> */}
        <TouchableOpacity className="px-3 py-4 bg-blue-950" onPress={refetch}>Retry</TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="px-4 mt-10 mb-5">
        <Text className="text-blue-950 text-5xl font-rubix-medium mb-5">
          Health Records
        </Text>
        <View className="flex-row rounded-lg w-full justify-center">
          <TextInput
            className="w-2/3 bg-white rounded-lg"
            placeholder="Search by Dogs Name"
          />
          <View className="bg-blue-950 px-4 py-2 rounded-lg">
            <Image
              source={icons.search}
              className="w-6 h-6  bg-blue-950"
              resizeMode="contain"
              tintColor={"white"}
            />
          </View>
        </View>
        <View className="bg-white rounded-lg mt-5">
          <Picker
            className="w-full mt-5 bg-white rounded-lg"
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Select Health Type" value="" />
            <Picker.Item label="Vaccination" value="vaccination" />
            <Picker.Item label="Deworming" value="deworming" />
            <Picker.Item label="Checkup" value="checkup" />
            <Picker.Item label="Surgery" value="surgery" />
          </Picker>
        </View>
      </View>

    <FlatList
  data={data.healthRecords}
  keyExtractor={(item) => item._id.toString()}
  renderItem={({ item }) => (
    <HealthRecordCard
      type={item.type}
      title={item.title}
      description={item.description}
      date={item.date}
      veterinarian={item.veterinarian}
      cost={item.cost}
      pet={{
        name: item.petId.name,
        image: item.petId.image,
      }}
      id={item._id}
    />
  )}
  ListEmptyComponent={() => (
    <View className="items-center justify-center mt-12 px-4">
      {/* Icon or Illustration */}
      <Text className="text-7xl mb-4">🩺</Text>

      {/* Message */}
      <Text className="text-lg font-bold text-gray-700 mb-1 text-center">
        No Health Records Found
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-4">
        Keep track of your pet’s medical history. Add your first health record to get started.
      </Text>

      {/* Call-to-Action */}
        <TouchableOpacity className="bg-green-500 px-5 py-3 rounded-full">
          <Text className="text-white font-semibold">Add Health Record</Text>
        </TouchableOpacity>
    </View>
  )}
/>

    </SafeAreaView>
  );
};

export default AllHealthRecords;
