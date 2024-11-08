import { ScrollView, View } from 'react-native';
import React, { ReactElement } from 'react';

type Props = {
  children: React.ReactNode;
  refreshControl?: ReactElement;
  scrollEnabled?: boolean;
};

const Body = ({ children, refreshControl, scrollEnabled }: Props) => {
  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      refreshControl={refreshControl}
      className="w-full flex-1 h-full px-4">
      {children}
    </ScrollView>
  );
};

export default Body;
