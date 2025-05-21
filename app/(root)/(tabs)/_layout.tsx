import icons from '@/constants/icons';
import images from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';


// tab icon component to ensure DRY
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
    // the tabs group
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        minHeight: 70,
      },
    }}>
      {/* the home page screen  */}
      <Tabs.Screen 
        name='index'
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({focused})=> <TabIcon focused={focused} icon={icons.home} />
        }}
      />
      {/* the list pet screen */}
      <Tabs.Screen 
        name='ListPets'
        options={{
          title: "List Pets",
          headerShown: false,
          tabBarIcon: ({focused})=> <TabIcon focused={focused} icon={images.list} />
        }}
      />
      {/* add pet screen */}
      <Tabs.Screen 
        name='AddPet'
        options={{
          title: "List Pets",
          headerShown: false,
          tabBarIcon: ({focused})=> <TabIcon focused={focused} icon={images.add} />
        }}
      />
      {/* settings page screen */}
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