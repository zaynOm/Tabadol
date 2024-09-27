import { posts } from "@/constants";
import { useAxiosFetch } from "@/hooks/useAxiosFetch";
import { useCommuneStore, useLocationStore } from "@/store";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";

const Location = () => {
  const navigation = useNavigation();
  const { selectionType, locationType } = useLocalSearchParams();
  const { data: axiosData, loading, error, fetchData } = useAxiosFetch();
  const { communes, setCommunes } = useCommuneStore();
  const [
    userLocation,
    setUserLocation,
    destinationLocation,
    setDestinationLocation,
    setPost,
  ] = useLocationStore(
    useShallow((state) => [
      state.userLocation,
      state.setUserLocation,
      state.destinationLocation,
      state.setDestinationLocation,
      state.setPost,
    ])
  );
  const data =
    selectionType === "Commune"
      ? communes
      : selectionType === "Post"
      ? posts
      : axiosData;

  useEffect(() => {
    navigation.setOptions({ title: selectionType });

    const academyId =
      locationType === "current"
        ? userLocation.Academy?.id
        : destinationLocation.Academy?.id;

    if (selectionType === "Academy") {
      fetchData("/academies");
    } else if (selectionType === "Province") {
      fetchData(`/academies/${academyId}/provinces`);
    }
  }, [selectionType]);

  const handleSelection = (item: any) => {
    if (selectionType === "Post") {
      setPost(item.name);
    } else if (locationType === "current") {
      setUserLocation(selectionType as string, {
        id: item._id,
        name: item.name,
      });
    } else {
      setDestinationLocation(selectionType as string, {
        id: item._id,
        name: item.name,
      });
    }
    if (selectionType === "Province") {
      setCommunes(item.communes);
    }
    router.back();
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!data) {
    return <Text>No data available</Text>;
  }

  return (
    <ScrollView
      className="flex-1 p-4 space-y-4"
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      {data.map((item: any) => (
        <TouchableOpacity key={item._id} onPress={() => handleSelection(item)}>
          <Text className="text-l font-semibold">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Location;
