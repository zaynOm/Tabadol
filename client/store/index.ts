import { create } from "zustand";
export const useLocationStore = create<LocationStore>((set) => ({
  userLocation: {
    Academy: { id: "", name: "" },
    Province: { id: "", name: "" },
    Commune: { id: "", name: "" },
    School: "",
  },

  destinationLocation: {
    Academy: { id: "", name: "" },
    Province: { id: "", name: "" },
    Commune: { id: "", name: "" },
    School: "",
  },

  post: null,
  speciality: null,

  setPost: (post: string) => set({ post }),
  setSpeciality: (speciality: string) => set({ speciality }),

  setUserLocation: (
    field: string,
    value: { id: string; name: string } | string
  ) =>
    set((state) => ({
      userLocation: {
        ...state.userLocation,
        [field]: value,
      },
    })),

  setDestinationLocation: (
    field: string,
    value: { id: string; name: string } | string
  ) =>
    set((state) => ({
      destinationLocation: {
        ...state.destinationLocation,
        [field]: value,
      },
    })),
}));

export const useCommuneStore = create<CommuneStore>((set) => ({
  communes: [],
  setCommunes: (communes: { id: string; name: string }[]) => set({ communes }),
}));
