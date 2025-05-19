import PetCard from "@/components/PetCard";
import images from "@/constants/images";
import { ListPetsAPI } from "@/services/pet/petServices";
import { GetProfileAPI } from "@/services/User/userServices";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomePage = () => {
  const {
    data: pets,
    isLoading: petLoading,
    error,
    isError: petError,
    refetch: petRefetch,
  } = useQuery({
    queryKey: ["listPets"],
    queryFn: ListPetsAPI,
  });

  const {
    data: user,
    isError: userError,
    refetch: userRefetch,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: GetProfileAPI,
  });

  const refetch = () => {
    userRefetch();
    petRefetch();
  };

  const renderQuickAction = (label: string, href: any, bgClass: string) => (
    <Link href={href} asChild>
      <TouchableOpacity
        className={`${bgClass} p-5 rounded-lg items-center mb-4 w-1/2`}
      >
        <Text className="text-white font-semibold text-center text-sm">
          {label}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  if (petLoading || userLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  if (userError || petError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 mb-3">
          Failed to load health records.
        </Text>
        <Button title="Retry" onPress={refetch} />
      </View>
    );
  }

  if (petError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">
          Failed to load pet information. Please try again.
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center bg-white p-4 shadow rounded-b-lg mb-6">
        <View className="flex-1 pr-4">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-xl font-semibold text-blue-950"
          >
            Welcome, {user?.user?.name}
          </Text>
          <Text className="text-sm text-gray-600">
            You have {pets?.pets?.length || 0} pets
          </Text>
        </View>
        <View className="flex-row items-center space-x-4">
          {/* Notifications */}
          <Link href="/AllReminders" asChild>
            <TouchableOpacity className="p-2">
              <Text className="text-2xl">🔔</Text>
            </TouchableOpacity>
          </Link>
          {/* Avatar */}
          <Image
            source={images.avatar}
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Quick Actions Row */}
      <View className="flex-row justify-between mb-6 gap-2">
        {renderQuickAction("+ Add Pet", "/AddPet", "bg-blue-500")}
        {renderQuickAction("View Records", "/AllHealthRecords", "bg-green-500")}
      </View>

      {/* Pets Horizontal List */}
      <Text className="text-lg font-bold mb-2">Your Pets</Text>
      {pets?.pets?.length === 0 && (
        <Text className="text-gray-500 text-center">
          You don't have any pets yet.
        </Text>
      )}

      <FlatList
        data={pets?.pets}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        removeClippedSubviews={true}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
          <PetCard
            image={item.image}
            name={item.name}
            age={item.age}
            breed={item.breed}
            species={item.species}
            width="fit"
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
    height: 400,
  },
});

export default HomePage;
