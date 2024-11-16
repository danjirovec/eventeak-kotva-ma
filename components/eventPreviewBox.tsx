import { View, Text } from 'react-native';
import React from 'react';
import Poster from './poster';
import EventDatetime from './eventDatetime';
import Tag from './tag';
import MoreButton from './moreButton';
import { icons } from '@/constants';
import { Event } from '@/graphql/schema.types';

const EventPreviewBox = ({ item }: { item: Event }) => {
  return (
    <View className="flex flex-row w-full h-64 py-2 bg-gray-100 rounded-lg">
      <View className="flex flex-col justify-between w-5/12 h-full">
        <Poster posterUrl={item.template.posterUrl} />
        <EventDatetime date={item.date} />
      </View>
      <View className="flex flex-col justify-between w-7/12">
        <View className="flex flex-col mr-2">
          <Text className="text-xl font-rbold">{item.name}</Text>
          <View className="flex flex-row flex-wrap mt-2">
            <Tag tag={item.template.category} icon={icons.category} />
            <Tag tag={`${item.template.length} min`} icon={icons.duration} />
            {item.template.language ? (
              <Tag tag={item.template.language} icon={icons.volume} />
            ) : null}
            {item.template.subtitles ? (
              <Tag tag={item.template.subtitles} icon={icons.subtitles} />
            ) : null}
            <Tag tag={item.template.venue.name} icon={icons.location} />
          </View>
        </View>
        <View className="flex items-end">
          <MoreButton eventId={item.id} templateId={item.template.id} />
        </View>
      </View>
    </View>
  );
};

export default EventPreviewBox;
