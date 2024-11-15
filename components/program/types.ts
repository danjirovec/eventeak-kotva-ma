import {
  Discount,
  PriceCategory,
  Seat,
  Event,
  TemplateDiscount,
} from '@/graphql/schema.types';

export type TicketDetail = {
  id: string;
  epc: PriceCategory;
  price: number;
  discount?: TemplateDiscount;
  seatNumber?: number;
  seatId?: string;
  rowName?: string;
  rowId?: string;
};

export type TicketCount = {
  epc: PriceCategory;
  count: number;
};

export type TicketsOverviewProps = {
  eventDetails: Event;
  tickets: TicketDetail[];
  ticketCount: TicketCount[];
  setTickets: (tickets: TicketDetail[]) => void;
  setTicketCount: (ticketCount: TicketCount[]) => void;
  discounts: TemplateDiscount[];
  modalVisibility: { [key: string]: boolean };
  toggleModalVisibility: (ticketId: string, visible: boolean) => void;
  handleSendMessage: (tickets: TicketDetail[]) => void;
};
