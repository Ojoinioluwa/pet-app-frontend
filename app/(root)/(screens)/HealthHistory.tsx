import HealthRecordCard from '@/components/HealthRecordCard'
import images from '@/constants/images'
import { Picker } from '@react-native-picker/picker'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
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



const HealthHistory = () => {

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
    const {data} = useQuery({
        
    })
  return (
    <SafeAreaView className='flex-1 py-3'>
            <Text className='text-blue-950 text-2xl text-center font-rubix-medium'>Health Records for Mandy</Text>
        <View className="bg-gray-100 p-4 flex-1">
            <View className='bg-white rounded-lg mt-5 mb-5'>
                <Picker className='w-full mt-5 bg-white rounded-lg' selectedValue="all" onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
                <Picker.Item label="Select Health Type" value="" />
                <Picker.Item label="Vaccination" value="vaccination" />
                <Picker.Item label="Deworming" value="deworming" />
                <Picker.Item label="Checkup" value="checkup" />
                <Picker.Item label="Surgery" value="surgery" />
                </Picker>
            </View>
           <FlatList
            data={array}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }: { item: HealthRecord }) => (
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
    )}
          />

        </View>
    </SafeAreaView>
  )
}

export default HealthHistory