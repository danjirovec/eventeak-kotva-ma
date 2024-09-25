import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery, useLazyQuery } from '@apollo/client';
import { DISCOUNTS_QUERY, EVENTS_QUERY, PRICES_QUERY } from '@/graphql/queries';
import Loader from '@/components/loader';
import { Discount, Event, EventPriceCategory } from '@/graphql/schema.types';
import Poster from '@/components/poster';
import { icons } from '@/constants';
import CustomButton from '@/components/customButton';
import Icon from '@/components/icon';
import EventDetailInfoBox from '@/components/eventDetailInfo';
import ChooseTicket from '@/components/chooseTicket';
import { TicketDetail, TicketCount } from '@/components/program/types';
import AvailabilityLegend from '@/components/availabilityLegend';
import TicketsOverview from '@/components/ticketsOverview';
import { useGlobalStore } from '@/context/globalProvider';
import Container from '@/components/container';
import Body from '@/components/body';
import Header from '@/components/header';
import BackButton from '@/components/backButton';

const EventDetail = () => {
  const { event } = useLocalSearchParams();
  const { business } = useGlobalStore(state => ({
    business: state.business,
  }));
  const [modalVisibility, setModalVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [total, setTotal] = useState(0);
  const [ticketCount, setTicketCount] = useState<TicketCount[]>([]);
  const [tickets, setTickets] = useState<TicketDetail[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: eventData,
    loading: eventLoading,
    refetch: refetchEvent,
  } = useQuery(EVENTS_QUERY, {
    variables: {
      filter: {
        and: [{ businessId: { eq: business } }, { id: { eq: event } }],
      },
      paging: { limit: 1 },
    },
  });

  const {
    data: discountsData,
    loading: discountsLoading,
    refetch: refetchDiscounts,
  } = useQuery(DISCOUNTS_QUERY, {
    variables: {
      filter: { business: { id: { eq: business } } },
      paging: { limit: 50 },
    },
  });

  const [
    fetchPrices,
    { data: pricesData, loading: pricesLoading, refetch: refetchPrices },
  ] = useLazyQuery(PRICES_QUERY);

  const discounts: Discount[] = discountsData?.discounts?.nodes;
  const eventDetails: Event = eventData?.events?.nodes?.[0];
  const prices = pricesData?.prices;

  useEffect(() => {
    let total = 0;
    if (!(tickets.length < 1)) {
      for (const tick of tickets) {
        total += tick.price;
      }
      setTotal(total);
    }
  }, [tickets]);

  useEffect(() => {
    if (!eventLoading) {
      const eventTemplateId = eventDetails.eventTemplate.id;

      if (eventTemplateId) {
        fetchPrices({
          variables: {
            meta: event,
            filter: {
              eventTemplateId: { eq: eventTemplateId },
            },
            paging: { limit: 10 },
          },
        });
      }
    }
  }, [eventLoading, fetchPrices]);

  useEffect(() => {
    if (prices && ticketCount.length < 1) {
      setTicketCount(
        prices.nodes.map((price: EventPriceCategory) => ({
          epc: price,
          count: 0,
        })),
      );
    }
  }, [prices]);

  const toggleModalVisibility = (ticketId: string, visible: boolean) => {
    setModalVisibility(prevState => ({
      ...prevState,
      [ticketId]: visible,
    }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchPrices();
    await refetchDiscounts();
    await refetchEvent();
    setRefreshing(false);
  };

  return (
    <Container>
      {eventLoading || pricesLoading || discountsLoading || !prices ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Header
            left={<BackButton />}
            title={eventDetails.name}
            titleStyles="text-2xl pb-0.5"
          />
          <Body
            refreshControl={
              <RefreshControl
                colors={['#225F78']}
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={80}
              />
            }>
            <View className="flex flex-row w-full h-fit mt-5 bg-gray-100 rounded-lg">
              <View className="flex flex-row justify-start w-1/2 h-fit">
                <Poster
                  posterUrl={eventDetails.posterUrl}
                  containerStyles="w-44 ml-0"
                />
              </View>
              <View className="flex items-start w-1/2 h-fit bg-gray-100 rounded-lg">
                <View className="flex flex-1 w-full px-1 py-2">
                  <EventDetailInfoBox
                    info={`${new Date(eventDetails.date).toLocaleDateString('cs-CZ')} - ${new Date(
                      eventDetails.date,
                    ).toLocaleTimeString('cs-CZ', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}`}
                    icon={icons.calendar}
                  />
                  <EventDetailInfoBox
                    info={`${eventDetails.length} min`}
                    icon={icons.duration}
                  />
                  <EventDetailInfoBox
                    info={eventDetails.category}
                    icon={icons.category}
                  />
                  <EventDetailInfoBox
                    info={eventDetails.language}
                    icon={icons.volume}
                  />
                  {eventDetails.subtitles ? (
                    <EventDetailInfoBox
                      info={eventDetails.subtitles}
                      icon={icons.subtitles}
                    />
                  ) : null}
                  <View className="flex flex-row items-start w-full h-fit">
                    <View className="flex flex-col items-start justify-start h-fit">
                      <Icon icon={icons.location} color="#225F78" />
                    </View>
                    <View className="flex flex-col flex-1 items-start justify-start h-fit pl-2">
                      <Text className="text-base text-start align-middle font-rmedium mb-0.5">
                        {eventDetails.venue.name}
                      </Text>
                      <Text className="text-base text-start align-middle font-rregular mb-0.5">
                        {eventDetails.venue.city}
                      </Text>
                      <Text className="text-base text-start align-middle font-rregular">
                        {eventDetails.venue.street}{' '}
                        {eventDetails.venue.buildingNumber}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex my-2.5">
              <Text className="text-xl font-rmedium">Description</Text>
              <Text className="text-base text-justify font-rregular mt-2.5">
                {eventDetails.description}
              </Text>
            </View>
            <View className="flex">
              <Text className="text-xl font-rmedium">Choose tickets</Text>
              {eventDetails.venue.hasSeats ? (
                <AvailabilityLegend />
              ) : (
                <View>
                  {prices.nodes.map(
                    (item: EventPriceCategory, index: number) => (
                      <ChooseTicket
                        ticketCount={ticketCount}
                        setTicketCount={setTicketCount}
                        tickets={tickets}
                        setTickets={setTickets}
                        key={index}
                        index={index}
                        epc={item}
                        max={prices.counts[index]}
                      />
                    ),
                  )}
                </View>
              )}
            </View>
            <View className="flex my-2.5">
              <Text className="text-xl font-rmedium">Tickets overview</Text>
              <TicketsOverview
                eventDetails={eventDetails}
                discounts={discounts}
                tickets={tickets}
                ticketCount={ticketCount}
                setTicketCount={setTicketCount}
                setTickets={setTickets}
                modalVisibility={modalVisibility}
                toggleModalVisibility={toggleModalVisibility}
              />
              {tickets.length > 0 && (
                <View>
                  <View className="h-0.5 w-full bg-primary opacity-50 my-5" />
                  <View className="flex-row w-full justify-between">
                    <Text className="text-start text-lg font-rmedium ml-5">
                      Total
                    </Text>
                    <Text className="text-start text-lg font-rmedium mr-5">
                      {`${total} Kč`}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <CustomButton
              disabled={tickets.length < 1}
              title="Proceed to checkout"
              handlePress={() => {
                router.push({
                  pathname: '/(tabs)/program/payment',
                  params: {
                    tickets: JSON.stringify(tickets),
                    event: JSON.stringify(eventDetails),
                    total: total,
                  },
                });
              }}
              containerStyles="my-5"
            />
          </Body>
        </React.Fragment>
      )}
    </Container>
  );
};

export default EventDetail;
