import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import DiscountModal from '@/components/discountModal';
import Icon from '@/components/icon';
import Frag from '@/components/frag';
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
}: TicketsOverviewProps) => {
  return (
    <View>
      {tickets.length > 0 ? (
        tickets.map(ticket => (
          <View key={ticket.id} className="flex flex-col items-start">
            <View className="flex flex-row items-center justify-between w-full h-14 rounded-lg bg-gray-200 mt-2.5">
              <View className="flex flex-row ml-5" style={{ columnGap: 30 }}>
                <Frag
                  title={eventDetails.venue.hasSeats ? 'Seat' : 'Section'}
                  value={
                    eventDetails.venue.hasSeats
                      ? `${ticket.seat?.row} - ${ticket.seat?.seat}, ${ticket.seat?.section.name}`
                      : ticket.epc.section.name
                  }
                />
                <Frag title="Price" value={`${ticket.price} Kč`} />
                {ticket.discount ? (
                  <Frag title="Discount" value={ticket.discount.name} />
                ) : null}
              </View>
              <View className="flex mr-5">
                <TouchableOpacity
                  onPress={() => {
                    const updatedTickets = tickets.filter(
                      t => t.id !== ticket.id,
                    );
                    setTickets(updatedTickets);
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
                  Choose discount
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
