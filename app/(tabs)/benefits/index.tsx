import { Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { BENEFITS_QUERY } from '@/graphql/queries';
import Loader from '@/components/loader';
import { Benefit } from '@/graphql/schema.types';
import Icon from '@/components/icon';
import { icons } from '@/constants';
import BenefitModal from '@/components/benefitModal';
import { useGlobalStore } from '@/context/globalProvider';
import Header from '@/components/header';
import Container from '@/components/container';
import Body from '@/components/body';
import SlideDown from '@/components/slideDown';
import { useFocusEffect } from 'expo-router';

const Benefits = () => {
  const { business, userId } = useGlobalStore(state => ({
    business: state.business,
    userId: state.userId,
  }));

  const [modalVisible, setModalVisible] = useState<{
    visible: boolean;
    showQR: boolean;
    data: Benefit | undefined;
  }>({
    visible: false,
    showQR: false,
    data: undefined,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [showAvailable, setShowAvailable] = useState(true);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [showUsed, setShowUsed] = useState(false);

  const { data, loading, refetch, error } = useQuery(BENEFITS_QUERY, {
    variables: {
      meta: userId,
      filter: { businessId: { eq: business } },
      paging: { limit: 10, offset: 0 },
    },
  });

  const benefits = data?.getUserBenefits;

  const handleSetVisible = (visible: boolean) => {
    setModalVisible(prevState => ({
      ...prevState,
      visible: visible,
    }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await refetch();
      };
      fetchData();
    }, []),
  );

  return (
    <Container>
      <Header title="Benefits" />
      {loading ? (
        <Loader />
      ) : (
        <Body
          refreshControl={
            <RefreshControl
              colors={['#225F78']}
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={80}
            />
          }>
          <BenefitModal
            showQR={modalVisible.showQR}
            user={userId}
            data={modalVisible.data}
            visible={modalVisible.visible}
            setVisible={handleSetVisible}
          />
          {!benefits.membership ? (
            <View className="items-center justify-center mt-5">
              <Text className="text-start text-xl align-middle font-rmedium">
                You have no membership
              </Text>
            </View>
          ) : (
            <View className="mb-5">
              <View
                className="flex-row items-center mt-5"
                style={{ columnGap: 10 }}>
                <Text className="text-start text-xl align-middle font-rmedium">
                  Your membership points:
                </Text>
                <Text className="text-start text-xl align-middle font-rmedium">
                  {benefits.membershipPoints}
                </Text>
              </View>
              <View className="w-full">
                <View className="items-start mt-2.5 w-full">
                  <SlideDown
                    setShowValid={setShowAvailable}
                    showValid={showAvailable}
                    title="Available">
                    <View className="items-start w-full" style={{ rowGap: 15 }}>
                      {benefits.available.length < 1 ? (
                        <View className="items-start justify-center">
                          <Text className="text-base text-center align-middle font-rmedium">
                            No available benefits
                          </Text>
                        </View>
                      ) : (
                        benefits.available.map((item: Benefit) => (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                              setModalVisible({
                                visible: !modalVisible.visible,
                                data: item,
                                showQR: true,
                              });
                            }}>
                            <View className="w-full flex-row rounded-lg bg-green-200">
                              <View
                                className="flex-row items-center justify-start w-1/2 h-20"
                                style={{ columnGap: 10 }}>
                                <Icon
                                  icon={icons.unlock}
                                  color="#225F78"
                                  iconsStyles="ml-2.5"
                                />
                                <Text className="text-lg font-rmedium text-center align-middle">
                                  {item.name}
                                </Text>
                              </View>
                              <View className="w-1/2 items-end justify-center">
                                <View className="flex flex-col justify-center items-center bg-white w-32 h-14 rounded-lg mr-2.5">
                                  <Text className="text-base text-center align-middle font-rmedium">
                                    {item.expiryDate
                                      ? `${new Date(
                                          item.expiryDate,
                                        ).toLocaleDateString('cs-CZ')}`
                                      : '∞'}
                                  </Text>
                                  <View className="h-0.5 w-10/12 bg-primary opacity-50" />
                                  <Text className="text-base text-center align-middle font-rmedium">
                                    {`${item.points} points`}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))
                      )}
                    </View>
                  </SlideDown>
                  <SlideDown
                    setShowValid={setShowUnavailable}
                    showValid={showUnavailable}
                    title="Unavailable">
                    <View className="items-start w-full" style={{ rowGap: 15 }}>
                      {benefits.unavailable.length < 1 ? (
                        <View className="items-start justify-center">
                          <Text className="text-base text-center align-middle font-rmedium">
                            No unavailable benefits
                          </Text>
                        </View>
                      ) : (
                        benefits.unavailable.map((item: Benefit) => (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                              setModalVisible({
                                visible: !modalVisible.visible,
                                data: item,
                                showQR: false,
                              });
                            }}>
                            <View
                              key={item.id}
                              className="w-full flex-row rounded-lg bg-red-200">
                              <View
                                className="flex-row items-center justify-start w-1/2 h-20"
                                style={{ columnGap: 10 }}>
                                <Icon
                                  icon={icons.lock}
                                  color="#225F78"
                                  iconsStyles="ml-2.5"
                                />
                                <Text className="text-lg font-rmedium text-justify align-middle">
                                  {item.name}
                                </Text>
                              </View>
                              <View className="w-1/2 items-end justify-center">
                                <View className="flex flex-col justify-center items-center bg-white w-32 h-14 rounded-lg mr-2.5">
                                  <Text className="text-base text-center align-middle font-rmedium">
                                    {item.expiryDate
                                      ? `${new Date(
                                          item.expiryDate,
                                        ).toLocaleDateString('cs-CZ')}`
                                      : '∞'}
                                  </Text>
                                  <View className="h-0.5 w-10/12 bg-primary opacity-50" />
                                  <Text className="text-base text-center align-middle font-rmedium">
                                    {`${item.points} points`}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))
                      )}
                    </View>
                  </SlideDown>
                  <SlideDown
                    setShowValid={setShowUsed}
                    showValid={showUsed}
                    title="Used last month">
                    <View className="w-full" style={{ rowGap: 15 }}>
                      {benefits.used.length < 1 ? (
                        <View className="items-start justify-center">
                          <Text className="text-base text-center align-middle font-rmedium">
                            No used benefits
                          </Text>
                        </View>
                      ) : (
                        benefits.used.map((item: Benefit) => (
                          <View
                            key={item.id}
                            className="w-full flex-row rounded-lg bg-gray-200 opacity-50">
                            <View
                              className="flex-row items-center justify-start w-1/2 h-20"
                              style={{ columnGap: 10 }}>
                              <Icon
                                icon={icons.checkfull}
                                color="#225F78"
                                iconsStyles="ml-2.5"
                              />
                              <Text className="text-lg font-rmedium text-center align-middle">
                                {item.name}
                              </Text>
                            </View>
                            <View className="w-1/2 items-end justify-center">
                              <View className="flex flex-col justify-center items-center bg-white w-32 h-14 rounded-lg mr-2.5">
                                <Text className="text-base text-center align-middle font-rmedium">
                                  {item.expiryDate
                                    ? `${new Date(
                                        item.expiryDate,
                                      ).toLocaleDateString('cs-CZ')}`
                                    : '∞'}
                                </Text>
                                <View className="h-0.5 w-10/12 bg-primary opacity-50" />
                                <Text className="text-base text-center align-middle font-rmedium">
                                  {`${item.points} points`}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ))
                      )}
                    </View>
                  </SlideDown>
                </View>
              </View>
            </View>
          )}
        </Body>
      )}
    </Container>
  );
};

export default Benefits;
