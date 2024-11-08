import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import DiscountModal from '@/components/discountModal';
import Icon from '@/components/icon';
import Figure from '@/components/figure';
import { TicketsOverviewProps } from '@/components/program/types';
import { icons } from '@/constants';

const TicketsOverview = ({
  eventDetails,
  tickets,
  ticketCount,
  setTickets,
  setTicketCount,
  discounts,
  modalVisibility,
  toggleModalVisibility,
  handleSendMessage,
}: TicketsOverviewProps) => {
  return (
    <View>
      {tickets.length > 0 ? (
        tickets.map(ticket => (
          <View key={ticket.id} className="flex flex-col items-start">
            <View className="flex-row items-center justify-between w-full h-14 rounded-lg bg-gray-200 mt-2.5">
              <View className="flex-row ml-5" style={{ columnGap: 10 }}>
                {!eventDetails.venue.hasSeats && (
                  <Figure title="Section" value={ticket.epc.section.name} />
                )}
                {eventDetails.venue.hasSeats && (
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Figure title="Section" value={ticket.epc.section.name} />
                    <Figure
                      title="Seat"
                      value={`${ticket.row} - ${ticket.seatNumber}`}
                    />
                  </View>
                )}
                <Figure title="Price" value={`${ticket.price} Kč`} />
                {ticket.discount ? (
                  <Figure title="Discount" value={ticket.discount.name} />
                ) : null}
              </View>
              <View className="mr-5">
                <TouchableOpacity
                  onPress={() => {
                    const updatedTickets = tickets.filter(
                      t => t.id !== ticket.id,
                    );
                    setTickets(updatedTickets);
                    handleSendMessage(updatedTickets);
                    const updatedTicketCount = ticketCount.map(item =>
                      item.epc === ticket.epc
                        ? { ...item, count: item.count - 1 }
                        : item,
                    );
                    setTicketCount(updatedTicketCount);
                  }}>
                  <Icon icon={icons.cross} color="#878787"></Icon>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <DiscountModal
                data={discounts}
                visible={modalVisibility[ticket.id] || false}
                setVisible={isVisible =>
                  toggleModalVisibility(ticket.id, isVisible)
                }
                ticketId={ticket.id}
                tickets={tickets}
                setTickets={setTickets}
              />
              <TouchableOpacity
                onPress={() => {
                  toggleModalVisibility(ticket.id, true);
                }}>
                <Text className="text-sm text-center align-middle underline text-gray-500">
                  Select discount
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text className="text-base text-center align-middle font-rregular mt-2.5">
          No tickets selected
        </Text>
      )}
    </View>
  );
};

export default TicketsOverview;
