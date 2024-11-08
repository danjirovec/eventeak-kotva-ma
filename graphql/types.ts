import type * as Types from './schema.types';

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateOneUserInput;
}>;

export type UpdateUserMutation = {
  updateOneUser: Pick<
    Types.User,
    'email' | 'firstName' | 'lastName' | 'placeOfResidence'
  > & { defaultBusiness?: Types.Maybe<Pick<Types.Business, 'id' | 'name'>> };
};

export type UpdateUserPasswordMutationVariables = Types.Exact<{
  input: Types.UpdatePassword;
}>;

export type UpdateUserPasswordMutation = Pick<Types.Mutation, 'updatePassword'>;

export type CreateTicketMutationVariables = Types.Exact<{
  input: Types.CreateOneTicketInput;
}>;

export type CreateTicketMutation = {
  createOneTicket: Pick<Types.Ticket, 'price' | 'validated'> & {
    order?: Types.Maybe<Pick<Types.Order, 'id'>>;
    discount?: Types.Maybe<Pick<Types.Discount, 'id'>>;
    seat?: Types.Maybe<Pick<Types.Seat, 'id'>>;
    user?: Types.Maybe<Pick<Types.User, 'id'>>;
    event: Pick<Types.Event, 'id'>;
  };
};

export type CreateTicketsMutationVariables = Types.Exact<{
  input: Types.CreateTicketOrder;
}>;

export type CreateTicketsMutation = { createTickets: Pick<Types.Event, 'id'> };

export type UpdateEventMutationVariables = Types.Exact<{
  input: Types.UpdateEvent;
}>;

export type UpdateEventMutation = {
  updateEvent: Pick<
    Types.Event,
    | 'id'
    | 'name'
    | 'category'
    | 'date'
    | 'length'
    | 'description'
    | 'subtitles'
    | 'language'
    | 'posterUrl'
  > & {
    venue: Pick<Types.Venue, 'id' | 'name'>;
    eventTemplate: Pick<Types.EventTemplate, 'id' | 'name'>;
    business: Pick<Types.Business, 'id' | 'name'>;
  };
};

export type EventsListQueryVariables = Types.Exact<{
  filter: Types.EventFilter;
  sorting?: Types.InputMaybe<Array<Types.EventSort> | Types.EventSort>;
  paging: Types.OffsetPaging;
}>;

export type EventsListQuery = {
  events: Pick<Types.EventConnection, 'totalCount'> & {
    nodes: Array<
      Pick<
        Types.Event,
        | 'id'
        | 'category'
        | 'created'
        | 'name'
        | 'length'
        | 'venueData'
        | 'description'
        | 'posterUrl'
        | 'language'
        | 'subtitles'
        | 'date'
      > & {
        eventTemplate: Pick<Types.EventTemplate, 'id'>;
        business: Pick<Types.Business, 'id'>;
        venue: Pick<
          Types.Venue,
          'id' | 'name' | 'street' | 'buildingNumber' | 'city' | 'hasSeats'
        >;
      }
    >;
  };
};

export type EventPriceCategoryListQueryVariables = Types.Exact<{
  filter: Types.EventPriceCategoryFilter;
  sorting?: Types.InputMaybe<
    Array<Types.EventPriceCategorySort> | Types.EventPriceCategorySort
  >;
  paging: Types.OffsetPaging;
}>;

export type EventPriceCategoryListQuery = {
  eventPriceCategories: Pick<
    Types.EventPriceCategoryConnection,
    'totalCount'
  > & {
    nodes: Array<
      Pick<
        Types.EventPriceCategory,
        'id' | 'name' | 'price' | 'startDate' | 'endDate'
      > & { section: Pick<Types.Section, 'id' | 'name'> }
    >;
  };
};

export type PricesListQueryVariables = Types.Exact<{
  filter: Types.EventPriceCategoryFilter;
  sorting?: Types.InputMaybe<
    Array<Types.EventPriceCategorySort> | Types.EventPriceCategorySort
  >;
  paging: Types.OffsetPaging;
  meta: Types.Scalars['String']['input'];
}>;

export type PricesListQuery = {
  getEventPrices: Pick<Types.EventPriceCategoryAvailable, 'counts'> & {
    nodes: Array<
      Pick<
        Types.EventPriceCategory,
        'id' | 'name' | 'price' | 'startDate' | 'endDate'
      > & { section: Pick<Types.Section, 'id' | 'name' | 'capacity'> }
    >;
  };
};

export type UserProfileQueryVariables = Types.Exact<{
  filter: Types.UserFilter;
  sorting?: Types.InputMaybe<Array<Types.UserSort> | Types.UserSort>;
  paging: Types.OffsetPaging;
  meta: Types.Scalars['String']['input'];
}>;

export type UserProfileQuery = {
  profileInfo: Pick<
    Types.UserProfile,
    | 'id'
    | 'email'
    | 'placeOfResidence'
    | 'avatarUrl'
    | 'firstName'
    | 'lastName'
    | 'birthDate'
    | 'created'
    | 'eventsVisited'
    | 'membershipPoints'
    | 'benefitsUsed'
  >;
};

export type BenefitsAndMembershipQueryVariables = Types.Exact<{
  filter: Types.BenefitFilter;
  sorting?: Types.InputMaybe<Array<Types.BenefitSort> | Types.BenefitSort>;
  paging: Types.OffsetPaging;
  meta: Types.Scalars['String']['input'];
}>;

export type BenefitsAndMembershipQuery = {
  getUserBenefits: Pick<Types.UserBenefits, 'membershipPoints'> & {
    available: Array<
      Pick<
        Types.Benefit,
        'expiryDate' | 'name' | 'points' | 'description' | 'id'
      >
    >;
    unavailable: Array<
      Pick<
        Types.Benefit,
        'expiryDate' | 'name' | 'points' | 'description' | 'id'
      >
    >;
    used: Array<
      Pick<
        Types.Benefit,
        'expiryDate' | 'name' | 'points' | 'description' | 'id'
      >
    >;
  };
};

export type DiscountsListQueryVariables = Types.Exact<{
  filter: Types.DiscountFilter;
  sorting?: Types.InputMaybe<Array<Types.DiscountSort> | Types.DiscountSort>;
  paging: Types.OffsetPaging;
}>;

export type DiscountsListQuery = {
  discounts: Pick<Types.DiscountConnection, 'totalCount'> & {
    nodes: Array<
      Pick<Types.Discount, 'id' | 'name' | 'percentage'> & {
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
};

export type TicketsListQueryVariables = Types.Exact<{
  filter: Types.TicketFilter;
  sorting?: Types.InputMaybe<Array<Types.TicketSort> | Types.TicketSort>;
  paging: Types.OffsetPaging;
}>;

export type TicketsListQuery = {
  tickets: Pick<Types.TicketConnection, 'totalCount'> & {
    nodes: Array<
      Pick<Types.Ticket, 'id' | 'price' | 'validated' | 'created'> & {
        discount?: Types.Maybe<Pick<Types.Discount, 'id' | 'name'>>;
        user?: Types.Maybe<Pick<Types.User, 'id' | 'firstName' | 'lastName'>>;
        event: Pick<Types.Event, 'id' | 'name' | 'date'> & {
          venue: Pick<Types.Venue, 'id' | 'name'>;
        };
        seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'row' | 'seat'>>;
        section: Pick<Types.Section, 'id' | 'name'>;
        order?: Types.Maybe<Pick<Types.Order, 'id'>>;
      }
    >;
  };
};

export type UserTicketsListQueryVariables = Types.Exact<{
  filter: Types.TicketFilter;
  sorting?: Types.InputMaybe<Array<Types.TicketSort> | Types.TicketSort>;
  paging: Types.OffsetPaging;
}>;

export type UserTicketsListQuery = {
  getUserTickets: {
    valid: Array<
      Pick<Types.UserTickets, 'id'> & {
        ticketSet: Array<
          Pick<Types.Ticket, 'id' | 'created' | 'price' | 'validated'> & {
            business: Pick<Types.Business, 'id' | 'name'>;
            discount?: Types.Maybe<Pick<Types.Discount, 'id' | 'name'>>;
            event: Pick<Types.Event, 'id' | 'name' | 'date'> & {
              venue: Pick<Types.Venue, 'id' | 'name'>;
            };
            seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'seat' | 'row'>>;
            section: Pick<Types.Section, 'id' | 'name'>;
            user?: Types.Maybe<Pick<Types.User, 'id'>>;
          }
        >;
      }
    >;
    invalid: Array<
      Pick<Types.UserTickets, 'id'> & {
        ticketSet: Array<
          Pick<Types.Ticket, 'id' | 'created' | 'price' | 'validated'> & {
            business: Pick<Types.Business, 'id' | 'name'>;
            discount?: Types.Maybe<Pick<Types.Discount, 'id' | 'name'>>;
            event: Pick<Types.Event, 'id' | 'name' | 'date'> & {
              venue: Pick<Types.Venue, 'id' | 'name'>;
            };
            seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'seat' | 'row'>>;
            section: Pick<Types.Section, 'id' | 'name'>;
            user?: Types.Maybe<Pick<Types.User, 'id'>>;
          }
        >;
      }
    >;
  };
};

export type MembershipsListQueryVariables = Types.Exact<{
  filter: Types.MembershipFilter;
  sorting?: Types.InputMaybe<
    Array<Types.MembershipSort> | Types.MembershipSort
  >;
  paging: Types.OffsetPaging;
}>;

export type MembershipsListQuery = {
  memberships: {
    nodes: Array<
      Pick<Types.Membership, 'id' | 'points' | 'expiryDate'> & {
        user: Pick<Types.User, 'id'>;
        membershipType?: Types.Maybe<Pick<Types.MembershipType, 'id' | 'name'>>;
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
};
