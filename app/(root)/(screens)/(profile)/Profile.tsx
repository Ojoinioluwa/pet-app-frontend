import images from "@/constants/images";
import { GetProfileAPI } from "@/services/User/userServices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = () => {
  const { data, isError, refetch, isLoading } = useQuery({
    queryKey: ["Profile"],
    queryFn: GetProfileAPI,
  });
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
        <Text className="text-red-500 mb-3">
          Failed to load health records.
        </Text>
        <Button title="Retry" onPress={refetch} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-5 pt-10">
      <ScrollView className="flex-1">
        <Text className="text-3xl text-blue-900 font-bold text-center">
          User Profile
        </Text>

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
            { label: "Name", value: data?.user.name },
            { label: "Email", value: data?.user.email },
            { label: "Phone Number", value: data?.user.phoneNumber },
            { label: "Address", value: data?.user.address },
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
            onPress={() => alert("Navigate to Edit Profile")}
          >
            <Text className="text-white text-center font-bold text-lg">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
