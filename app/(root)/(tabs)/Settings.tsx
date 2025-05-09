import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-200 px-3 py-5'>
        <View className='border-b border-gray-300 pb-5'>
            <TouchableOpacity>
                <Text className='text-blue-950 text-lg'>Account</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Settings