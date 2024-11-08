import { FlatList, RefreshControl, Text, View } from 'react-native';
import React, { useState } from 'react';
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

const Program = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [refreshing, setRefreshing] = useState(false);
  const { business } = useGlobalStore(state => ({
    business: state.business,
  }));
  const { data, loading, refetch, fetchMore } = useQuery(EVENTS_QUERY, {
    variables: {
      filter: {
        and: [
          { businessId: { eq: business } },
          { category: { eq: selectedCategory } },
        ],
      },
      sorting: { field: 'date', direction: 'ASC' },
      paging: { limit: 10, offset: 0 },
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Container>
      <View className="w-full justify-start h-full">
        <Header title="Program" />
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
              keyExtractor={item => item}></FlatList>
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
