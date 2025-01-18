import {
  Button,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { EVENTS_QUERY } from '@/graphql/queries';
import CategoryFilter from '@/components/categoryFilter';
import Loader from '@/components/loader';
import { categories } from '@/lib/enums';
import EventPreviewBox from '@/components/eventPreviewBox';
import { useGlobalStore } from '@/context/globalProvider';
import Header from '@/components/header';
import NoScrollBody from '@/components/bodyNoScroll';
import Container from '@/components/container';

import DatePicker from 'react-native-neat-date-picker';
import { icons } from '@/constants';
import Icon from '@/components/icon';

const Program = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [refreshing, setRefreshing] = useState(false);
  const { business } = useGlobalStore(state => ({
    business: state.business,
  }));
  const [showDatePickerRange, setShowDatePickerRange] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const openDatePickerRange = () => {
    setShowRange(true);
    setShowDatePickerRange(true);
  };
  const onCancelRange = () => {
    setShowDatePickerRange(false);
    setShowRange(false);
  };
  const onConfirmRange = (output: any) => {
    setShowDatePickerRange(false);
    setStartDate(new Date(output.startDateString));
    setEndDate(new Date(output.endDateString));
    setShowRange(false);
  };
  const [searchName, setSearchName] = useState<string>('');
  const [showRange, setShowRange] = useState<boolean>(false);
  const currentDate = useMemo(() => new Date().toISOString(), []);
  const { data, loading, refetch, fetchMore, error } = useQuery(EVENTS_QUERY, {
    variables: {
      filter: {
        and: [
          { businessId: { eq: business } },
          { template: { category: { eq: selectedCategory } } },
          startDate && endDate
            ? {
                and: [
                  { date: { gte: startDate.toISOString() } },
                  { date: { lte: endDate.toISOString() } },
                ],
              }
            : { date: { gte: currentDate } },
          { name: { iLike: `%${searchName}%` } },
        ],
      },
      sorting: { field: 'date', direction: 'ASC' },
      paging: { limit: 10, offset: 0 },
    },
  });

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Container>
      <View className="w-full justify-start h-full">
        <Header title="Program" />
        <Modal
          visible={showRange}
          statusBarTranslucent
          hardwareAccelerated={true}
          animationType="fade"
          transparent={true}>
          <View className="justify-center items-center w-full h-fit p-5 bg-white rounded-lg">
            <DatePicker
              isVisible={showDatePickerRange}
              mode={'range'}
              onCancel={onCancelRange}
              onConfirm={onConfirmRange}
              minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
              colorOptions={{
                headerColor: '#CE9E19',
                selectedDateBackgroundColor: '#CE9E19',
                confirmButtonColor: '#225F78',
                weekDaysColor: '#225F78',
              }}
            />
          </View>
        </Modal>
        <NoScrollBody>
          <View className="mt-5">
            <FlatList
              data={categories}
              renderItem={item => (
                <CategoryFilter
                  item={item.item}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
            />
          </View>
          <View className="flex-row text-base font-rmedium w-full h-10 mt-2.5">
            <TextInput
              placeholder="Search by name"
              value={searchName}
              onChangeText={text => setSearchName(text)}
              className="text-base text-gray-500 font-rmedium h-10 w-9/12 border border-gray-500 rounded-lg px-5 mr-1"
              placeholderTextColor="#8e8e8e"
            />
            <View className="flex-row align-middle justify-around items-center gap-1 w-3/12">
              <TouchableOpacity
                className="h-5 w-5"
                onPress={openDatePickerRange}>
                <Icon
                  icon={icons.filter}
                  color="gray-500"
                  iconsStyles="h-6 w-6"
                />
              </TouchableOpacity>
              <TouchableOpacity className="h-5 w-5" onPress={clearFilters}>
                <Icon
                  icon={icons.clear}
                  color="gray-500"
                  iconsStyles="h-6 w-6"
                />
              </TouchableOpacity>
            </View>
          </View>
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              className="my-5"
              ListEmptyComponent={
                <Text className="text-xl font-rmedium self-center mt-5">
                  No events to show
                </Text>
              }
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: 20,
              }}
              showsVerticalScrollIndicator={false}
              data={data.events.nodes}
              renderItem={({ item }) => <EventPreviewBox item={item} />}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  colors={['#225F78']}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              onEndReached={() => {
                if (data?.events?.nodes.length < data?.events?.totalCount) {
                  fetchMore({
                    variables: {
                      paging: { offset: data?.events?.nodes.length, limit: 10 },
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prevResult;
                      return {
                        events: {
                          ...fetchMoreResult.events,
                          nodes: [
                            ...prevResult.events.nodes,
                            ...fetchMoreResult.events.nodes,
                          ],
                        },
                      };
                    },
                  });
                }
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loading ? <Loader /> : null}
            />
          )}
        </NoScrollBody>
      </View>
    </Container>
  );
};

export default Program;
