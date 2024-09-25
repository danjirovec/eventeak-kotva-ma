import {
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import { logout } from '@/lib/supabase';
import { router, useFocusEffect } from 'expo-router';

import Icon from '@/components/icon';
import { icons } from '@/constants';
import { useQuery } from '@apollo/client';
import { USER_PROFILE_QUERY } from '@/graphql/queries';
import { bucketUrl } from '@/lib/config';
import Loader from '@/components/loader';
import { UserProfile } from '@/graphql/schema.types';
import * as DocumentPicker from 'expo-document-picker';
import { useGlobalStore } from '@/context/globalProvider';
import { client } from '@/apollo/client';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';
import CustomButton from '@/components/customButton';
import SlideAlert from '@/components/slideAlert';

const Profile = () => {
  const { business, userId, isLoggingOut, setIsLoggingOut } = useGlobalStore(
    state => ({
      business: state.business,
      userId: state.userId,
      isLoggingOut: state.isLoggingOut,
      setIsLoggingOut: state.setIsLoggingOut,
    }),
  );
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

  const showAlert = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3500);
  };

  const { data, loading, refetch, error } = useQuery(USER_PROFILE_QUERY, {
    variables: {
      meta: business,
      filter: { id: { eq: userId } },
      paging: { limit: 1 },
    },
  });

  const submit = async () => {
    setIsLoggingOut(true);
    const error = await logout();
    if (error) {
    }
    client.clearStore();
    setIsLoggingOut(false);
  };

  const user: UserProfile = data?.profile;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Container>
      {isLoggingOut ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Header
            left={
              <TouchableOpacity
                className="p-2"
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/profile/settings',
                    params: { user: JSON.stringify(user) },
                  })
                }>
                <Icon
                  icon={icons.settings}
                  color="#225F78"
                  iconsStyles="w-6 h-6"
                />
              </TouchableOpacity>
            }
            right={
              <TouchableOpacity className="p-2" onPress={submit}>
                <Icon
                  icon={icons.signout}
                  color="#225F78"
                  iconsStyles="w-6 h-6"
                />
              </TouchableOpacity>
            }
            title="Profile"
          />
          {loading ? (
            <Loader />
          ) : (
            <Body
              refreshControl={
                <RefreshControl
                  colors={['#225F78']}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  progressViewOffset={80}
                />
              }>
              <View className="" style={{ rowGap: 20 }}>
                <View className="items-center mt-5">
                  {user.avatarUrl ? (
                    <Image
                      className={`w-32 aspect-[10/14] rounded-lg ml-2`}
                      resizeMode="cover"
                      source={{ uri: `${bucketUrl}posters/${user.avatarUrl}` }}
                    />
                  ) : (
                    <View className="w-40 h-40 bg-slate-500 rounded-full"></View>
                  )}
                </View>
                <View className="items-center">
                  <Text className="text-center text-xl align-middle font-rmedium">{`${user.firstName} ${user.lastName}`}</Text>
                </View>
                <View className="bg-gray-100 rounded-lg p-3">
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Email:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {user.email}
                    </Text>
                  </View>
                  {user.placeOfResidence ? (
                    <View className="flex-row" style={{ columnGap: 10 }}>
                      <Text className="text-base text-center align-middle font-rregular">
                        Place of residence:
                      </Text>
                      <Text className="text-base text-center align-middle font-rmedium">
                        {user.placeOfResidence}
                      </Text>
                    </View>
                  ) : null}
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Member since:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {new Date(user.created).toLocaleDateString('cs-CZ')}
                    </Text>
                  </View>
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Membership points:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {user.membershipPoints}
                    </Text>
                  </View>
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Events visited:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {user.eventsVisited}
                    </Text>
                  </View>
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Benefits used:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {user.benefitsUsed}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => showAlert()}>
                  <View className="h-8 w-full bg-orange-600"></View>
                </TouchableOpacity>
                <SlideAlert
                  success={true}
                  message="Action failed"
                  visible={visible}
                />
                <CustomButton title="Become member" handlePress={() => {}} />
                <CustomButton
                  title="Delete account"
                  handlePress={() => {}}
                  containerStyles="bg-red-400"
                />
              </View>
            </Body>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default Profile;
