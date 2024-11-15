import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Membership, MembershipType } from '@/graphql/schema.types';
import CustomButton from '@/components/customButton';
import { useMutation } from '@apollo/client';
import {
  CREATE_MEMBERSHIP_MUTATION,
  PAYMENT_MUTATION,
  UPDATE_MEMBERSHIP_MUTATION,
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
  const { membership, paymentType, extend } = useLocalSearchParams();
  const userMembership: Membership = extend
    ? JSON.parse(extend as string)
    : null;
  const [
    createMembership,
    { loading: membershipLoading, error: membershipError },
  ] = useMutation(CREATE_MEMBERSHIP_MUTATION);
  const [
    updateOneMembership,
    { loading: membershipUpdateLoading, error: membershipUpdateError },
  ] = useMutation(UPDATE_MEMBERSHIP_MUTATION);
  const { business, userId, currency, userEmail } = useGlobalStore(state => ({
    business: state.business,
    userId: state.userId,
    currency: state.currency,
    userEmail: state.userEmail,
  }));

  const membershipDetails: MembershipType = JSON.parse(membership as string);

  const [loading, setLoading] = useState(false);
  const [paymentAlertVisible, setPaymentAlertVisible] = useState({
    visible: false,
    success: true,
    message: '',
  });
  const [paymentId, setPaymentId] = useState('');
  const [submit, setSubmit] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [payment, { loading: keyLoading, error: keyError }] =
    useMutation(PAYMENT_MUTATION);

  const fetchPaymentSheetParams = async () => {
    const res = await payment({
      variables: {
        input: {
          amount: Number(membershipDetails.price),
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
    } else {
      await handleCheckout();

      setTimeout(() => {
        router.dismissAll();
        router.replace('/(tabs)/benefits');
      }, 3000);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const handleCheckout = async () => {
    if (userMembership) {
      const expiryDate = new Date(userMembership.expiryDate);
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      try {
        await updateOneMembership({
          variables: {
            input: {
              id: userMembership.id,
              update: {
                expiryDate: expiryDate,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
        showPaymentAlert(false, 'Checkout fail');
        return;
      }
    } else {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      try {
        await createMembership({
          variables: {
            input: {
              businessId: business,
              userId: userId,
              expiryDate: expiryDate,
              membershipTypeId: membershipDetails.id,
              order: {
                userId: userId,
                businessId: business,
                paymentType: paymentType,
                paymentId: paymentId,
                total: membershipDetails.price,
              },
            },
          },
        });
      } catch (e) {
        console.error(e);
        showPaymentAlert(false, 'Checkout fail');
        return;
      }
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
            <View className="flex items-start">
              <View className="flex-row items-center w-full justify-between">
                <Text className="text-base text-center align-middle font-rbold">
                  {`${membershipDetails.name}`}
                </Text>
                <Text className="text-base text-center align-middle font-rmedium">
                  {`${membershipDetails.price} ${currency}`}
                </Text>
              </View>
              <Text className="text-base text-center align-middle font-rregular">
                {`${membershipDetails.pointsPerTicket} points / ticket`}
              </Text>
              <Text className="text-base text-start align-middle font-rregular">
                {membershipDetails.description}
              </Text>
            </View>
          </View>
          <View className="h-0.5 w-full bg-primary opacity-50 my-5" />
          <View className="flex-row w-full justify-between">
            <Text className="text-start text-lg align-middle font-rmedium">
              Total
            </Text>
            <Text className="text-start text-lg font-rmedium">
              {`${membershipDetails.price} ${currency}`}
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
