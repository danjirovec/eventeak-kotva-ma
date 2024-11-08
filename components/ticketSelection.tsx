import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { icons } from '@/constants';
import Icon from '@/components/icon';
import Figure from '@/components/figure';
import { PriceCategory } from '@/graphql/schema.types';
import { TicketDetail, TicketCount } from '@/components/program/types';
import * as Crypto from 'expo-crypto';

const TicketSelection = ({
  ticketCount,
  setTicketCount,
  tickets,
  setTickets,
  index,
  max,
  epc: pc,
}: {
  ticketCount: TicketCount[];
  setTicketCount: (catCount: TicketCount[]) => void;
  tickets: TicketDetail[];
  setTickets: (tickets: TicketDetail[]) => void;
  epc: PriceCategory;
  index: number;
  max: number;
}) => {
  const [currentCount, setCurrentCount] = useState(0);

  const increment = () => {
    if (currentCount < max) {
      const updatedTicketCount = ticketCount.map(item =>
        item.epc === pc ? { ...item, count: item.count + 1 } : item,
      );
      setTicketCount(updatedTicketCount);
      setTickets([
        ...tickets,
        {
          id: Crypto.randomUUID(),
          epc: pc,
          price: pc.price,
        },
      ]);
    }
  };

  const decrement = () => {
    if (currentCount > 0 && tickets.length > 0) {
      const updatedTicketCount = ticketCount.map(item =>
        item.epc === pc ? { ...item, count: item.count - 1 } : item,
      );
      setTicketCount(updatedTicketCount);
      const filteredTickets = tickets.toSpliced(
        tickets.findIndex(ticket => ticket.epc === pc),
        1,
      );
      setTickets(filteredTickets);
    }
  };

  useEffect(() => {
    const count = ticketCount.find(item => item.epc === pc)?.count || 0;
    setCurrentCount(count);
  }, [ticketCount]);

  return (
    <View key={index} className="flex flex-col items-start">
      <View className="flex flex-row items-center justify-between w-full h-14 rounded-lg bg-gray-200 mt-2.5">
        <View className="flex-row ml-5" style={{ columnGap: 10 }}>
          <Figure title="Category" value={pc.name} />
          <Figure title="Section" value={pc.section.name} />
          <Figure title="Price" value={`${pc.price} Kč`} />
        </View>
        <View className="flex flex-row items-center justify-between w-1/5 mr-5">
          <Pressable onPress={decrement}>
            <Icon
              icon={icons.minus}
              color="#878787"
              iconsStyles="w-3 h-3 p-2"></Icon>
          </Pressable>
          <Text className="text-base text-center align-middle font-rmedium">
            {currentCount}
          </Text>
          <Pressable onPress={increment}>
            <Icon
              icon={icons.plus}
              color="#878787"
              iconsStyles="w-3 h-3 p-2"></Icon>
          </Pressable>
        </View>
      </View>
      <View className="flex-row w-full justify-end">
        <Text className="text-sm text-center align-middle text-gray-500">{`${max} available`}</Text>
      </View>
    </View>
  );
};

export default TicketSelection;
