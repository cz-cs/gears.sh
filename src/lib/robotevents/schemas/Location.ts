export type Coordinates = {
  lat?: number;
  lon?: number;
};

export type Location = {
  venue?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  region?: string;
  postcode?: string;
  country?: string;
  coordinates?: Coordinates;
};
