import HealthRecordCard from '@/components/HealthRecordCard'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { FlatList, Image, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type HealthRecord = {
    _id: string
    type: string
    title: string
    description: string
    date: string
    veterinarian: string
    cost: number
}

const AllHealthRecords = () => {

     const array: HealthRecord[] = [
        {
            _id: '1',
            type: 'Vaccination',
            title: 'Rabies Shot',
            description: 'Yearly rabies vaccination',
            date: '2025-04-10',
            veterinarian: 'Dr. A',
            cost: 25,
        },
        {
            _id: '6',
            type: 'Vaccination',
            title: 'Rabies Shot',
            description: 'Yearly rabies vaccination',
            date: '2025-04-10',
            veterinarian: 'Dr. A',
            cost: 250,
        },
        {
            _id: '2',
            type: 'Vaccination',
            title: 'Rabies Shot',
            description: 'Yearly rabies vaccination',
            date: '2025-04-10',
            veterinarian: 'Dr. A',
            cost: 250,
        },
        {
            _id: '3',
            type: 'Vaccination',
            title: 'Rabies Shot',
            description: 'Yearly rabies vaccination',
            date: '2025-04-10',
            veterinarian: 'Dr. A',
            cost: 250,
        },
        {
            _id: '4',
            type: 'Vaccination',
            title: 'Rabies Shot',
            description: 'Yearly rabies vaccination',
            date: '2025-04-10',
            veterinarian: 'Dr. A',
            cost: 250,
        },
    ]
  return (
    <SafeAreaView className='flex-1 px-4'>
      <View className='px-4 mt-10 mb-5'>
        <Text className="text-blue-950 text-5xl font-rubix-medium mb-5">
          Health Records
        </Text>
        <View className='flex-row rounded-lg w-full justify-center'>
          <TextInput className='w-2/3 bg-white rounded-lg' placeholder='Search by Dogs Name' />
          <View className='bg-blue-950 px-4 py-2 rounded-lg'>
            <Image
              source={icons.search}
              className='w-6 h-6  bg-blue-950'
              resizeMode='contain'
              tintColor={"white"}
            />
          </View>
        </View>
        <View className='bg-white rounded-lg mt-5'>
            <Picker className='w-full mt-5 bg-white rounded-lg' selectedValue="all" onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
              <Picker.Item label="Select Health Type" value="" />
              <Picker.Item label="Vaccination" value="vaccination" />
              <Picker.Item label="Deworming" value="deworming" />
              <Picker.Item label="Checkup" value="checkup" />
              <Picker.Item label="Surgery" value="surgery" />
            </Picker>
        </View>
      </View>

        <FlatList data={array} keyExtractor={(item) => item._id.toString()} renderItem={({item})=> 
        <HealthRecordCard
          type={item.type}
          title={item.title}
          description={item.description}
          date={item.date}
          veterinarian={item.veterinarian}
          cost={item.cost}
          pet={{
            name: 'Buddy',
            avatarUri: images.LandingPage,
          }}
          id={item._id}
        />
         }/>
    </SafeAreaView>
  )
}

export default AllHealthRecords