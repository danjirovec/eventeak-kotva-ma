import { View, Image } from 'react-native';
import React from 'react';
import { bucketUrl } from '@/lib/config';

const Poster = ({
  posterUrl,
  containerStyles,
}: {
  posterUrl: string | null | undefined;
  containerStyles?: string;
}) => {
  return (
    <>
      {posterUrl ? (
        <Image
          className={`w-32 aspect-[10/14] rounded-lg ml-2 ${containerStyles}`}
          resizeMode="cover"
          source={{ uri: `${bucketUrl}posters/${posterUrl}` }}
        />
      ) : (
        <View
          className={`w-32 aspect-[10/14] bg-slate-500 rounded-lg ml-2 ${containerStyles}`}
        />
      )}
    </>
  );
};

export default Poster;
