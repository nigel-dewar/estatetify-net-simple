import { PropertyTypeModel } from './PropertyTypeModel';

export interface PropertyDetailsModel {
  propertyType: number | null;
  description: string | null;
  bedRooms: number | null;
  bathRooms: number | null;
  parkingSpaces: number | null;
  landSize: number | null;
}
