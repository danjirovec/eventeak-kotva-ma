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
  mutation UpdateUserPassword($input: UpdatePassword!) {
    updatePassword(input: $input)
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
      row {
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
  mutation CreateTickets($input: CreateTicketOrder!) {
    createTickets(input: $input) {
      id
      name
      date
      seatMap
      template {
        id
        name
        category
        business {
          id
          name
        }
        length
        venue {
          id
          name
          hasSeats
        }
      }
    }
  }
`;

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($input: UpdateEvent!) {
    updateEvent(input: $input) {
      id
      name
      date
      template {
        id
        name
        length
        description
        subtitles
        language
        category
        posterUrl
        venue {
          id
          name
        }
      }
      business {
        id
        name
      }
    }
  }
`;
