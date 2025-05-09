import icons from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'




const Register = () => {




  return (
    <SafeAreaView className='bg-gray-200 flex-1'>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View className='px-5 mt-5 pb-5 '>
          <Text className='font-rubik-extrabold font-bold text-3xl text-center'>Let's Get Started!</Text>
          <Text className='text-gray-400 text-center font-rubix-light text-xl'>Create an Account to start saving</Text>
          <View className='mt-12'>
            {/* username */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-6'>
              <Image source={icons.person}  className='size-5 ml-5 '/>
              <TextInput placeholderTextColor="gray" placeholder='👤 Enter Your username' className='font-rubix-medium flex-1'/>
            </View>
            {/* email */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-6'>
              <Image source={icons.send}  className='size-5 ml-5'/>
              <TextInput  placeholderTextColor="gray" placeholder='📪 Email' className='font-rubix-medium flex-1'/>
            </View>
          
            {/* phonenumber */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-6'>
              <Image source={icons.phone}  className='size-5 ml-5'/>
              <TextInput placeholderTextColor="gray" placeholder='📵 Phones' className='font-rubix-medium flex-1'/>
            </View>
            {/* password */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-6'>
              <Image source={icons.shield}  className='size-5 ml-5'/>
              <TextInput  secureTextEntry placeholderTextColor="gray" placeholder='🔑 Password' className='font-rubix-medium flex-1'/>
            </View>

            {/* confirm password */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-6'>
              <Image source={icons.shield}  className='size-5 ml-5'/>
              <TextInput  secureTextEntry placeholderTextColor="gray" placeholder='🔑 Confirm password' className='font-rubix-medium flex-1'/>
            </View>
          </View>
          {/* register */}
          <View className='flex justify-center items-center mt-5 '>
            <TouchableOpacity className='bg-blue-950 w-full py-5 rounded-full'>
                <Text className='text-white text-center'>CREATE</Text>
            </TouchableOpacity>     
          </View>
          <View className='flex items-center  justify-center mt-12'>
            <Text className='text-xl'>Already have an account? <Link href="/Login" className='font-rubik-extrabold font-bold text-blue-950'>Login here</Link></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register