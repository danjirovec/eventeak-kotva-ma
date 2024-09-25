import { RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import TicketModal from '@/components/ticketModal';
import { useQuery } from '@apollo/client';
import { USER_TICKETS_QUERY } from '@/graphql/queries';
import { TicketAgg } from '@/graphql/schema.types';
import { useGlobalStore } from '@/context/globalProvider';
import Container from '@/components/container';
import Header from '@/components/header';
import Body from '@/components/body';
import Loader from '@/components/loader';
import Icon from '@/components/icon';
import { icons } from '@/constants';
import SlideDown from '@/components/slideDown';

const Tickets = () => {
  const { business, userId } = useGlobalStore(state => ({
    business: state.business,
    userId: state.userId,
  }));
  const [modalVisible, setModalVisible] = useState<{
    visible: boolean;
    data: TicketAgg | undefined;
  }>({
    visible: false,
    data: undefined,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [showValid, setShowValid] = useState(true);
  const [showInvalid, setShowInvalid] = useState(false);

  const { data, loading, refetch, error } = useQuery(USER_TICKETS_QUERY, {
    variables: {
      filter: {
        and: [{ businessId: { eq: business } }, { userId: { eq: userId } }],
      },
      sorting: { field: 'created', direction: 'ASC' },
      paging: { limit: 10, offset: 0 },
    },
  });

  const tickets = data?.userTickets;

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

  return (
    <Container>
      <Header title="Tickets" />
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
          <TicketModal
            data={modalVisible.data}
            visible={modalVisible.visible}
            setVisible={handleSetVisible}
          />
          <View className="mb-5">
            <View className="w-full">
              <SlideDown
                setShowValid={setShowValid}
                showValid={showValid}
                title="Valid">
                <View className="items-center w-full" style={{ rowGap: 15 }}>
                  {tickets.valid.length < 1 ? (
                    <View className="items-center justify-center">
                      <Text className="text-base text-center align-middle font-rmedium">
                        No valid tickets
                      </Text>
                    </View>
                  ) : (
                    tickets.valid.map((item: TicketAgg) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          setModalVisible({
                            visible: !modalVisible.visible,
                            data: item,
                          });
                        }}>
                        <View className="w-full h-28 p-5 rounded-lg bg-green-200">
                          <View className="flex-row w-full justify-between">
                            <Text className="text-lg font-rmedium text-center align-middle">
                              {item.ticketSet[0].event.name}
                            </Text>
                            <Text className="text-lg font-rmedium text-center align-middle">{`${item.ticketSet.length}x`}</Text>
                          </View>
                          <Text className="text-base font-rregular text-start align-middle">
                            {item.ticketSet[0].event.venue.name}
                          </Text>
                          <Text className="text-base font-rregular text-start align-middle">
                            {`${new Date(item.ticketSet[0].event.date).toLocaleDateString('cs-CZ')} - ${new Date(item.ticketSet[0].event.date).toLocaleTimeString('cs-CZ', { minute: '2-digit', hour: '2-digit' })}`}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              </SlideDown>
              <SlideDown
                setShowValid={setShowInvalid}
                showValid={showInvalid}
                title="Invalid">
                <View className="items-center w-full" style={{ rowGap: 15 }}>
                  {tickets.invalid.length < 1 ? (
                    <View className="items-center justify-center">
                      <Text className="text-base text-center align-middle font-rmedium">
                        No invalid tickets
                      </Text>
                    </View>
                  ) : (
                    tickets.invalid.map((item: TicketAgg) => (
                      <View
                        key={item.id}
                        className="w-full h-28 p-5 rounded-lg bg-red-200">
                        <View className="flex-row w-full justify-between">
                          <Text className="text-lg font-rmedium text-center align-middle">
                            {item.ticketSet[0].event.name}
                          </Text>
                          <Text className="text-lg font-rmedium text-center align-middle">{`${item.ticketSet.length}x`}</Text>
                        </View>
                        <Text className="text-base font-rregular text-start align-middle">
                          {item.ticketSet[0].event.venue.name}
                        </Text>
                        <Text className="text-base font-rregular text-start align-middle">
                          {`${new Date(item.ticketSet[0].event.date).toLocaleDateString('cs-CZ')} - ${new Date(item.ticketSet[0].event.date).toLocaleTimeString('cs-CZ', { minute: '2-digit', hour: '2-digit' })}`}
                        </Text>
                      </View>
                    ))
                  )}
                </View>
              </SlideDown>
            </View>
          </View>
        </Body>
      )}
    </Container>
  );
};

export default Tickets;
