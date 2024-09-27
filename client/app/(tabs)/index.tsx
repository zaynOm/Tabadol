import { useAxiosFetch } from "@/hooks/useAxiosFetch";
import { DemandPopulated } from "@/types/demand";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

dayjs.extend(relativeTime);

const Badge = ({ text }: { text: string }) => {
  return (
    <View className="px-2 py-1 border border-indigo-700 rounded-md w-fit mr-auto mt-2">
      <Text className="">{text}</Text>
    </View>
  );
};

const DemandItem = ({ item }: { item: DemandPopulated }) => {
  return (
    <View className="mt-4 bg-white p-4 rounded-md">
      <Text className="text-lg">{item.userId.post}</Text>
      <Text>
        Current: {item.userId.location.academy?.name},{" "}
        {item.userId.location.province.name},{" "}
        {item.userId.location.commune.name}
      </Text>
      <Text>
        Desired: {item.desiredLocation.academy?.name},{" "}
        {item.desiredLocation.province.name},{" "}
        {item.desiredLocation.commune.name}
      </Text>
      <View className="flex-row justify-between items-baseline">
        <Badge text={item.userId.speciality}></Badge>
        <Text>{dayjs(item.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

const Home = () => {
  const { data, loading, error, fetchData } =
    useAxiosFetch<DemandPopulated[]>();

  useEffect(() => {
    fetchData("/demands");
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        className="flex-1 justify-center items-center"
        size="large"
      />
    );

  if (error)
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchData("/demands")}
          />
        }
      >
        <Text>{error}</Text>
      </ScrollView>
    );
  // TODO: dismiss keyboard when taping outside the search bar
  return (
    <SafeAreaView className="relative flex-1 px-6">
      <View className="flex-row justify-between items-center space-x-2">
        <View className="flex-1 flex-row items-center border-2 space-x-2 border-gray-800 rounded-xl p-2 mt-2">
          <Ionicons name="search" size={24} color="gray" className="mt-0" />
          <TextInput placeholder="Search" className="flex-1" />
        </View>
        <TouchableOpacity onPress={() => router.push("/(search)")}>
          <Ionicons name="options" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <DemandItem item={item} />}
        onRefresh={() => fetchData("/demands")}
        refreshing={loading}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 70,
        }}
        ListEmptyComponent={() => (
          <Text className="font-medium">No demands found</Text>
        )}
      />
      <TouchableOpacity
        className="absolute bottom-0 right-0 p-4"
        onPress={() => router.push("/new-demand")}
      >
        <Ionicons name="add-circle" size={48} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
