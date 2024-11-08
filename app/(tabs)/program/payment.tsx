import { Text, View } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { TicketDetail } from '@/components/program/types';
import { Event } from '@/graphql/schema.types';
import CustomButton from '@/components/customButton';
import { useMutation } from '@apollo/client';
import { CREATE_TICKET_AND_ORDER_MUTATION } from '@/graphql/mutations';
import Loader from '@/components/loader';
import { useGlobalStore } from '@/context/globalProvider';
import BackButton from '@/components/backButton';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';

const Payment = () => {
  const { event, tickets, total } = useLocalSearchParams();
  const [createTicketsAndOrder, { loading, error }] = useMutation(
    CREATE_TICKET_AND_ORDER_MUTATION,
  );
  const { business, userId } = useGlobalStore(state => ({
    business: state.business,
    userId: state.userId,
  }));

  const eventDetails: Event = JSON.parse(event as string);
  const ticketsDetails: TicketDetail[] = JSON.parse(tickets as string);

  const handleCheckout = async () => {
    const ticketsToCreate = ticketsDetails.map(item => ({
      businessId: business,
      discountId: item.discount?.id,
      eventId: eventDetails.id,
      price: item.price,
      seatId: item.seat?.id,
      sectionId: item.epc.section.id,
      userId: userId,
    }));

    try {
      await createTicketsAndOrder({
        variables: {
          input: {
            tickets: ticketsToCreate,
            order: {
              businessId: business,
              userId: userId,
              total: Number(total),
            },
          },
        },
      });
    } catch (e) {
      console.error('Error:', e);
    }
  };

  return (
    <Container>
      <Header left={<BackButton />} title="Checkout" />
      {loading ? (
        <Loader />
      ) : (
        <Body>
          <View className="flex items-start my-5">
            <Text className="text-xl text-center align-middle font-rmedium">
              Order summary
            </Text>
          </View>
          <View style={{ rowGap: 20 }}>
            {ticketsDetails.map(item => (
              <View key={item.id} className="flex items-start">
                <View className="flex-row items-center w-full justify-between">
                  <Text className="text-base text-center align-middle font-rbold">
                    {eventDetails.name}
                  </Text>
                  <Text className="text-base text-center align-middle font-rmedium">
                    {`${item.price} Kč`}
                  </Text>
                </View>
                <Text className="text-base text-center align-middle font-rregular">
                  {new Date(eventDetails.date).toLocaleDateString('cs-CZ')}
                  {' - '}
                  {new Date(eventDetails.date).toLocaleTimeString('cs-CZ', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Text>
                <Text className="text-base text-center align-middle font-rregular">
                  {eventDetails.venue.name}
                  {', '}
                  {item.seat
                    ? `Row: ${item.seat.row}, Seat: ${item.seat.seat}, Section: ${item.seat.section}`
                    : item.epc.section.name}
                </Text>
                <Text className="text-sm text-center align-middle font-rregular text-gray-500">
                  {item.discount ? item.discount.name : 'No discount'}
                </Text>
              </View>
            ))}
          </View>
          <View className="h-0.5 w-full bg-primary opacity-50 my-5" />
          <View className="flex-row w-full justify-between">
            <Text className="text-start text-lg align-middle font-rmedium">
              Total
            </Text>
            <Text className="text-start text-lg font-rmedium">
              {`${total} Kč`}
            </Text>
          </View>
          <CustomButton
            title="Checkout"
            handlePress={() => {
              handleCheckout();
              router.dismissAll();
              router.replace('/(tabs)/tickets');
            }}
            containerStyles="my-5"
          />
        </Body>
      )}
    </Container>
  );
};

export default Payment;
