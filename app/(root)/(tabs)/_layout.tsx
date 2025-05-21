import icons from '@/constants/icons';
import images from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';


const TabIcon = ({ focused, icon,  }: { focused: boolean; icon: any; }) => {
  return (
    <View className='flex-1 mt-3 flex flex-col items-center'>
      <Image
        source={icon}
        style={{ width: 24, height: 24 }}
        resizeMode='contain'
        tintColor={focused ? "#0061FF" : "#666876"}
      />
    </View>
  );
};


const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        minHeight: 70,
      },
    }}>
      <Tabs.Screen 
        name='index'
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({focused})=> <TabIcon focused={focused} icon={icons.home} />
        }}
      />
      <Tabs.Screen 
        name='ListPets'
        options={{
          title: "List Pets",
          headerShown: false,
          tabBarIcon: ({focused})=> <TabIcon focused={focused} icon={images.list} />
        }}
      />
      <Tabs.Screen 
        name='AddPet'
        options={{
          title: "List Pets",
          headerShown: false,
          tabBarIcon: ({focused})=> <TabIcon focused={focused} icon={images.add} />
        }}
      />
      <Tabs.Screen 
        name='Settings'
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({focused})=> <TabIcon focused={focused} icon={images.settings} />
        }}
      />

    </Tabs>
  )
}

export default TabsLayout