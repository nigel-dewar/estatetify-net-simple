import { IAgencyModel } from './IAgencyModel';
import { IAgentModel } from './IAgentModel';

export interface ListingModel {
  id: string;
  propertyId: string;
  dateCreated?: string;
  dateListingExpires?: string;
  active: boolean;
  price: number | null;
  listingType: string; // rent , buy , action etc
  isPremium: boolean;
  userName: string;
  userId: string; // userId
  isListedByAgent: boolean;
  isPrivateSeller: boolean;
  agencyId?: string;
  agentId?: string;
};
