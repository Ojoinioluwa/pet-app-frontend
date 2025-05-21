import Images from "@/constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          // User exists → go to home
          router.replace("/");
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };

    checkUser();
  }, []);

  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-10">
        <Text className="text-center text-[40px] text-blue-900 font-bold font-rubik-extrabold">
          Keep Track of Your Pet's Health
        </Text>

        {/* Image container */}
        <View className="justify-center items-center pt-10 pb-5 ">
          <Image
            source={Images.LandingPage}
            className="h-[300] w-[300] rounded-full"
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity onPress={()=> {
          router.push("/Register")
          }} className="bg-blue-950 px-2 py-5 rounded-lg w-full flex items-center mt-10">
          <Text className="text-white font-rubik-bold text-2xl">Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> router.push("/Login")} className=" px-2 py-5 rounded-lg border border-blue-950 flex items-center mt-5">
          <Text className="text-blue-950  font-rubik-bold text-2xl">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

export default LandingPage;
