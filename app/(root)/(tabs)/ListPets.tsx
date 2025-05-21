import PetCard from "@/components/PetCard";
import icons from "@/constants/icons";
import { ListPetsAPI } from "@/services/pet/petServices";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";

import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Pet = {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  description: string;
  image: string;
};

const ListPet = () => {
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["listPets"],
    queryFn: ListPetsAPI,
  });
  const [filteredData, setFilteredData] = useState<Pet[] | undefined>(
    undefined
  );
  useEffect(() => {
    if (search !== "") {
      const filtered = search
        ? data?.pets.filter((pet) =>
            pet.name.toLowerCase().includes(search.toLowerCase())
          )
        : data?.pets;
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.pets);
    }
  }, [search, data]);

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
          <TouchableOpacity className="px-3 py-4 bg-blue-950 text-white" onPress={refetch}>Retry</TouchableOpacity>
        </View>
      );
    }

  return (
    <SafeAreaView className="flex-1 bg-gray-200 pb-10">
      <ScrollView className="flex-1">
        {/* TODO: Filter  */}
        <View className="flex-1 px-5 pt-5 flex items-center mb-12">
          <Text className="text-blue-950 text-5xl font-rubix-medium mb-5">
            My Pets
          </Text>
          <View className="flex-row mb-3 bg-white rounded-lg items-center w-2/3">
            <TextInput
              value={search}
              onChangeText={setSearch}
              className="bg-white w-[200px]"
              placeholder="Search by Name"
              placeholderTextColor="#172554"
            />
            <TouchableOpacity className="bg-blue-950 w-[50] px-2 flex items-center justify-center rounded-lg">
              <Image
                source={icons.search}
                className="text-white text-lg font-rubix-medium w-5"
                resizeMode="contain"
                tintColor={"white"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/AddPet")}
            className="bg-blue-950 mb-5 border text-white rounded-lg p-3 mt-5 w-1/3 flex-row items-center justify-center"
          >
            <Text className="text-white text-lg font-rubik-extrabold">
              {" "}
              + Add Pet
            </Text>
          </TouchableOpacity>
          {filteredData?.length === 0 ? (
            <View className="items-center justify-center mt-10 px-5">
              <Image
                source={require("@/assets/images/no-pet.png")}
                style={{ width: 180, height: 180 }}
                resizeMode="contain"
              />
              <Text className="text-center text-gray-600 text-base mt-4">
                No pets found
              </Text>
            </View>
          ) : (
            filteredData?.map((pet) => (
              <PetCard
                key={pet._id}
                image={pet.image}
                name={pet.name}
                breed={pet.breed}
                age={pet.age}
                species={pet.species}
                width="2/3"
                petId={pet._id}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListPet;
