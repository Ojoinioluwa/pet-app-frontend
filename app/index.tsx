import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/LandingPage" className="px-2 py-3 text-white text-2xl bg-blue-950 mb-3">Landing</Link>
      <Link href="/Login" className="px-2 py-3 text-white text-2xl bg-blue-950 mb-3">Login</Link>
      <Link href="/AddPet" className="px-2 py-3 text-white text-2xl bg-blue-950 mb-3">Add pet</Link>
      <Link href="/AddHealthRecord" className="px-2 py-3 text-white text-2xl bg-blue-950 mb-3">Add Health record</Link>
      <Link href="/PetInfo" className="px-2 py-3 text-white text-2xl bg-blue-950 mb-3">Pet info</Link>
      <Link href="/Settings" className="px-2 py-3 text-white text-2xl bg-blue-950 mb-3">Settings</Link>
      <Link href="/AddReminder" className="px-2 py-3 text-white text-2xl bg-blue-950 mb-3">Add reminder</Link>

    </View>
  );
}
