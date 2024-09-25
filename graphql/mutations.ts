import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateOneUserInput!) {
    updateOneUser(input: $input) {
      email
      firstName
      lastName
      placeOfResidence
      defaultBusiness {
        id
        name
      }
    }
  }
`;

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation UpdateUserPassword($input: UpdateUserPassword!) {
    updateUserPassword(input: $input)
  }
`;

export const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicket($input: CreateOneTicketInput!) {
    createOneTicket(input: $input) {
      price
      validated
      order {
        id
      }
      discount {
        id
      }
      seat {
        id
      }
      user {
        id
      }
      event {
        id
      }
    }
  }
`;

export const CREATE_TICKET_AND_ORDER_MUTATION = gql`
  mutation CreateTicketsAndOrder(
    $tickets: [CreateTicket!]!
    $order: CreateOrder!
  ) {
    createTicketsAndOrder(tickets: $tickets, order: $order) {
      id
      price
      discount {
        id
      }
      event {
        id
        name
      }
      section {
        id
        name
      }
      seat {
        id
      }
      user {
        id
      }
      order {
        id
        total
      }
      validated
    }
  }
`;

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($input: UpdateEvent!) {
    updateEvent(input: $input) {
      id
      name
      category
      date
      venue {
        id
        name
      }
      eventTemplate {
        id
        name
      }
      length
      description
      subtitles
      language
      business {
        id
        name
      }
      posterUrl
    }
  }
`;
