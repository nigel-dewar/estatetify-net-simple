
export interface IProperty {
    id?: string;
    name?: string;
    slug?: string;
    suburb?: string;
    suburbSlug?: string;
    streetNumber?: string;
    route?: string;
    locality?: string;
    postCode?: string;
    administrativeAreaLevel1?: string;
    administrativeAreaLevel2?: string;
    state?: string;
    country?: string;
    mainImage?: string;
    propertyTypeId?: number;
    description: string;
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    landSize?: number;
    isActive?: boolean;
    isForSale?: boolean;
    isForRent?: boolean;
    isForAuction?: boolean;
    buyPrice?: number;
    rentPrice?: number;
    propertyType?: string;
    availableDate?: Date;
    propertyFeatures?: string[];
    propertyOffers?: any[];
    listings?: any[];
    images?: any[];
    activities?: any[]
}

export interface IPropertyFormValues extends Partial<IProperty>{
    time?: Date
}

export class PropertyFormValues implements IPropertyFormValues {
    id?: string = undefined;
    name: string =  '';
    suburb: string = '';
    postCode: string = '';
    availableDate?: Date = undefined;
    description: string = '';
    propertyTypeId?: number = undefined;
    bedrooms?: number = undefined;
    bathrooms?: number = undefined;
    parkingSpaces?: number = undefined;
    landSize?: number = undefined;
    streetNumber: string = '';
    route: string = '';
    locality: string = '';
    country: string = '';

    /**
     *
     */
    constructor(init?: IPropertyFormValues) {
        if (init && init.availableDate) {
            
        }
        Object.assign(this, init);

    }
}