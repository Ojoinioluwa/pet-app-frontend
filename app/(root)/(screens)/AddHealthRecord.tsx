import { addHealthAPI } from "@/services/health/healthService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title field is required"),
  type: Yup.string()
    .oneOf(["Checkup", "Treatment", "Deworming", "Vaccination"])
    .required("Type field is required"),
  description: Yup.string().required("Description is required"),
  cost: Yup.number()
    .typeError("Cost must be a number")
    .required("Cost is required"),
  date: Yup.date().required("Date is required"),
  veterinarian: Yup.string(),
});

const AddHealthRecord = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { id } = useLocalSearchParams();
  const petId = Array.isArray(id) ? id[0] : id;

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AddHealthRecord"],
    mutationFn: addHealthAPI,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      description: "",
      cost: 0,
      date: new Date().toISOString(),
      veterinarian: "",
      petId: petId,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        Toast.show({
          type: "success",
          text1: "Health record created successfully",
        });
        formik.resetForm();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to create record",
          text2: "Something went wrong",
        });
        console.log(error);
      }
    },
  });
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <KeyboardAvoidingView className="flex-1">
        <ScrollView className="flex-1 pt-5 px-5">
          <Text className="text-3xl text-center text-blue-950 font-rubik-extrabold">
            Add Pet Health Record
          </Text>
          <Text className="pt-2 font-rubix-light text-blue-950 text-lg text-center">
            Fill in all about the pet's health record
          </Text>
          <View className="flex-1 items-center justify-center px-5 mt-5 gap-5">
            {/* title field */}
            <View className="w-full flex gap-2">
              <TextInput
                editable={!isPending}
                value={formik.values.title}
                onChangeText={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                className="bg-white w-full px-2 py-5 outline-0"
                placeholder="Enter Title of the record"
              />
              {formik.touched.title && formik.errors.title && (
                <Text className="text-red-600 text-sm">
                  {formik.errors.title}
                </Text>
              )}
            </View>

            {/* Type field */}
            <View className="w-full flex gap-2 rounded-3xl bg-white">
              <Picker
                selectedValue={formik.values.type}
                onValueChange={(itemValue) =>
                  formik.setFieldValue("type", itemValue)
                }
                style={{ backgroundColor: "white", borderRadius: 100 }}
              >
                <Picker.Item label="Select Health Type" value="" />
                <Picker.Item label="Vaccination" value="Vaccination" />
                <Picker.Item label="Deworming" value="Deworming" />
                <Picker.Item label="Treatment" value="Treatment" />
                <Picker.Item label="Checkup" value="Checkup" />
              </Picker>
            </View>
            {formik.touched.type && formik.errors.type && (
              <Text className="text-red-600 text-sm">{formik.errors.type}</Text>
            )}

            {/* Description field */}
            <View className="w-full flex gap-2">
              <TextInput
                editable={!isPending}
                value={formik.values.description}
                onChangeText={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                multiline
                numberOfLines={4}
                placeholder="Enter a description about your pet"
                className="bg-white w-full px-4 py-4 text-base text-gray-800"
                textAlignVertical="top"
              />
              {formik.touched.description && formik.errors.description && (
                <Text className="text-red-600 text-sm">
                  {formik.errors.description}
                </Text>
              )}
            </View>
            {/* Cost field */}
            <View className="w-full flex gap-2">
              <TextInput
                editable={!isPending}
                value={formik.values.cost.toFixed(0)}
                onChangeText={formik.handleChange("cost")}
                onBlur={formik.handleBlur("cost")}
                keyboardType="number-pad"
                className="bg-white  w-full px-2 py-5 outline-0"
                placeholder="Enter cost of Treatment"
              />
              {formik.touched.cost && formik.errors.cost && (
                <Text className="text-red-600 text-sm">
                  {formik.errors.cost}
                </Text>
              )}
            </View>
            {/* Date field */}
            <View>
              <Button title="Pick Date" onPress={() => setShow(true)} />
              <Text className="mt-2 text-center">
                {formik.values.date.toString()}
              </Text>

              {show && (
                <DateTimePicker
                  value={new Date(formik.values.date)}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) => {
                    setShow(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                      formik.setFieldValue("date", selectedDate.toISOString());
                    }
                  }}
                />
              )}
            </View>
            {/* Veterinarian field */}
            <View className="w-full flex gap-2">
              <TextInput
                value={formik.values.veterinarian}
                onChangeText={formik.handleChange("veterinarian")}
                onBlur={formik.handleBlur("veterinarian")}
                editable={!isPending}
                className="bg-white w-full px-2 py-5 outline-0"
                placeholder="Enter vetenerian Name"
              />
              {formik.touched.veterinarian && formik.errors.veterinarian && (
                <Text className="text-red-600 text-sm">
                  {formik.errors.veterinarian}
                </Text>
              )}
            </View>

            <TouchableOpacity
              className="bg-blue-950 rounded-3xl w-full px-2 py-5 mt-5"
              onPress={formik.handleSubmit}
              disabled={isPending}
            >
              <Text className="text-white text-center text-lg font-rubik-extrabold">
                {isPending ? "Submitting..." : "Add Pet"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddHealthRecord;
