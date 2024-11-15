import { View, Modal, Text } from 'react-native';
import React from 'react';
import { UserTickets } from '@/graphql/schema.types';
import QRCode from 'react-native-qrcode-svg';
import PagerView from 'react-native-pager-view';
import ExitButton from './exitButton';
import { useGlobalStore } from '@/context/globalProvider';

const TicketModal = ({
  data,
  visible,
  setVisible,
}: {
  data: UserTickets | undefined;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const { currency } = useGlobalStore(state => ({
    currency: state.currency,
  }));

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
            className="justify-between items-center"
            style={{ width: '100%', height: 500 }}>
            <PagerView className="w-full h-full" collapsable={false}>
              {data?.ticketSet.map((item: any, index: number) => (
                <View className="h-fit" key={item.id} style={{ rowGap: 20 }}>
                  <View
                    className="h-fit"
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View className="flex-row mb-2">
                      <Text className="text-base font-rmedium text-center align-middle">
                        {item.id.slice(0, 8)}
                      </Text>
                    </View>
                    <QRCode
                      value={JSON.stringify({
                        ticket: item.id,
                        event: item.event.id,
                      })}
                      size={200}
                    />
                    {item.validated ? (
                      <View className="flex-row mt-2">
                        <Text className="text-sm font-rregular text-center align-middle text-gray-500 mr-2">
                          Validated:
                        </Text>
                        <Text className="text-sm font-rregular text-center align-middle text-gray-500">{`${new Date(item.validated).toLocaleDateString('cs-CZ')} - ${new Date(item.validated).toLocaleTimeString('cs-CZ', { minute: '2-digit', hour: '2-digit' })}`}</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={{ rowGap: 5 }}>
                    <View className="flex-row w-full justify-between">
                      <Text className="text-base font-rmedium text-center align-middle">
                        {item.event.name}
                      </Text>
                      <Text className="text-base font-rmedium text-center align-middle">
                        {`${item.price} ${currency}`}
                      </Text>
                    </View>
                    <View className="w-full items-start">
                      <Text className="text-base font-rregular text-center align-middle">
                        {`${new Date(item.event.date).toLocaleDateString('cs-CZ')} - ${new Date(item.event.date).toLocaleTimeString('cs-CZ', { minute: '2-digit', hour: '2-digit' })}`}
                      </Text>
                    </View>
                    <View className="w-full items-start">
                      <Text className="text-base font-rregular text-center align-middle">
                        {item.event.template.venue.name}
                      </Text>
                    </View>
                    <View className="w-full items-start">
                      <Text className="text-base font-rregular text-center align-middle">
                        {item.event.template.venue.hasSeats
                          ? `Section: ${item.section.name}, Row: ${item.row?.name}, Seat: ${item.seat?.name}`
                          : `Section: ${item.section.name}`}
                      </Text>
                    </View>
                    <View className="w-full items-start">
                      <Text className="text-sm font-rregular text-center align-middle text-gray-500">
                        {item.discount ? item.discount.name : 'No discount'}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="text-base font-rregular text-center align-middle">{`${index + 1}/${data?.ticketSet.length}`}</Text>
                  </View>
                </View>
              ))}
            </PagerView>
          </View>
          <ExitButton setVisible={setVisible} />
        </View>
      </View>
    </Modal>
  );
};

export default TicketModal;
