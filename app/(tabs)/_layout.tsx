import { Text, View, Image, ImageSourcePropType } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { icons } from '@/constants';
import Loader from '@/components/loader';
import { useGlobalStore } from '@/context/globalProvider';

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
      <Text className={`${focused ? 'font-rbold' : 'font-rmedium'} text-xs`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const { isLoading, isLogged, isLoggingOut } = useGlobalStore(state => ({
    isLoading: state.isLoading,
    isLogged: state.isLogged,
    isLoggingOut: state.isLoggingOut,
  }));

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
              backgroundColor: '#f7f7f7',
              height: 84,
              display: !isLoggingOut ? 'flex' : 'none',
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
