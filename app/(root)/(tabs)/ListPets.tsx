import PetCard from '@/components/PetCard'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { router } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const ListPet = () => {
  return (
   <SafeAreaView className="flex-1 bg-gray-200 pb-10">
    <ScrollView className='flex-1'> 
      {/* TODO: Filter  */}
      <View className='flex-1 px-5 pt-5 flex items-center mb-12'>
        <Text className='text-blue-950 text-5xl font-rubix-medium mb-5'>My Pets</Text>
        <View className='flex-row mb-3 bg-white rounded-lg items-center w-2/3'>
          <TextInput className='bg-white w-[200px]' placeholder='Search by Name' placeholderTextColor="#172554"/>
          <TouchableOpacity className='bg-blue-950 w-[50] px-2 flex items-center justify-center rounded-lg'>
            <Image source={icons.search} className='text-white text-lg font-rubix-medium w-5' resizeMode='contain' tintColor={"white"}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=> router.push('/AddPet')} className='bg-blue-950 mb-5 border text-white rounded-lg p-3 mt-5 w-1/3 flex-row items-center justify-center'>
          <Image source={icons.wallet} className='w-5 h-5 mr-2' tintColor={"white"}/>
          <Text className='text-white text-lg font-rubik-extrabold'>Add Pet</Text>
        </TouchableOpacity>
        <PetCard image={images.LandingPage} name='Mandy' breed='Shiba Inu' age={3} species='German Sheperd' width='2/3'/>
        <PetCard image={images.LandingPage} name='Mandy' breed='Shiba Inu' age={3} species='German Sheperd' width='2/3'/>
        <PetCard image={images.LandingPage} name='Mandy' breed='Shiba Inu' age={3} species='German Sheperd'width='2/3'/>
        <PetCard image={images.LandingPage} name='Mandy' breed='Shiba Inu' age={3} species='German Sheperd' width='2/3'/>
        <PetCard image={images.LandingPage} name='Mandy' breed='Shiba Inu' age={3} species='German Sheperd' width="2/3"/>
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default ListPet