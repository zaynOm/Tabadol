declare type LocationStore = {
  userLocation: {
    Academy: { id: string; name: string } | null;
    Province: { id: string; name: string } | null;
    Commune: { id: string; name: string } | null;
    School: string | null;
  };

  destinationLocation: {
    Academy: { id: string; name: string } | null;
    Province: { id: string; name: string } | null;
    Commune: { id: string; name: string } | null;
    School: string | null;
  };

  post: string | null;
  speciality: string | null;

  setPost: (post: string) => void;
  setSpeciality: (speciality: string) => void;

  setUserLocation: (
    field: string,
    value: { id: string; name: string } | string
  ) => void;

  setDestinationLocation: (
    field: string,
    value: { id: string; name: string } | string
  ) => void;
};

declare type CommuneStore = {
  communes: { id: string; name: string }[];
  setCommunes: (communes: { id: string; name: string }[]) => void;
};
