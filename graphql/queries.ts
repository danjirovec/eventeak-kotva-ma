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
        category
        created
        name
        length
        venueData
        description
        posterUrl
        language
        subtitles
        date
        eventTemplate {
          id
        }
        business {
          id
        }
        venue {
          id
          name
          street
          buildingNumber
          city
          hasSeats
        }
      }
      totalCount
    }
  }
`;

export const EVENT_PRICE_CATEGORY_QUERY = gql`
  query EventPriceCategoryList(
    $filter: EventPriceCategoryFilter!
    $sorting: [EventPriceCategorySort!]
    $paging: OffsetPaging!
  ) {
    eventPriceCategories(filter: $filter, sorting: $sorting, paging: $paging) {
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
    $filter: EventPriceCategoryFilter!
    $sorting: [EventPriceCategorySort!]
    $paging: OffsetPaging!
    $meta: String!
  ) {
    prices(filter: $filter, sorting: $sorting, paging: $paging, meta: $meta) {
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
    profile(filter: $filter, sorting: $sorting, paging: $paging, meta: $meta) {
      id
      email
      placeOfResidence
      avatarUrl
      firstName
      lastName
      birthDate
      created
      eventsVisited
      membershipPoints
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
    benefitsAndMembership(
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
        }
        event {
          id
          name
          date
          venue {
            id
            name
          }
        }
        seat {
          id
          row
          seat
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
    userTickets(filter: $filter, sorting: $sorting, paging: $paging) {
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
            venue {
              id
              name
            }
          }
          price
          seat {
            id
            seat
            row
          }
          section {
            id
            name
          }
          user {
            id
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
            venue {
              id
              name
            }
          }
          price
          seat {
            id
            seat
            row
          }
          section {
            id
            name
          }
          user {
            id
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
