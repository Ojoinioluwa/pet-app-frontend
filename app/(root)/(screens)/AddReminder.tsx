import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddReminder = () => {
        const [petType, setPetType] = useState('');
        const [date, setDate] = useState(new Date());
        const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); 
    setDate(currentDate);
  };
  return (
     <SafeAreaView className="flex-1 bg-gray-200">
          <KeyboardAvoidingView className="flex-1">
            <ScrollView className="flex-1 pt-5 px-5">
              <Text className="text-3xl text-center text-blue-950 font-rubik-extrabold">
                Add Reminder
              </Text>
              <Text className="pt-2 font-rubix-light text-blue-950 text-base text-center">
                Fill in all the details about the reminder for your pet, including the title, type, description, cost, date, and veterinarian's name.
              </Text>
    
              <View className="flex-1 items-center justify-center px-5 mt-5 gap-5">
                {/* title field */}
                <View className="w-full flex gap-2">
                  <TextInput
                    className="bg-white w-full px-2 py-5 outline-0"
                    placeholder="Enter Title of the record"
                  />
                </View>
    
                {/* Type field */}
                <View className="w-full flex gap-2 rounded-3xl bg-white">
                    <Picker
                    selectedValue={petType}
                    onValueChange={(itemValue) => setPetType(itemValue)}
                    style={{ backgroundColor: 'white', borderRadius: 100 }}
                    >
                        <Picker.Item label="Select Health Type" value="" />
                        <Picker.Item label="Vaccination" value="Vaccination" />
                        <Picker.Item label="Deworming" value="caDewormingt" />
                        <Picker.Item label="Treatment" value="Treatment" />
                        <Picker.Item label="Checkup" value="Checkup" />
                    </Picker>
                </View>
                {/* Description field */}
                <View className="w-full flex gap-2">
                    <TextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Enter a description about your pet"
                        className="bg-white w-full px-4 py-4 text-base text-gray-800"
                        textAlignVertical="top" 
                    />
                </View>
                {/* Cost field */}
                <View className="w-full flex gap-2">
                    <TextInput
                    keyboardType='number-pad'
                        className="bg-white  w-full px-2 py-5 outline-0"
                        placeholder="Enter cost of Treatment"
                    />
                </View>
                {/* Date field */}
                 <View>
                    <Button title="Pick Date" onPress={() => setShow(true)} />
                    <Text className="mt-2 text-center">{date.toDateString()}</Text>

                    {show && (
                        <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        />
                    )}
                </View>
                {/* Veterinarian field */}
                <View className="w-full flex gap-2">
                    <TextInput
                        className="bg-white w-full px-2 py-5 outline-0"
                        placeholder="Enter vetenerian Name"
                    />
                </View>

              <TouchableOpacity className="bg-blue-950 rounded-3xl w-full px-2 py-5 mt-5"
              >
                <Text className="text-white text-center text-lg font-rubik-extrabold">Add Pet</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
  )
}

export default AddReminder