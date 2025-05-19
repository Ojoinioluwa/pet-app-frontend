import { getHealthDetailsAPI } from "@/services/health/healthService";
import { GetPetByIdAPI } from "@/services/pet/petServices";
import { GetRemindersForPetAPI } from "@/services/reminder/reminderServices";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HealthRecord {
  _id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  veterinarian?: string;
  cost?: number;
}

interface Reminder {
  _id: string;
  petId: string;
  title: string;
  type: string;
  description: string;
  date: Date;
  veterinarian: string;
}

const PetInfo = () => {
  const { id } = useLocalSearchParams();
  const petId = Array.isArray(id) ? id[0] : id;

  const { data: petData, refetch: refetchPet, isPending:petPending } = useQuery({
  queryKey: ["petInfo", petId],
  queryFn: () => GetPetByIdAPI({ petId }),
  enabled: !!petId,
});

const { data: healthInfo, refetch: refetchHealth, isPending: healthPending } = useQuery({
  queryKey: ["HealthRecord", petId],
  queryFn: () => getHealthDetailsAPI({ petId }),
  enabled: !!petId,
});

const { data: reminderData, refetch: refetchReminder, isPending: reminderPending } = useQuery({
  queryKey: ["ReminderRecord", petId],
  queryFn: () => GetRemindersForPetAPI({ petId }),
  enabled: !!petId,
});


useFocusEffect(
  useCallback(() => {
    refetchPet();
    refetchHealth();
    refetchReminder();
  }, [refetchPet, refetchHealth, refetchReminder])
);



  if(petPending || healthPending || reminderPending){
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-200 px-3 py-5">
      <ScrollView className="flex-1">
        <View className="w-full px-5">
          {/* Pet Profile */}
          <View className="flex-row items-center gap-3">
            <Image
              source={{ uri: petData?.pet.image }}
              className="w-[150] h-[150] rounded-full"
            />
            <View className="flex-1">
              <Text className="text-blue-950 text-4xl font-rubix-medium">
                {petData?.pet.name}
              </Text>
              <Text className="text-blue-950 text-lg font-rubix-light">
                Species: {petData?.pet.species}
              </Text>
              <Text className="text-blue-950 text-lg font-rubix-light">
                Age: {petData?.pet.age}
              </Text>
              <Text className="text-blue-950 text-lg font-rubix-light">
                weight: {petData?.pet.weight} KG
              </Text>
              <Text className="text-blue-950 text-lg font-rubix-light">
                Breed: {petData?.pet.breed}
              </Text>
              <Text className="text-blue-950 text-lg font-rubix-light">
                sex: {petData?.pet.sex}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="border-blue-950 border bg-white rounded-lg p-3 mt-5 w-1/2"
              onPress={() =>
                router.push({
                  pathname: "/AddHealthRecord",
                  params: {
                    id: petId,
                  },
                })
              }
            >
              <Text className="text-blue-950 text-center text-lg font-rubix-medium">
                + Health Record
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border-blue-950 border bg-white rounded-lg p-3 mt-5 w-1/2"
              onPress={() => router.push({
                pathname: "/HealthHistory",
                params: {
                  id: petId
                }
              })}
            >
              <Text className="text-blue-950 text-center text-lg font-rubix-medium">
                View History
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="bg-blue-950 rounded-lg p-3 mt-5 w-1/2"
              onPress={() =>
                router.push({
                  pathname: "/AddReminder",
                  params: {
                    id: petId,
                  },
                })
              }
            >
              <Text className="text-white text-center text-lg font-rubix-medium">
                Add Reminder
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-950 rounded-lg p-3 mt-5 w-1/2"
              onPress={() => router.push({
                pathname: "/RemindersPet",
                params: {
                  id: petId
                }
              })}
            >
              <Text className="text-white text-center text-lg font-rubix-medium">
                View Reminders
              </Text>
            </TouchableOpacity>
          </View>

          {/* Health Records Preview */}
          <Text className="mt-6 mb-2 text-blue-950 text-xl font-rubix-semibold">
            Recent Health Records
          </Text>
          {healthInfo?.healthRecords?.length > 0 ? (
            healthInfo.healthRecords.map((record: HealthRecord) => (
              <View key={record._id} className="bg-white rounded-lg p-3 mb-3">
                <Text className="text-lg font-rubix-semibold text-blue-950">
                  {record.title}
                </Text>
                <Text className="text-sm text-gray-600">
                  {record.type} — {new Date(record.date).toDateString()}
                </Text>
                <Text className="text-sm text-gray-600">
                  {record.description}
                </Text>
              </View>
            ))
          ) : (
            <View className="bg-white rounded-lg p-3 mb-3">
              <Text className="text-red-500 text-base">
                Pet does not have any Health Data yet Add Health Record for you
                pet
              </Text>
            </View>
          )}

          {/* Upcoming Reminders Preview */}
          <Text className="mt-6 mb-2 text-blue-950 text-xl font-rubix-semibold">
            Upcoming Reminders
          </Text>
          {reminderData?.reminders?.length > 0 && reminderData !== undefined ? (
            reminderData.reminders.map((reminder: any) => (
              <View key={reminder._id} className="bg-white rounded-lg p-3 mb-3">
                <Text className="text-lg font-rubix-semibold text-blue-950">
                  {reminder.title}
                </Text>
                <Text className="text-sm text-gray-600">
                  {reminder.type} — {new Date(reminder.date).toDateString()}
                </Text>
                <Text className="text-sm text-gray-600">
                  {reminder.description}
                </Text>
              </View>
            ))
          ) : (
            <View className="bg-white rounded-lg p-3 mb-3">
              <Text className="text-red-500 text-base">
                Pet does not have any Reminders yet. Add one for your pet.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetInfo;
