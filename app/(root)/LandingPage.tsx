import Images from "@/constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const LandingPage = () => {
  // instantiate the router
  const router = useRouter();


  useEffect(() => {
    // checks if the user is in the storage so as to prevent login everytime the user makes use of the applciation
    const checkUser = async () => {
      try {
        // gets the user info from asyncstorage
        const user = await AsyncStorage.getItem("user");
        if (user) {
          // User exists - go to home
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
        {/* displayed header text for the landing page */}
        <Text className="text-center text-[40px] text-blue-900 font-bold font-rubik-extrabold">
          Keep Track of Your Pet's Health
        </Text>

        {/* Image container */}
        <View className="justify-center items-center pt-10 pb-5 ">
          {/* the landing image */}
          <Image
            source={Images.LandingPage}
            className="h-[300] w-[300] rounded-full"
            resizeMode="cover"
          />
        </View>
        {/* buttonet to redirect the user to the register page */}
        <TouchableOpacity onPress={()=> {
          router.push("/Register")
          }} className="bg-blue-950 px-2 py-5 rounded-lg w-full flex items-center mt-10">
          <Text className="text-white font-rubik-bold text-2xl">Get Started</Text>
        </TouchableOpacity>
        {/* button to redirect the user to the login page  */}
        <TouchableOpacity onPress={()=> router.push("/Login")} className=" px-2 py-5 rounded-lg border border-blue-950 flex items-center mt-5">
          <Text className="text-blue-950  font-rubik-bold text-2xl">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

export default LandingPage;
