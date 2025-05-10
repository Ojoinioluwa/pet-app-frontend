import icons from '@/constants/icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-200 px-3 py-5'>
        <View className='flex-1'>
            <Text className='text-blue-950 text-5xl font-rubix-medium mb-5 text-center'>Settings</Text>
            <TouchableOpacity onPress={()=> router.push("/Profile")} className='border-blue-950 border bg-white rounded-lg p-3 mt-5 w-full flex-row items-center'>
                <Text className='text-blue-950 text-2xl'>Profile</Text>
                <Image source={icons.rightArrow} className='w-5 h-5 ml-auto'/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> router.push("/AllReminders")} className='border-blue-950 border bg-white rounded-lg p-3 mt-5 w-full flex-row items-center'>
                <Text className='text-blue-950 text-2xl'>Reminders</Text>
                <Image source={icons.rightArrow} className='w-5 h-5 ml-auto'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push("/Privacy")} className='border-blue-950 border bg-white rounded-lg p-3 mt-5 w-full flex-row items-center'>
                <Text className='text-blue-950 text-2xl'>Privacy</Text>
                <Image source={icons.rightArrow} className='w-5 h-5 ml-auto'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push("/Help")} className='border-blue-950 border bg-white rounded-lg p-3 mt-5 w-full flex-row items-center'>
                <Text className='text-blue-950 text-2xl'>Help</Text>
                <Image source={icons.rightArrow} className='w-5 h-5 ml-auto'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>console.log("Logged out")} className='border-blue-950 border bg-white rounded-lg p-3 mt-5 w-full flex-row items-center'>
                <Text className='text-blue-950 text-2xl'>Log Out</Text>
                <Image source={icons.rightArrow} className='w-5 h-5 ml-auto'/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Settings