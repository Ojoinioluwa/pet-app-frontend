import icons from '@/constants/icons'
import { RegisterAPI } from '@/services/User/userServices'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  name: Yup.string().required('name is required').min(3, 'name must be at least 3 characters'),
  phoneNumber: Yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 characters'),
  confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
  address: Yup.string().required('Address is required'),
})

const Register = () => {

  const {mutateAsync, isPending}  = useMutation({
    mutationKey: ["register"],
    mutationFn: RegisterAPI
  })

  const handleRegister = () => {
    formik.handleSubmit();
  };

  const [passvisible, setPassVisible] = useState(false)
  const [confirmPassVisible, setConfirmPassVisible] = useState(false)



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      address: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values)=> {
      mutateAsync(values)
      .then((response)=> {
        console.log("Register response", response)
        Toast.show({
          type: "success",
          text1: response.message,
          text2: "Welcome to the app 👋"
        })
      })
      .catch((error)=> {
        console.log("Register error", error)
        Toast.show({
          type: "error",
          text1: error.message,
          text2: "Please try again"
        })
      })
    }
  })



  return (
    <SafeAreaView className='bg-gray-200 flex-1'>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View className='px-5 mt-5 pb-5 '>
          <Text className='font-rubik-extrabold font-bold text-3xl text-center'>Let's Get Started!</Text>
          <Text className='text-gray-400 text-center font-rubix-light text-xl'>Create an Account to start saving</Text>
          <View className='mt-12'>
            {/* name */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-1 mt-4'>
              <Image source={icons.person}  className='size-5 ml-5 '/>
              <TextInput 
               value={formik.values.name}  
               editable={!isPending} 
               placeholderTextColor="gray" 
               placeholder='👤 name' 
               className='font-rubix-medium flex-1' 
               onChangeText={formik.handleChange("name")} 
               onBlur={formik.handleBlur("name")}
              />
            </View>
            {formik.touched.name && formik.errors.name && (
              <Text className='text-red-500 text-sm mt-1 mb-4'>{formik.errors.name}</Text>
            )}

            {/* email */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-1 mt-4'>
              <Image source={icons.send}  className='size-5 ml-5'/>
              <TextInput 
               value={formik.values.email} 
               editable={!isPending} 
               placeholderTextColor="gray" 
               placeholder='📪 Email' 
               className='font-rubix-medium flex-1' 
               onChangeText={formik.handleChange("email")} 
               onBlur={formik.handleBlur("email")}
              />
            </View>
            {formik.touched.email && formik.errors.email && (
              <Text className='text-red-500 text-sm mt-1 mb-4'>{formik.errors.email}</Text>
            )}
          
            {/* phonenumber */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-1 mt-4'>
              <Image source={icons.phone}  className='size-5 ml-5'/>
              <TextInput 
                value={formik.values.phoneNumber} 
                editable={!isPending} 
                placeholderTextColor="gray" 
                placeholder='📵 Phone' 
                className='font-rubix-medium flex-1' 
                onChangeText={formik.handleChange("phoneNumber")} 
                onBlur={formik.handleBlur("phoneNumber")}
              />
            </View>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Text className='text-red-500 text-sm mt-1 mb-4'>{formik.errors.phoneNumber}</Text>
            )}
            {/* Address */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-1 mt-4'>
              <Image source={icons.location}  className='size-5 ml-5'/>
              <TextInput 
                value={formik.values.address} 
                editable={!isPending} 
                placeholderTextColor="gray" 
                placeholder='Home Address' 
                className='font-rubix-medium flex-1' 
                onChangeText={formik.handleChange("address")} 
                onBlur={formik.handleBlur("address")}
              />
            </View>
            {formik.touched.address && formik.errors.address && (
              <Text className='text-red-500 text-sm mt-1 mb-4'>{formik.errors.address}</Text>
            )}
            {/* password */}
            <View className='bg-white py-3 rounded-full flex flex-row items-center mb-1 mt-4'>
              <Image source={icons.shield} className='size-5 ml-5' />
              <TextInput
                value={formik.values.password}
                editable={!isPending}
                secureTextEntry={!passvisible}
                placeholderTextColor="gray"
                placeholder='🔑 Password'
                className='font-rubix-medium flex-1'
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
              />
              <TouchableOpacity
                onPress={() => setPassVisible(!passvisible)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Image
                  source={passvisible ? icons.eye : icons.eyeOff}
                  className='size-6 mr-5'
                />
              </TouchableOpacity>
            </View>
            {formik.touched.password && formik.errors.password && (
              <Text className='text-red-500 text-sm mt-1 mb-4'>{formik.errors.password}</Text>
            )}

            {/* confirm password */}
            <View className='bg-white py-3 rounded-full flex flex-row  items-center mb-1 mt-4'>
              <Image source={icons.shield}  className='size-5 ml-5'/>
              <TextInput 
                value={formik.values.confirmPassword}
                editable={!isPending} 
                secureTextEntry={!confirmPassVisible}
                placeholderTextColor="gray" 
                placeholder='🔑 Confirm password' 
                className='font-rubix-medium flex-1' 
                onChangeText={formik.handleChange("confirmPassword")} 
                onBlur={formik.handleBlur("confirmPassword")}
              />
              <TouchableOpacity onPress={()=> setConfirmPassVisible(!confirmPassVisible)}>
                <Image source={confirmPassVisible ? icons.eye : icons.eyeOff} className='size-5 mr-5'/>
              </TouchableOpacity>
            </View>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <Text className='text-red-500 text-sm mt-1 mb-4'>{formik.errors.confirmPassword}</Text>
            )}
          </View>
          {/* register */}
          <View className='flex justify-center items-center mt-5 '>
            <TouchableOpacity className='bg-blue-950 w-full py-5 rounded-full' onPress={handleRegister}>
                {isPending ? <ActivityIndicator/> : <Text className='text-white text-center'>CREATE ACCOUNT</Text>}
            </TouchableOpacity>     
          </View>
          <View className='flex items-center  justify-center mt-12'>
            <Text className='text-xl'>Already have an account? <Link href="/Login" className='font-rubik-extrabold font-bold text-blue-950'>Login here</Link></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register