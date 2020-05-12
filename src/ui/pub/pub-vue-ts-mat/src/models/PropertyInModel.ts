export interface PropertyInModel {
  id?: string;
  PropertyTypeId: number;
  Description: string;
  Bedrooms: number;
  Bathrooms: number;
  ParkingSpaces: number;
  LandSize: number;
  StreetNumber: string;
  Route: string;
  Locality: string;
  PostCode: number;
  AdministrativeAreaLevel1: string;
  AdministrativeAreaLevel2: string;
  State: string;
  Country: string;
  images?: string[];
}
