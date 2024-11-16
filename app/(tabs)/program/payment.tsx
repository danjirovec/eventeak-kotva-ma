import { Button, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { TicketDetail } from '@/components/program/types';
import { Event } from '@/graphql/schema.types';
import CustomButton from '@/components/customButton';
import { useMutation } from '@apollo/client';
import {
  CREATE_TICKET_AND_ORDER_MUTATION,
  PAYMENT_MUTATION,
} from '@/graphql/mutations';
import Loader from '@/components/loader';
import { useGlobalStore } from '@/context/globalProvider';
import BackButton from '@/components/backButton';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';
import { useStripe } from '@stripe/stripe-react-native';
import SlideAlert from '@/components/slideAlert';

const Payment = () => {
  const { event, tickets, total, paymentType } = useLocalSearchParams();
  const { business, userId, currency, userEmail } = useGlobalStore(state => ({
    business: state.business,
    userId: state.userId,
    currency: state.currency,
    userEmail: state.userEmail,
  }));
  const [loading, setLoading] = useState(false);
  const [paymentAlertVisible, setPaymentAlertVisible] = useState({
    visible: false,
    success: true,
    message: '',
  });
  const [paymentId, setPaymentId] = useState('');
  const [submit, setSubmit] = useState(false);
  const eventDetails: Event = JSON.parse(event as string);
  const ticketsDetails: TicketDetail[] = JSON.parse(tickets as string);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [payment, { loading: keyLoading, error: keyError }] =
    useMutation(PAYMENT_MUTATION);
  const [
    createTicketsAndOrder,
    { loading: ticketsLoading, error: ticketsError },
  ] = useMutation(CREATE_TICKET_AND_ORDER_MUTATION);

  const fetchPaymentSheetParams = async () => {
    const res = await payment({
      variables: {
        input: {
          amount: Number(total),
          currency: currency,
          email: userEmail,
          paymentType: paymentType as string,
        },
      },
    });
    return {
      clientSecret: res.data.payment.clientSecret,
      paymentId: res.data.payment.paymentId,
    };
  };

  const initializePaymentSheet = async () => {
    const { clientSecret, paymentId } = await fetchPaymentSheetParams();

    setPaymentId(paymentId);

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Biograf Kotva',
      paymentIntentClientSecret: clientSecret,
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const showPaymentAlert = (success: boolean, message: string) => {
    setPaymentAlertVisible({
      visible: true,
      success: success,
      message: message,
    });
    setTimeout(
      () =>
        setPaymentAlertVisible({
          visible: false,
          success: success,
          message: message,
        }),
      3500,
    );
  };

  const openPaymentSheet = async () => {
    setSubmit(true);
    const { error } = await presentPaymentSheet();

    if (error) {
      showPaymentAlert(false, error.message);
      setSubmit(false);
    } else {
      await handleCheckout();

      setTimeout(() => {
        router.dismissAll();
        router.replace('/(tabs)/tickets');
      }, 3000);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const handleCheckout = async () => {
    const ticketsToCreate = ticketsDetails.map(item => ({
      businessId: business,
      discountId: item.discount?.discount.id,
      eventId: eventDetails.id,
      price: item.price,
      seatId: item.seatId,
      seat: item.seatNumber,
      rowId: item.rowId,
      row: item.rowName,
      sectionId: item.epc.section.id,
      section: item.epc.section.name,
      userId: userId,
    }));

    try {
      await createTicketsAndOrder({
        variables: {
          input: {
            tickets: ticketsToCreate,
            order: {
              businessId: business,
              paymentType: 'Ticket',
              paymentId: paymentId,
              userId: userId,
              total: Number(total),
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      showPaymentAlert(false, 'Checkout fail');
      setSubmit(false);
      return;
    }
    showPaymentAlert(true, 'Payment success');
  };

  return (
    <Container>
      <Header left={<BackButton />} title="Checkout" />
      {false ? (
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
                    {`${item.price} ${currency}`}
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
                  {eventDetails.template.venue.name}
                  {', '}
                  {item.seatId
                    ? `Section: ${item.epc.section.name}, Row: ${item.rowName}, Seat: ${item.seatNumber}`
                    : item.epc.section.name}
                </Text>
                <Text className="text-sm text-center align-middle font-rregular text-gray-500">
                  {item.discount ? item.discount.discount.name : 'No discount'}
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
              {`${total} ${currency}`}
            </Text>
          </View>
          <CustomButton
            disabled={!loading || submit}
            title="Checkout"
            handlePress={async () => {
              await openPaymentSheet();
            }}
            containerStyles="my-5"
          />
          <SlideAlert
            success={paymentAlertVisible.success}
            message={paymentAlertVisible.message}
            visible={paymentAlertVisible.visible}
          />
        </Body>
      )}
    </Container>
  );
};

export default Payment;
