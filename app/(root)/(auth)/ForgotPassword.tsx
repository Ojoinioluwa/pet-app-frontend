import images from '@/constants/images'
import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const ForgotPassword = () => {

  return (
    <SafeAreaView className='flex-1 bg-white'>
      
      <View className='flex-1'>
        <Image source={images.ForgotPassword} resizeMode='contain' className='size-full bg-white' />
      </View>
      <View className='flex-1 px-5 '>
        <Text className='text-blue-950 font-rubik-extrabold text-3xl text-center pb-2'>Forgot Password?</Text>
        <Text className='text-center text-sm font-rubix-light text-gray-400'>No worries, we will send you reset instructions</Text>
        <TextInput placeholderTextColor={"#172554"} className='w-full py-4  bg-gray-100 mt-5 rounded-lg' placeholder='Enter your email'/>

        <TouchableOpacity className='mt-5 py-4 bg-blue-950 w-full rounded-lg'>
          <Text className='text-white text-center font-rubik-extrabold font-bold text-lg '>Continue</Text>
        </TouchableOpacity>
      
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword