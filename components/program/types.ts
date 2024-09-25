import {
  Discount,
  EventPriceCategory,
  Seat,
  Event,
} from '@/graphql/schema.types';

export type TicketDetail = {
  id: string;
  epc: EventPriceCategory;
  price: number;
  discount?: Discount;
  seat?: Seat;
};

export type TicketCount = {
  epc: EventPriceCategory;
  count: number;
};

export type TicketsOverviewProps = {
  eventDetails: Event;
  tickets: TicketDetail[];
  ticketCount: TicketCount[];
  setTickets: (tickets: TicketDetail[]) => void;
  setTicketCount: (ticketCount: TicketCount[]) => void;
  discounts: Discount[];
  modalVisibility: { [key: string]: boolean };
  toggleModalVisibility: (ticketId: string, visible: boolean) => void;
};
