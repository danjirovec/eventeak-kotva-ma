import type * as Types from './schema.types';

export type AnonymizeUserMutationVariables = Types.Exact<{
  input: Types.AnonymizeUser;
}>;

export type AnonymizeUserMutation = Pick<Types.Mutation, 'anonymizeUser'>;

export type PaymentMutationVariables = Types.Exact<{
  input: Types.CreatePayment;
}>;

export type PaymentMutation = {
  payment: Pick<Types.Payment, 'publishableKey' | 'clientSecret' | 'paymentId'>;
};

export type UpdateUserPasswordMutationVariables = Types.Exact<{
  input: Types.UpdatePassword;
}>;

export type UpdateUserPasswordMutation = Pick<Types.Mutation, 'updatePassword'>;

export type UpdateUserAvatarMutationVariables = Types.Exact<{
  input: Types.UpdateOneUserInput;
}>;

export type UpdateUserAvatarMutation = {
  updateOneUser: Pick<Types.User, 'avatarUrl'>;
};

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateOneUserInput;
}>;

export type UpdateUserMutation = {
  updateOneUser: Pick<
    Types.User,
    'firstName' | 'lastName' | 'email' | 'placeOfResidence'
  >;
};

export type CreateMembershipMutationVariables = Types.Exact<{
  input: Types.CreateMembership;
}>;

export type CreateMembershipMutation = {
  createMembership: Pick<
    Types.Membership,
    'id' | 'points' | 'state' | 'expiryDate'
  >;
};

export type UpdateMembershipMutationVariables = Types.Exact<{
  input: Types.UpdateOneMembershipInput;
}>;

export type UpdateMembershipMutation = {
  updateOneMembership: Pick<
    Types.Membership,
    'id' | 'points' | 'state' | 'expiryDate'
  >;
};

export type CreateTicketMutationVariables = Types.Exact<{
  input: Types.CreateOneTicketInput;
}>;

export type CreateTicketMutation = {
  createOneTicket: Pick<Types.Ticket, 'price' | 'validated'> & {
    order?: Types.Maybe<Pick<Types.Order, 'id'>>;
    discount?: Types.Maybe<Pick<Types.Discount, 'id'>>;
    seat?: Types.Maybe<Pick<Types.Seat, 'id'>>;
    row?: Types.Maybe<Pick<Types.Row, 'id'>>;
    user?: Types.Maybe<Pick<Types.User, 'id'>>;
    event: Pick<Types.Event, 'id'>;
  };
};

export type CreateTicketsMutationVariables = Types.Exact<{
  input: Types.CreateTicketOrder;
}>;

export type CreateTicketsMutation = {
  createTickets: Pick<Types.Event, 'id' | 'name' | 'date' | 'seatMap'> & {
    template: Pick<Types.Template, 'id' | 'name' | 'category' | 'length'> & {
      business: Pick<Types.Business, 'id' | 'name'>;
      venue: Pick<Types.Venue, 'id' | 'name' | 'hasSeats'>;
    };
  };
};

export type UpdateEventMutationVariables = Types.Exact<{
  input: Types.UpdateEvent;
}>;

export type UpdateEventMutation = {
  updateEvent: Pick<Types.Event, 'id' | 'name' | 'date'> & {
    template: Pick<
      Types.Template,
      | 'id'
      | 'name'
      | 'length'
      | 'description'
      | 'subtitles'
      | 'language'
      | 'category'
      | 'posterUrl'
    > & { venue: Pick<Types.Venue, 'id' | 'name'> };
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
      Pick<Types.Event, 'id' | 'name' | 'created' | 'date' | 'seatMap'> & {
        template: Pick<
          Types.Template,
          | 'id'
          | 'name'
          | 'posterUrl'
          | 'language'
          | 'length'
          | 'description'
          | 'category'
          | 'subtitles'
        > & {
          venue: Pick<
            Types.Venue,
            'id' | 'name' | 'street' | 'buildingNumber' | 'city' | 'hasSeats'
          >;
        };
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
};

export type PriceCategoryListQueryVariables = Types.Exact<{
  filter: Types.PriceCategoryFilter;
  sorting?: Types.InputMaybe<
    Array<Types.PriceCategorySort> | Types.PriceCategorySort
  >;
  paging: Types.OffsetPaging;
}>;

export type PriceCategoryListQuery = {
  priceCategories: Pick<Types.PriceCategoryConnection, 'totalCount'> & {
    nodes: Array<
      Pick<
        Types.PriceCategory,
        'id' | 'name' | 'price' | 'startDate' | 'endDate'
      > & { section: Pick<Types.Section, 'id' | 'name'> }
    >;
  };
};

export type PricesListQueryVariables = Types.Exact<{
  filter: Types.PriceCategoryFilter;
  sorting?: Types.InputMaybe<
    Array<Types.PriceCategorySort> | Types.PriceCategorySort
  >;
  paging: Types.OffsetPaging;
  meta: Types.Scalars['String']['input'];
}>;

export type PricesListQuery = {
  getEventPrices: Pick<Types.PriceCategoryAvailable, 'counts'> & {
    nodes: Array<
      Pick<
        Types.PriceCategory,
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
    | 'eventsVisited'
    | 'benefitsUsed'
  > & {
    membership?: Types.Maybe<
      Pick<Types.Membership, 'id' | 'points' | 'expiryDate' | 'state'> & {
        user: Pick<Types.User, 'id' | 'email'>;
        membershipType: Pick<
          Types.MembershipType,
          'id' | 'name' | 'pointsPerTicket'
        >;
      }
    >;
  };
};

export type BenefitsAndMembershipQueryVariables = Types.Exact<{
  filter: Types.BenefitFilter;
  sorting?: Types.InputMaybe<Array<Types.BenefitSort> | Types.BenefitSort>;
  paging: Types.OffsetPaging;
  meta: Types.Scalars['String']['input'];
}>;

export type BenefitsAndMembershipQuery = {
  getUserBenefits: Pick<
    Types.UserBenefits,
    'membershipPoints' | 'membership'
  > & {
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

export type BusinessesListQueryVariables = Types.Exact<{
  filter: Types.BusinessFilter;
  sorting?: Types.InputMaybe<Array<Types.BusinessSort> | Types.BusinessSort>;
  paging: Types.OffsetPaging;
}>;

export type BusinessesListQuery = {
  businesses: Pick<Types.BusinessConnection, 'totalCount'> & {
    nodes: Array<Pick<Types.Business, 'id' | 'name' | 'currency'>>;
  };
};

export type TemplateDiscountsListQueryVariables = Types.Exact<{
  filter: Types.TemplateDiscountFilter;
  sorting?: Types.InputMaybe<
    Array<Types.TemplateDiscountSort> | Types.TemplateDiscountSort
  >;
  paging: Types.OffsetPaging;
}>;

export type TemplateDiscountsListQuery = {
  templateDiscounts: {
    nodes: Array<{
      discount: Pick<Types.Discount, 'id' | 'name' | 'percentage'>;
      template: Pick<Types.Template, 'id' | 'name'>;
    }>;
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
        user?: Types.Maybe<
          Pick<Types.User, 'id' | 'firstName' | 'lastName' | 'email'>
        >;
        event: Pick<Types.Event, 'id' | 'name' | 'date'> & {
          template: Pick<Types.Template, 'id' | 'name'> & {
            venue: Pick<Types.Venue, 'id' | 'name'>;
          };
        };
        seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'name'>>;
        row?: Types.Maybe<Pick<Types.Row, 'id' | 'name'>>;
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
              template: Pick<Types.Template, 'id' | 'name'> & {
                venue: Pick<Types.Venue, 'id' | 'name' | 'hasSeats'>;
              };
            };
            seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'name'>>;
            row?: Types.Maybe<Pick<Types.Row, 'id' | 'name'>>;
            section: Pick<Types.Section, 'id' | 'name'>;
            user?: Types.Maybe<Pick<Types.User, 'id' | 'email'>>;
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
              template: Pick<Types.Template, 'id' | 'name'> & {
                venue: Pick<Types.Venue, 'id' | 'name' | 'hasSeats'>;
              };
            };
            seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'name'>>;
            row?: Types.Maybe<Pick<Types.Row, 'id' | 'name'>>;
            section: Pick<Types.Section, 'id' | 'name'>;
            user?: Types.Maybe<Pick<Types.User, 'id' | 'email'>>;
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
        membershipType: Pick<Types.MembershipType, 'id' | 'name'>;
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
};

export type MembershipTypesListQueryVariables = Types.Exact<{
  filter: Types.MembershipTypeFilter;
  sorting?: Types.InputMaybe<
    Array<Types.MembershipTypeSort> | Types.MembershipTypeSort
  >;
  paging: Types.OffsetPaging;
}>;

export type MembershipTypesListQuery = {
  membershipTypes: {
    nodes: Array<
      Pick<
        Types.MembershipType,
        'id' | 'name' | 'description' | 'pointsPerTicket' | 'price'
      > & { business: Pick<Types.Business, 'id'> }
    >;
  };
};

export type GetPublishableKeyQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetPublishableKeyQuery = {
  getPublishableKey: Pick<Types.PublishableKey, 'publishableKey'>;
};
