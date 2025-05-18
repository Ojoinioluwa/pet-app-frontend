import NotificationCard from '@/components/NotificationCard'
import images from '@/constants/images'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AllReminders = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
        <ScrollView className='flex-1 px-4 mt-10'>
        <Text className='text-blue-950 text-5xl font-rubix-medium mb-5'>Notifications</Text>
        <NotificationCard title='Mandy needs drugs' id='1' date='2020-12-5' type='deworming' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nam aut voluptate labore omnis vitae similique pariatur deserunt earum dolore'  pet={{name: 'Mandy', avatarUri: images.LandingPage}} />  
        <NotificationCard title='Mandy needs drugs' id='1' date='2020-12-5' type='deworming' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nam aut voluptate labore omnis vitae similique pariatur deserunt earum dolore'  pet={{name: 'Mandy', avatarUri: images.LandingPage}} />  
        <NotificationCard title='Mandy needs drugs' id='1' date='2020-12-5' type='deworming' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nam aut voluptate labore omnis vitae similique pariatur deserunt earum dolore'  pet={{name: 'Mandy', avatarUri: images.LandingPage}} />  
        <NotificationCard title='Mandy needs drugs' id='1' date='2020-12-5' type='deworming' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nam aut voluptate labore omnis vitae similique pariatur deserunt earum dolore'  pet={{name: 'Mandy', avatarUri: images.LandingPage}} />  
        <NotificationCard title='Mandy needs drugs' id='1' date='2020-12-5' type='deworming' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nam aut voluptate labore omnis vitae similique pariatur deserunt earum dolore'  pet={{name: 'Mandy', avatarUri: images.LandingPage}} />  
        <NotificationCard title='Mandy needs drugs' id='1' date='2020-12-5' type='deworming' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nam aut voluptate labore omnis vitae similique pariatur deserunt earum dolore'  pet={{name: 'Mandy', avatarUri: images.LandingPage}} />  
        <NotificationCard title='Mandy needs drugs' id='1' date='2020-12-5' type='deworming' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nam aut voluptate labore omnis vitae similique pariatur deserunt earum dolore'  pet={{name: 'Mandy', avatarUri: images.LandingPage}} />  
       
        
        
        </ScrollView>
    </SafeAreaView>
  )
}


export default AllReminders