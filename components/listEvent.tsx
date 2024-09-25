import { View, Text } from 'react-native';
import React from 'react';
import Poster from './poster';
import EventDatetime from './evetDatetime';
import Tag from './tag';
import SeeMore from './seeMoreButton';
import { icons } from '@/constants';
import { Event } from '@/graphql/schema.types';

const ListEvent = ({ item }: { item: Event }) => {
  return (
    <View className="flex flex-row w-full h-64 py-2 bg-gray-100 rounded-lg">
      <View className="flex flex-col justify-between w-5/12 h-full">
        <Poster posterUrl={item.posterUrl} />
        <EventDatetime date={item.date} />
      </View>
      <View className="flex flex-col justify-between w-7/12">
        <View className="flex flex-col mr-2">
          <Text className="text-xl font-rbold">{item.name}</Text>
          <View className="flex flex-row flex-wrap mt-2">
            <Tag tag={item.category} icon={icons.category} />
            <Tag tag={`${item.length} min`} icon={icons.duration} />
            <Tag tag={item.language} icon={icons.volume} />
            {item.subtitles ? (
              <Tag tag={item.subtitles} icon={icons.subtitles} />
            ) : null}
            <Tag tag={item.venue.name} icon={icons.location} />
          </View>
        </View>
        <View className="flex items-end">
          <SeeMore eventId={item.id} />
        </View>
      </View>
    </View>
  );
};

export default ListEvent;
