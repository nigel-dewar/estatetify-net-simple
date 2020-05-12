export type Dictionary<T> = { [key: string]: T };

export interface IProperty {
  id: string;
  name: string;
  slug: string;
  suburb: string;
  suburbSlug: string;
  state: string;
  thumbnail: string;
  mainImage: string;
  shortDescription: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  landSize: number;
  postCode: number;
  isActive: boolean;
  isForSale: boolean;
  isForRent: boolean;
  isForAuction: boolean;
  buyPrice: number;
  rentPrice: number;
  propertyTypeId: number;
  propertyType: any;
  availableDate: string;
  propertyFeatures: any[];
  propertyOffers: any[];
  listings: any[];
  images: any[];
}

export interface IFeature {
  name: string;
  outdoor: boolean;
}

export interface IResultPropertiesDTO {
  total: number;
  properties: IProperty[];
  availablePages: number;
  currentPageNumber: number;
}

export interface IQueryParams {
  bathRooms: string;
  bedRooms: string;
  features: string;
  minPrice: string;
  maxPrice: string;
  mode: string;
  parking: string;
  page: string;
  propertyTypes: string;
  suburbs: string;
}

export interface IFilters {
  bathRooms: number[];
  bedRooms: number[];
  features: ICheckBox[];
  minPrice: number;
  maxPrice: number;
  parking: number[];
  propertyTypes: ICheckBox[];
  suburbs: string[];
}

export interface IQueryParamsDictory {
  bathRooms?: string;
  bedRooms?: string;
  features?: string;
  minPrice?: string;
  maxPrice?: string;
  mode?: string;
  parking?: string;
  page?: string;
  propertyTypes?: string;
  suburbs?: string;
}

export interface IMenuItem {
  title: string;
  action: string;
  active: boolean;
  subMenuItems: { title: string; action: string }[];
}

export interface ICheckBox {
  name: string;
  checked: boolean;
}

export interface ISuburb {
  id: number;
  label: string;
  locality: string;
  postCode: number;
  state: string;
  suburb: string;
}
