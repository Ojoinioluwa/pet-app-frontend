import NotificationCard from "@/components/NotificationCard";
import { GetAllReminderForUser } from "@/services/reminder/reminderServices";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

interface Reminder {
  _id: string;
  title: string;
  date: Date;
  type: string;
  description: string;
  petId: {
    name: string;
    image: string;
  };
}

const AllReminders = () => {
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["GetReminderForUser"],
    queryFn: GetAllReminderForUser,
  });
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
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
        <Text className="text-red-500">
          Failed to load reminders. Please try again.
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <ScrollView className="flex-1 px-4 mt-10">
        <Text className="text-blue-950 text-5xl font-rubix-medium mb-5">
          Notifications
        </Text>

        {data?.reminders?.length > 0 ? (
          data?.reminders.map((reminder: Reminder) => (
            <NotificationCard
              key={reminder._id}
              title={reminder.title}
              id={reminder._id}
              date={reminder.date.split("T")[0]}
              type={reminder.type}
              description={reminder.description}
              pet={{ name: reminder.petId?.name, image: reminder.petId?.image }}
            />
          ))
        ) : (
          <View className="bg-white rounded-xl p-6 items-center justify-center mb-4 shadow-sm">
            {/* Icon or Image */}
            <Text className="text-6xl mb-3">📭</Text>

            {/* Message */}
            <Text className="text-lg font-semibold text-gray-700 mb-1 text-center">
              No Reminders Yet
            </Text>
            <Text className="text-sm text-gray-500 mb-4 text-center px-2">
              You haven't added any reminders for your pet. Stay on top of vet
              visits, vaccinations, and medications by setting one now.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllReminders;
