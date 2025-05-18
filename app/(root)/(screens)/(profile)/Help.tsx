import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

const HelpPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-5 pt-10">
      <ScrollView>
        <Text className="text-3xl text-blue-900 font-bold text-center">Help Center</Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">Introduction</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
        </Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">How to Use the App</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
        </Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">Frequently Asked Questions</Text>
        
        <Text className="mt-2 text-gray-700">
          <Text className="font-semibold">Q: How do I add a pet?</Text>
          {'\n'}
          A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
        </Text>

        <Text className="mt-5 text-gray-700">
          <Text className="font-semibold">Q: How can I update my profile?</Text>
          {'\n'}
          A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent libero. Fusce nec tellus sed augue semper porta. Mauris massa. 
        </Text>

        <Text className="mt-5 text-gray-700">
          <Text className="font-semibold">Q: What should I do if I forgot my password?</Text>
          {'\n'}
          A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum nulla eu mauris malesuada. Sed nec diam volutpat, cursus risus eget, feugiat mi.
        </Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">Contact Support</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
        </Text>
        <Text className="mt-2 text-blue-600">support@pettrackerapp.com</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpPage;
