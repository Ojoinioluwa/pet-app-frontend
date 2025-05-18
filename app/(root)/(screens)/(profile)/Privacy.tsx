import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

const PrivacyPolicyPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-5 pt-10">
      <ScrollView>
        <Text className="text-3xl text-blue-900 font-bold text-center">Privacy Policy</Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">Introduction</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        </Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">Information We Collect</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum nulla eu mauris malesuada, eget volutpat augue mollis. Sed nec diam volutpat, cursus risus eget, feugiat mi. Vivamus pellentesque orci in dolor elementum, sit amet fermentum nunc auctor.
        </Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">How We Use Your Information</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
        </Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">Data Protection</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum nulla eu mauris malesuada, eget volutpat augue mollis. Sed nec diam volutpat, cursus risus eget, feugiat mi. Vivamus pellentesque orci in dolor elementum, sit amet fermentum nunc auctor.
        </Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">Changes to This Policy</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet orci vitae turpis sodales tincidunt eu id nulla. Suspendisse sit amet diam at libero tempus cursus. Nullam tristique nibh ut sapien laoreet, non accumsan erat blandit.
        </Text>

        <Text className="text-xl mt-5 text-blue-900 font-semibold">Contact Us</Text>
        <Text className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyPage;
