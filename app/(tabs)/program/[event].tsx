import { View, Text, RefreshControl } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  EVENTS_QUERY,
  PRICES_QUERY,
  TEMPLATE_DISCOUNTS_QUERY,
} from '@/graphql/queries';
import Loader from '@/components/loader';
import {
  Discount,
  Event,
  PriceCategory,
  TemplateDiscount,
} from '@/graphql/schema.types';
import Poster from '@/components/poster';
import { icons } from '@/constants';
import CustomButton from '@/components/customButton';
import Icon from '@/components/icon';
import EventDetailInfoBox from '@/components/eventDetailInfo';
import TicketSelection from '@/components/ticketSelection';
import { TicketDetail, TicketCount } from '@/components/program/types';
import SeatAvailability from '@/components/seatAvailability';
import TicketsOverview from '@/components/ticketsOverview';
import { useGlobalStore } from '@/context/globalProvider';
import Container from '@/components/container';
import Body from '@/components/body';
import Header from '@/components/header';
import BackButton from '@/components/backButton';
import { WebView } from 'react-native-webview';

const EventDetail = () => {
  const { event } = useLocalSearchParams();
  const [eventId, templateId] = (event as string).split('&');
  const { business, currency } = useGlobalStore(state => ({
    business: state.business,
    currency: state.currency,
  }));
  const [modalVisibility, setModalVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [total, setTotal] = useState(0);
  const [ticketCount, setTicketCount] = useState<TicketCount[]>([]);
  const [tickets, setTickets] = useState<TicketDetail[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const webViewRef = useRef<WebView>(null);
  const [injectedJs, setInjectedJs] = useState<string>('');

  const {
    data: eventData,
    error,
    loading: eventLoading,
    refetch: refetchEvent,
  } = useQuery(EVENTS_QUERY, {
    variables: {
      filter: {
        and: [{ businessId: { eq: business } }, { id: { eq: eventId } }],
      },
      paging: { limit: 1 },
    },
  });

  const eventDetails: Event = eventData?.events?.nodes?.[0];

  const {
    data: discountsData,
    loading: discountsLoading,
    refetch: refetchDiscounts,
  } = useQuery(TEMPLATE_DISCOUNTS_QUERY, {
    variables: {
      filter: {
        and: [{ templateId: { eq: templateId } }],
      },
      paging: { limit: 50 },
    },
  });

  const [
    fetchPrices,
    { data: pricesData, loading: pricesLoading, refetch: refetchPrices },
  ] = useLazyQuery(PRICES_QUERY);

  const discounts: TemplateDiscount[] = discountsData?.templateDiscounts?.nodes;
  const prices = pricesData?.getEventPrices;

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
      if (templateId) {
        fetchPrices({
          variables: {
            meta: eventId,
            filter: {
              templateId: { eq: templateId },
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
        prices.nodes.map((price: PriceCategory) => ({
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

  const handleOnMessage = (event: any) => {
    const message = event.nativeEvent.data;
    const seats = JSON.parse(message);
    const updatedTickets = seats.map((seat: any) => {
      const matchingTicket = tickets.find(
        (ticket: any) => ticket.id === seat.id,
      );
      return {
        price: matchingTicket?.discount
          ? Math.ceil(
              (1 - matchingTicket?.discount.discount.percentage / 100) *
                seat.price,
            )
          : seat.price,
        id: seat.id,
        epc: prices.nodes.find(
          (price: PriceCategory) => seat.epcId == price.id,
        ),
        seatNumber: seat.seatNumber,
        seatId: seat.seatId,
        rowName: seat.rowName,
        rowId: seat.rowId,
        discount: matchingTicket?.discount || null,
      };
    });
    setTickets(updatedTickets);
  };

  const handleSendMessage = (tickets: TicketDetail[]) => {
    const stringTickets = JSON.stringify(tickets);
    const jsCode = `
      try {
        const parsedTickets = JSON.parse('${stringTickets}');
        const removedTickets = window.tickets.filter(
          (ticket) =>
            !parsedTickets.some(
              (updatedTicket) => updatedTicket.id === ticket.id,
            ),
        );
        removedTickets.forEach((seat) => {
          if (seat.discount) {
            seat.discount = null;
            seat.price = seat.epcPrice;
          }
          if (!seat.reserved) {
            seat.fill = seat.sectionColor;
          } else {
            seat.fill = '#cccccc';
          }
        });
        const remainingTickets = window.tickets.filter((ticket) =>
          parsedTickets.some((updatedTicket) => updatedTicket.id === ticket.id),
        );
        window.setTickets(remainingTickets);
        window.canvas.requestRenderAll();
      }
      catch (error) {
        alert(error)
      }
      `;
    webViewRef?.current?.injectJavaScript(jsCode);
  };

  useEffect(() => {
    if (!eventLoading) {
      const injectedJs = `
      window.seatMap = '${JSON.stringify(eventDetails.seatMap)}';
      true;
    `;
      setInjectedJs(injectedJs);
    }
  }, [eventLoading]);

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
            scrollEnabled={scrollEnabled}
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
                  posterUrl={eventDetails.template.posterUrl}
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
                    info={`${eventDetails.template.length} min`}
                    icon={icons.duration}
                  />
                  <EventDetailInfoBox
                    info={eventDetails.template.category}
                    icon={icons.category}
                  />
                  {eventDetails.template.language ? (
                    <EventDetailInfoBox
                      info={eventDetails.template.language}
                      icon={icons.volume}
                    />
                  ) : null}

                  {eventDetails.template.subtitles ? (
                    <EventDetailInfoBox
                      info={eventDetails.template.subtitles}
                      icon={icons.subtitles}
                    />
                  ) : null}
                  <View className="flex flex-row items-start w-full h-fit">
                    <View className="flex flex-col items-start justify-start h-fit">
                      <Icon icon={icons.location} color="#225F78" />
                    </View>
                    <View className="flex flex-col flex-1 items-start justify-start h-fit pl-2">
                      <Text className="text-base text-start align-middle font-rmedium mb-0.5">
                        {eventDetails.template.venue.name}
                      </Text>
                      <Text className="text-base text-start align-middle font-rregular mb-0.5">
                        {eventDetails.template.venue.city}
                      </Text>
                      <Text className="text-base text-start align-middle font-rregular">
                        {eventDetails.template.venue.street}{' '}
                        {eventDetails.template.venue.buildingNumber}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex my-2.5">
              <Text className="text-xl font-rmedium">Description</Text>
              <Text className="text-base text-justify font-rregular mt-2.5">
                {eventDetails.template.description}
              </Text>
            </View>
            <View className="flex">
              <Text className="text-xl font-rmedium">Select tickets</Text>
              {eventDetails.template.venue.hasSeats ? (
                <View>
                  <SeatAvailability />
                  <WebView
                    injectedJavaScriptBeforeContentLoaded={injectedJs}
                    startInLoadingState={true}
                    ref={webViewRef}
                    onTouchStart={() => setScrollEnabled(false)}
                    onTouchEnd={() => setScrollEnabled(true)}
                    className="w-96 h-96 my-2.5"
                    scalesPageToFit={true}
                    onMessage={handleOnMessage}
                    source={{
                      uri: 'https://staging.eventeak.com/map',
                    }}
                  />
                </View>
              ) : (
                <View>
                  {prices.nodes.map((item: PriceCategory, index: number) => (
                    <TicketSelection
                      ticketCount={ticketCount}
                      setTicketCount={setTicketCount}
                      tickets={tickets}
                      setTickets={setTickets}
                      key={index}
                      index={index}
                      epc={item}
                      max={prices.counts[index]}
                    />
                  ))}
                </View>
              )}
            </View>
            <View className="flex my-2.5">
              <Text className="text-xl font-rmedium">Tickets overview</Text>
              <TicketsOverview
                handleSendMessage={handleSendMessage}
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
                      {`${total} ${currency}`}
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
                    paymentType: 'Ticket',
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
