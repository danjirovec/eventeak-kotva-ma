import { View, Modal, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from './customButton';
import { Discount } from '@/graphql/schema.types';
import { TicketDetail } from '@/components/program/types';

const calcDiscount = (
  ticket: TicketDetail,
  selectedDiscount: Discount | undefined,
) => {
  if (!selectedDiscount) {
    return ticket.epc.price;
  } else if (ticket.discount == selectedDiscount) {
    return ticket.price;
  } else {
    return Math.ceil((1 - selectedDiscount.percentage / 100) * ticket.price);
  }
};

const DiscountModal = ({
  data,
  ticketId,
  setTickets,
  tickets,
  visible,
  setVisible,
}: {
  ticketId: string;
  data: Discount[];
  setTickets: (tickets: TicketDetail[]) => void;
  tickets: TicketDetail[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const [selectedDiscount, setSelectedDiscount] = useState<
    Discount | undefined
  >();
  const [ticket, setTicket] = useState<TicketDetail | undefined>();

  useEffect(() => {
    const currentTicket = tickets.find(t => t.id === ticketId);
    if (currentTicket) {
      setTicket(currentTicket);
      if (currentTicket.discount) setSelectedDiscount(currentTicket.discount);
    }
  }, [ticketId, tickets]);

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View
        className="flex my-auto justify-center items-center w-full h-full"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <View className="justify-center items-center w-9/12 h-fit p-5 bg-white rounded-lg">
          <View
            className="justify-between items-start w-full"
            style={{ rowGap: 40 }}>
            <View style={{ rowGap: 15 }}>
              <View className="items-start w-full">
                <Text className="font-rmedium text-black text-xl">
                  Choose discount
                </Text>
              </View>
              {data.length < 1 ? (
                <Text className="text-base text-center align-middle font-rregular mt-2.5">
                  No discounts to select
                </Text>
              ) : (
                <View className="items-start w-full" style={{ rowGap: 10 }}>
                  {data.map(discount => (
                    <View
                      key={discount.id}
                      className="flex-row w-full justify-start items-center">
                      <TouchableOpacity
                        className="flex-row justify-center items-center"
                        style={{ columnGap: 10 }}
                        onPress={() => {
                          setSelectedDiscount(
                            selectedDiscount == discount ? undefined : discount,
                          );
                        }}>
                        <View
                          className={`w-5 h-5 border-2 justify-center items-center border-gray-400 rounded-full`}>
                          {selectedDiscount == discount ? (
                            <View className="w-2.5 h-2.5 bg-primary rounded-full" />
                          ) : null}
                        </View>
                        <Text className="text-base text-center align-middle font-rmedium">
                          {`${discount.name} - ${discount.percentage}%`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View className="flex-row w-full items-start">
              <Text className="text-sm align-middle text-justify font-rregular">
                Selected discount must be proved with relevant ID when asked.
              </Text>
            </View>
          </View>
          <CustomButton
            title="Ok"
            handlePress={() => {
              if (ticket) {
                const updatedTickets = tickets.map(tick =>
                  tick.id === ticket.id
                    ? {
                        ...tick,
                        discount: selectedDiscount,
                        price: calcDiscount(tick, selectedDiscount),
                      }
                    : tick,
                );
                setTickets(updatedTickets);
                setVisible(!visible);
                setSelectedDiscount(undefined);
              }
            }}
            textStyles="color-primary"
            containerStyles="w-32 mt-5 bg-white border-primary border-2"
          />
        </View>
      </View>
    </Modal>
  );
};

export default DiscountModal;
