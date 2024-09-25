import { ScrollView, View } from 'react-native';
import React, { ReactElement } from 'react';

type Props = {
  children: React.ReactNode;
  refreshControl?: ReactElement;
};

const Body = ({ children, refreshControl }: Props) => {
  return (
    <ScrollView
      refreshControl={refreshControl}
      className="w-full flex-1 h-full px-4">
      {children}
    </ScrollView>
  );
};

export default Body;
