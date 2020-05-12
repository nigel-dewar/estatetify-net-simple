
export interface PropertyModel {
  id?: string;
  name?: string;
  slug?: string;
  suburb?: string;
  suburbSlug?: string;
  streetNumber?: string;
  route?: string;
  locality?: string;
  postCode?: number | null;
  administrativeAreaLevel1?: string;
  administrativeAreaLevel2?: string;
  state?: string;
  country?: string;
  mainImage?: string;
  propertyTypeId?: number | null;
  description: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  parkingSpaces?: number | null;
  landSize?: number | null;
  isActive?: boolean | null;
  isForSale?: boolean | null;
  isForRent?: boolean | null;
  isForAuction?: boolean | null;
  buyPrice?: number | null;
  rentPrice?: number | null;
  propertyType?: any | null;
  availableDate?: string;
  propertyFeatures?: string[];
  propertyOffers?: any[];
  listings?: any[];
  images?: any[];
}
