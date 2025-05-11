import icons from '@/constants/icons'
import images from '@/constants/images'
import { Link } from 'expo-router'
import { useFormik } from 'formik'
import React from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'

// TODO: add login functions
// TODO: add the correct icons for the text field
const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})


const Login = () => {  
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values)=> {
      console.log("Login")
    }
  })

  return (
    <SafeAreaView className='flex-1 bg-white' >
      <ScrollView>
        <View className='px-2 pt-10'>
          {/* Login Image */}
          <Image source={images.Login} resizeMode='contain' className='w-full h-[300]'/>
          <Text className='font-rubik-bold text-3xl text-center font-bold mt-5'>Welcome Back!</Text>
          <Text className='font-rubix-light text-gray-400 text-center mt-2 text-xl'>Login into your existing account</Text>
          {/* form section */}
          <View className='p-5 mt-2'>
              {/* Email */}
              <View className="w-full py-3 px-4 bg-gray-50 rounded-full mb-5 flex-row items-center">
              <Image source={icons.send} className="w-5 h-5" />
                <TextInput 
                placeholder="📧 Enter your Email here" 
                placeholderTextColor="gray" 
                className="text-sm font-rubik text-black-300 ml-2"
                style={{ flex: 1 }} 
                {...formik.getFieldProps('email')}
                />
            </View>
              {/* password */}
              <View className="w-full py-3 px-4 bg-gray-50 rounded-full mb-2 flex-row items-center">
              <Image source={icons.shield} className="w-5 h-5" />
                <TextInput 
                placeholder="🔑 Enter your password here" 
                placeholderTextColor="gray" 
                className="text-sm font-rubik text-black-300 ml-2"
                style={{ flex: 1 }} 
                secureTextEntry
                {...formik.getFieldProps('password')}
                />
            </View>

            {/* forgot passowrd */}
            <View className='flex  items-end'>
            <Link href="/ForgotPassword" className='font-rubik-extrabold font-bold text-base '>Forgot password?</Link>
            </View>
            {/* login button */}
            <View className='flex justify-center items-center mt-3'>
              <TouchableOpacity className='px-3 py-4 rounded-3xl  w-full mt-3 bg-blue-950' onPress={()=>formik.handleSubmit}>
                  <Text className='text-white text-center font-rubik-extrabold font-bold text-xl '>Login</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>    
  )
}

export default Login