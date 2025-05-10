import HealthRecordCard from '@/components/HealthRecordCard'
import images from '@/constants/images'
import React from 'react'
import { ScrollView } from 'react-native'

const AllHealthRecords = () => {
  return (
    <ScrollView className="bg-gray-100 p-4 flex-1">
      <HealthRecordCard
        type="Vaccination"
        title="Rabies Vaccination"
        description="Annual rabies vaccination for dogs."
        date="2023-10-01"
        veterinarian="Dr. Smith"
        cost={5000}
        pet={{
          name: 'Buddy',
          avatarUri: images.LandingPage,
        }}
        id="1"
        />
      <HealthRecordCard
        type="Vaccination"
        title="Rabies Vaccination"
        description="Annual rabies vaccination for dogs."
        date="2023-10-01"
        veterinarian="Dr. Smith"
        cost={5000}
        pet={{
          name: 'Buddy',
          avatarUri: images.LandingPage,
        }}
        id="1"
        />
      <HealthRecordCard
        type="Vaccination"
        title="Rabies Vaccination"
        description="Annual rabies vaccination for dogs."
        date="2023-10-01"
        veterinarian="Dr. Smith"
        cost={5000}
        pet={{
          name: 'Buddy',
          avatarUri: images.LandingPage,
        }}
        id="1"
        />
      <HealthRecordCard
        type="Vaccination"
        title="Rabies Vaccination"
        description="Annual rabies vaccination for dogs."
        date="2023-10-01"
        veterinarian="Dr. Smith"
        cost={5000}
        pet={{
          name: 'Buddy',
          avatarUri: images.LandingPage,
        }}
        id="1"
        />
      <HealthRecordCard
        type="Vaccination"
        title="Rabies Vaccination"
        description="Annual rabies vaccination for dogs."
        date="2023-10-01"
        veterinarian="Dr. Smith"
        cost={5000}
        pet={{
          name: 'Buddy',
          avatarUri: images.LandingPage,
        }}
        id="1"
        />
      <HealthRecordCard
        type="Vaccination"
        title="Rabies Vaccination"
        description="Annual rabies vaccination for dogs."
        date="2023-10-01"
        veterinarian="Dr. Smith"
        cost={5000}
        pet={{
          name: 'Buddy',
          avatarUri: images.LandingPage,
        }}
        id="1"
        />
    </ScrollView>
  )
}

export default AllHealthRecords