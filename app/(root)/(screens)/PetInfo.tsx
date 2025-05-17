import images from '@/constants/images'
import { getHealthDetailsAPI } from '@/services/health/healthService'
import { GetPetByIdAPI } from '@/services/pet/petServices'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface HealthRecord {
  _id: string
  type: string
  title: string
  description: string
  date: string
  veterinarian?: string
  cost?: number
}

interface Reminder {
  _id: string
  type: string
  title: string
  description: string
  date: string
  veterinarian?: string
}


const PetInfo = () => {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const { id } = useLocalSearchParams();
  const petId = Array.isArray(id) ? id[0] : id;



  const fetchPetData = async () => {
    // Replace with actual API calls
    const fakeHealth = [
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
        _id: '2',
        type: 'Vaccination',
        title: 'Rabies Shot',
        description: 'Yearly rabies vaccination',
        date: '2025-04-10',
        veterinarian: 'Dr. A',
        cost: 250,
      },
    ]

    const fakeReminders = [
      {
        _id: '7',
        type: 'Checkup',
        title: 'Monthly Vet Visit',
        description: 'Routine check',
        date: '2025-05-20',
        veterinarian: 'Dr. B',
      },
      {
        _id: '4',
        type: 'Checkup',
        title: 'Monthly Vet Visit',
        description: 'Routine check',
        date: '2025-05-20',
        veterinarian: 'Dr. B',
      },
    ]

  

    setHealthRecords(fakeHealth)
    setReminders(fakeReminders)
  }

    const {data: petData} = useQuery({
      queryKey: ["petInfo", petId],
      queryFn: () => GetPetByIdAPI({petId}),
      enabled: !!id
    })

    const {data: healthData} = useQuery({
      queryKey: ["HealthRecord", petId],
      queryFn:()=>  getHealthDetailsAPI({petId})
    })


  return (
    <SafeAreaView className="flex-1 bg-gray-200 px-3 py-5">
      <ScrollView className="flex-1">
        <View className="w-full px-5">
          {/* Pet Profile */}
          <View className="flex-row items-center gap-3">
            <Image source={petData?.pet.image || images.LandingPage} className="w-[150] h-[150] rounded-full" />
            <View className="flex-1">
              <Text className="text-blue-950 text-4xl font-rubix-medium">{petData?.pet.name}</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-blue-950 text-lg font-rubix-light">{petData?.pet.species}</Text>
                <Text className="text-blue-950 text-lg font-rubix-light">{petData?.pet.age}</Text>
                <Text className="text-blue-950 text-lg font-rubix-light">{petData?.pet.weight} KG</Text>
              </View>
              <Text className="text-blue-950 text-lg font-rubix-light">{petData?.pet.breed}</Text>
              <Text className="text-blue-950 text-lg font-rubix-light">{petData?.pet.sex}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="border-blue-950 border bg-white rounded-lg p-3 mt-5 w-1/2"
              onPress={() => router.push({
                pathname: "/AddHealthRecord",
                params: {
                  id: petId
                }
              })}
            >
              <Text className="text-blue-950 text-center text-lg font-rubix-medium">+ Health Record</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border-blue-950 border bg-white rounded-lg p-3 mt-5 w-1/2"
              onPress={() => router.push("/HealthHistory")}
            >
              <Text className="text-blue-950 text-center text-lg font-rubix-medium">View History</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="bg-blue-950 rounded-lg p-3 mt-5 w-1/2"
              onPress={() => router.push("/AddReminder")}
            >
              <Text className="text-white text-center text-lg font-rubix-medium">Add Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-950 rounded-lg p-3 mt-5 w-1/2"
              onPress={() => router.push("/RemindersPet")}
            >
              <Text className="text-white text-center text-lg font-rubix-medium">View Reminders</Text>
            </TouchableOpacity>
          </View>

          {/* Health Records Preview */}
          <Text className="mt-6 mb-2 text-blue-950 text-xl font-rubix-semibold">Recent Health Records</Text>
          {healthRecords.map((record) => (
            <View key={record._id} className="bg-white rounded-lg p-3 mb-3">
              <Text className="text-lg font-rubix-semibold text-blue-950">{record.title}</Text>
              <Text className="text-sm text-gray-600">{record.type} — {new Date(record.date).toDateString()}</Text>
              <Text className="text-sm text-gray-600">{record.description}</Text>
            </View>
          ))}

          {/* Upcoming Reminders Preview */}
          <Text className="mt-6 mb-2 text-blue-950 text-xl font-rubix-semibold">Upcoming Reminders</Text>
          {reminders.map((reminder) => (
            <View key={reminder._id} className="bg-white rounded-lg p-3 mb-3">
              <Text className="text-lg font-rubix-semibold text-blue-950">{reminder.title}</Text>
              <Text className="text-sm text-gray-600">{reminder.type} — {new Date(reminder.date).toDateString()}</Text>
              <Text className="text-sm text-gray-600">{reminder.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PetInfo
