import { gql } from '@apollo/client';

export const EVENTS_QUERY = gql`
  query EventsList(
    $filter: EventFilter!
    $sorting: [EventSort!]
    $paging: OffsetPaging!
  ) {
    events(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        created
        date
        seatMap
        template {
          id
          name
          posterUrl
          language
          length
          description
          category
          subtitles
          venue {
            id
            name
            street
            buildingNumber
            city
            hasSeats
          }
        }
        business {
          id
        }
      }
      totalCount
    }
  }
`;

export const EVENT_PRICE_CATEGORY_QUERY = gql`
  query PriceCategoryList(
    $filter: PriceCategoryFilter!
    $sorting: [PriceCategorySort!]
    $paging: OffsetPaging!
  ) {
    priceCategories(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        price
        startDate
        endDate
        section {
          id
          name
        }
      }
      totalCount
    }
  }
`;

export const PRICES_QUERY = gql`
  query PricesList(
    $filter: PriceCategoryFilter!
    $sorting: [PriceCategorySort!]
    $paging: OffsetPaging!
    $meta: String!
  ) {
    getEventPrices(
      filter: $filter
      sorting: $sorting
      paging: $paging
      meta: $meta
    ) {
      nodes {
        id
        name
        price
        startDate
        endDate
        section {
          id
          name
          capacity
        }
      }
      counts
    }
  }
`;

export const USER_PROFILE_QUERY = gql`
  query UserProfile(
    $filter: UserFilter!
    $sorting: [UserSort!]
    $paging: OffsetPaging!
    $meta: String!
  ) {
    profileInfo(
      filter: $filter
      sorting: $sorting
      paging: $paging
      meta: $meta
    ) {
      id
      email
      placeOfResidence
      avatarUrl
      firstName
      lastName
      birthDate
      membership {
        id
        user {
          id
          email
        }
        points
        expiryDate
        state
        membershipType {
          id
          name
          pointsPerTicket
        }
      }
      eventsVisited
      benefitsUsed
    }
  }
`;

export const BENEFITS_QUERY = gql`
  query BenefitsAndMembership(
    $filter: BenefitFilter!
    $sorting: [BenefitSort!]
    $paging: OffsetPaging!
    $meta: String!
  ) {
    getUserBenefits(
      filter: $filter
      sorting: $sorting
      paging: $paging
      meta: $meta
    ) {
      available {
        expiryDate
        name
        points
        description
        id
      }
      unavailable {
        expiryDate
        name
        points
        description
        id
      }
      used {
        expiryDate
        name
        points
        description
        id
      }
      membershipPoints
      membership
    }
  }
`;

export const DISCOUNTS_QUERY = gql`
  query DiscountsList(
    $filter: DiscountFilter!
    $sorting: [DiscountSort!]
    $paging: OffsetPaging!
  ) {
    discounts(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        percentage
        business {
          id
        }
      }
      totalCount
    }
  }
`;

export const BUSINESS_QUERY = gql`
  query BusinessesList(
    $filter: BusinessFilter!
    $sorting: [BusinessSort!]
    $paging: OffsetPaging!
  ) {
    businesses(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        currency
      }
      totalCount
    }
  }
`;

export const TEMPLATE_DISCOUNTS_QUERY = gql`
  query TemplateDiscountsList(
    $filter: TemplateDiscountFilter!
    $sorting: [TemplateDiscountSort!]
    $paging: OffsetPaging!
  ) {
    templateDiscounts(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        discount {
          id
          name
          percentage
        }
        template {
          id
          name
        }
      }
    }
  }
`;

export const TICKETS_QUERY = gql`
  query TicketsList(
    $filter: TicketFilter!
    $sorting: [TicketSort!]
    $paging: OffsetPaging!
  ) {
    tickets(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        price
        validated
        discount {
          id
          name
        }
        user {
          id
          firstName
          lastName
          email
        }
        event {
          id
          name
          date
          template {
            id
            name
            venue {
              id
              name
            }
          }
        }
        seat {
          id
          name
        }
        row {
          id
          name
        }
        section {
          id
          name
        }
        order {
          id
        }
        created
      }
      totalCount
    }
  }
`;

export const USER_TICKETS_QUERY = gql`
  query UserTicketsList(
    $filter: TicketFilter!
    $sorting: [TicketSort!]
    $paging: OffsetPaging!
  ) {
    getUserTickets(filter: $filter, sorting: $sorting, paging: $paging) {
      valid {
        id
        ticketSet {
          id
          business {
            id
            name
          }
          created
          discount {
            id
            name
          }
          event {
            id
            name
            date
            template {
              id
              name
              venue {
                id
                name
                hasSeats
              }
            }
          }
          price
          seat {
            id
            name
          }
          row {
            id
            name
          }
          section {
            id
            name
          }
          user {
            id
            email
          }
          validated
        }
      }
      invalid {
        id
        ticketSet {
          id
          business {
            id
            name
          }
          created
          discount {
            id
            name
          }
          event {
            id
            name
            date
            template {
              id
              name
              venue {
                id
                name
                hasSeats
              }
            }
          }
          price
          seat {
            id
            name
          }
          row {
            id
            name
          }
          section {
            id
            name
          }
          user {
            id
            email
          }
          validated
        }
      }
    }
  }
`;

export const MEMBERSHIPS_QUERY = gql`
  query MembershipsList(
    $filter: MembershipFilter!
    $sorting: [MembershipSort!]
    $paging: OffsetPaging!
  ) {
    memberships(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        points
        expiryDate
        user {
          id
        }
        membershipType {
          id
          name
        }
        business {
          id
        }
      }
    }
  }
`;

export const MEMBERSHIP_TYPES_QUERY = gql`
  query MembershipTypesList(
    $filter: MembershipTypeFilter!
    $sorting: [MembershipTypeSort!]
    $paging: OffsetPaging!
  ) {
    membershipTypes(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        description
        pointsPerTicket
        price
        business {
          id
        }
      }
    }
  }
`;

export const PUBLISHABLE_KEY_QUERY = gql`
  query GetPublishableKey {
    getPublishableKey {
      publishableKey
    }
  }
`;
