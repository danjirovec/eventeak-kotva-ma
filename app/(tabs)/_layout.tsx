import { Text, View, Image, ImageSourcePropType } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { icons } from '@/constants';
import Loader from '@/components/loader';
import { useGlobalStore } from '@/context/globalProvider';
import { useQuery } from '@apollo/client';
import { BUSINESS_QUERY } from '@/graphql/queries';
import useNetworkStatus from '@/components/network';

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? 'font-rbold' : 'font-rmedium'} text-xs w-full`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const isConnected = useNetworkStatus();
  const { isLoading, isLogged, isLoggingOut, business, setCurrency } =
    useGlobalStore(state => ({
      isLoading: state.isLoading,
      isLogged: state.isLogged,
      isLoggingOut: state.isLoggingOut,
      business: state.business,
      setCurrency: state.setCurrency,
    }));

  const { data, loading } = useQuery(BUSINESS_QUERY, {
    variables: {
      filter: { id: { eq: business } },
      paging: { limit: 1 },
    },
  });

  useEffect(() => {
    if (data) {
      setCurrency(data.businesses.nodes[0].currency);
    }
  }, [loading]);

  if (!isConnected) {
    return <Redirect href={'/connection'} />;
  }

  if (!isLoading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      {!isLoading ? (
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#a5a5a5',
            tabBarStyle: {
              borderWidth: 0,
              backgroundColor: '#f7f7f7',
              height: 84,
              display: !isLoggingOut ? 'flex' : 'none',
              borderTopWidth: 0, // Removes the top border
              elevation: 0, // Removes the shadow on Android
              shadowOpacity: 0, // Removes the shadow on iOS
              borderTopColor: 'transparent',
            },
          }}>
          <Tabs.Screen
            name="program"
            options={{
              title: 'Program',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.calendar}
                  color={color}
                  name="Program"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="benefits"
            options={{
              title: 'Benefits',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.benefits}
                  color={color}
                  name="Benefits"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="tickets"
            options={{
              title: 'Tickets',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.ticket}
                  color={color}
                  name="Tickets"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.user}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      ) : (
        <Loader />
      )}

      <StatusBar backgroundColor="#f7f7f7" style="dark" />
    </>
  );
};

export default TabsLayout;
