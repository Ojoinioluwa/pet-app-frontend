import images from '@/constants/images'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PetInfo = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-200 px-3 py-5'>
        <ScrollView className='flex-1'>
            <Text className='text-blue-950 text-5xl font-rubix-medium mb-5'> Mandy</Text>
            <View className='w-full px-5'>
              <Image source={images.LandingPage} className='w-full h-[200] rounded-lg'/>
              <View className='flex-row gap-3'>
                <TouchableOpacity className='border-blue-950 border bg-white rounded-lg p-3 mt-5 w-1/2'>
                  <Text className='text-blue-950 text-center text-lg font-rubix-medium'>Add Record</Text>
                </TouchableOpacity>
                <TouchableOpacity className='border-blue-950 border bg-white rounded-lg p-3 mt-5 w-1/2'>
                  <Text className='text-blue-950 text-center text-lg font-rubix-medium'>Add Record</Text>
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default PetInfo