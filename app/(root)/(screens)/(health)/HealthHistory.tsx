import HealthRecordCard from "@/components/HealthRecordCard";
import { getHealthDetailsAPI } from "@/services/health/healthService";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HealthRecord = {
  _id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  veterinarian: string;
  cost: number;
  petId: {
    name: string;
    image: string;
  };
};

const HealthHistory = () => {
  const [type, setType] = useState("");
  const { id } = useLocalSearchParams();
  const petId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["HealthHistory", petId],
    queryFn: () => getHealthDetailsAPI({ petId }),
  });

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const filtered =
      type && type !== ""
        ? data?.healthRecords.filter((record: HealthRecord) => record.type === type)
        : data?.healthRecords;
    setFilteredData(filtered);
  }, [type, data]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
if (isError) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-500 mb-3">Failed to load health records.</Text>
      <Button title="Retry" onPress={refetch} />
    </View>
  );
}

  return (
    <SafeAreaView className="flex-1 py-3">
      <Text className="text-blue-950 text-2xl text-center font-rubix-medium">
        Health Records for {data?.healthRecords?.[0]?.petId?.name || "Pet"}
      </Text>
      <View className="bg-gray-100 p-4 flex-1">
        <View className="bg-white rounded-lg mt-5 mb-5">
          <Picker
            className="w-full mt-5 bg-white rounded-lg"
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          >
            <Picker.Item label="Select Health Type" value="" />
            <Picker.Item label="Vaccination" value="vaccination" />
            <Picker.Item label="Deworming" value="deworming" />
            <Picker.Item label="Treatment" value="treatment" />
            <Picker.Item label="Checkup" value="checkup" />
          </Picker>
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              No health records found for this type.
            </Text>
          }
          renderItem={({ item }: { item: HealthRecord }) => (
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
        />
      </View>
    </SafeAreaView>
  );
};

export default HealthHistory;
