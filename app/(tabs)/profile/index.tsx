import {
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import { logout } from '@/lib/supabase';
import { router } from 'expo-router';
import Icon from '@/components/icon';
import { icons } from '@/constants';
import { useMutation, useQuery } from '@apollo/client';
import { MEMBERSHIP_TYPES_QUERY, USER_PROFILE_QUERY } from '@/graphql/queries';
import { bucketUrl } from '@/lib/config';
import Loader from '@/components/loader';
import { UserProfile } from '@/graphql/schema.types';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalStore } from '@/context/globalProvider';
import { client } from '@/apollo/client';
import Body from '@/components/body';
import Container from '@/components/container';
import Header from '@/components/header';
import CustomButton from '@/components/customButton';
import SlideAlert from '@/components/slideAlert';
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import {
  UPDATE_MEMBERSHIP_MUTATION,
  UPDATE_USER_AVATAR_MUTATION,
} from '@/graphql/mutations';
import MembershipExtendModal from '@/components/membershipExtendModal';
import MembershipModal from '@/components/membershipModal';

const Profile = () => {
  const { business, userId, isLoggingOut, setIsLoggingOut } = useGlobalStore(
    state => ({
      business: state.business,
      userId: state.userId,
      isLoggingOut: state.isLoggingOut,
      setIsLoggingOut: state.setIsLoggingOut,
    }),
  );

  const { data, loading, refetch, error } = useQuery(USER_PROFILE_QUERY, {
    variables: {
      meta: business,
      filter: { id: { eq: userId } },
      paging: { limit: 1 },
    },
  });

  const {
    data: membershipTypes,
    loading: membershipTypesLoading,
    refetch: membershipTypesRefetch,
    error: membershipTypesError,
  } = useQuery(MEMBERSHIP_TYPES_QUERY, {
    variables: {
      filter: { businessId: { eq: business } },
      paging: { limit: 50 },
    },
  });

  const [
    updateOneMembership,
    { loading: membershipLoading, error: membershipError },
  ] = useMutation(UPDATE_MEMBERSHIP_MUTATION);
  const [updateOneUser, { loading: uploadLoading, error: uploadError }] =
    useMutation(UPDATE_USER_AVATAR_MUTATION);
  const [refreshing, setRefreshing] = useState(false);
  const [membershipAlertVisible, setMembershipAlertVisible] = useState(false);
  const [imageAlertVisible, setImageAlertVisible] = useState(false);
  const [imageSizeAlertVisible, setImageSizeAlertVisible] = useState(false);
  const [membershipModalVisible, setMembershipModalVisible] = useState(false);
  const [extendMemModalVisible, setExntendMemModalVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result.assets && result.assets[0].fileSize) {
      if (result.assets[0].fileSize > 524288) {
        showImageSizeAlert();
        return;
      }
    }

    if (!result.canceled) {
      if (user.avatarUrl) {
        const { error } = await supabase.storage
          .from('applausio')
          .remove([`avatars/${user.avatarUrl}`]);
        if (error) {
          console.log(error);
          return null;
        }
      }
      const hexId = Date.now().toString(32);
      const base64 = result.assets[0].base64;
      if (!base64) {
        return null;
      }
      const { error } = await supabase.storage
        .from('applausio')
        .upload(`avatars/${hexId}`, decode(base64), {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg',
        });
      if (error) {
        console.log(error);
        return null;
      }
      try {
        await updateOneUser({
          variables: {
            input: {
              id: user.id,
              update: {
                avatarUrl: hexId,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
      await refetch();
      showImageAlert();
    }
  };

  const extendMembership = async () => {
    let expiryDate = new Date();
    if (user.membership?.expiryDate) {
      expiryDate = new Date(user.membership?.expiryDate);
    }
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    try {
      await updateOneMembership({
        variables: {
          input: {
            id: user.membership?.id,
            update: {
              expiryDate: expiryDate,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    showMemnershipAlert();
  };

  const showMemnershipAlert = () => {
    setMembershipAlertVisible(true);
    setTimeout(() => setMembershipAlertVisible(false), 3500);
  };

  const showImageAlert = () => {
    setImageAlertVisible(true);
    setTimeout(() => setImageAlertVisible(false), 3500);
  };

  const showImageSizeAlert = () => {
    setImageSizeAlertVisible(true);
    setTimeout(() => setImageSizeAlertVisible(false), 3500);
  };

  const submit = async () => {
    setIsLoggingOut(true);
    const error = await logout();
    if (error) {
    }
    client.clearStore();
    setIsLoggingOut(false);
  };

  const user: UserProfile = data?.profileInfo;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await membershipTypesRefetch();
    setRefreshing(false);
  };

  return (
    <Container>
      {isLoggingOut || loading || membershipTypesLoading ? (
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
          <Body
            refreshControl={
              <RefreshControl
                colors={['#225F78']}
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={80}
              />
            }>
            <MembershipExtendModal
              extend={extendMembership}
              visible={extendMemModalVisible}
              setVisible={setExntendMemModalVisible}
              user={user.id}
            />
            <MembershipModal
              data={membershipTypes.membershipTypes.nodes}
              visible={membershipModalVisible}
              setVisible={setMembershipModalVisible}
            />
            <View style={{ rowGap: 15 }}>
              <View className="items-center mt-5">
                <View>
                  {user.avatarUrl ? (
                    <Image
                      className={`w-32 h-32 rounded-full`}
                      resizeMode="cover"
                      source={{
                        uri: `${bucketUrl}avatars/${user.avatarUrl}`,
                      }}
                    />
                  ) : (
                    <View className="w-32 h-32 bg-slate-400 rounded-full" />
                  )}
                  <TouchableOpacity onPress={pickImage}>
                    <Icon
                      icon={icons.camera}
                      color="#225F78"
                      iconsStyles="w-8 h-8 absolute bottom-0 right-0"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="items-center">
                <Text className="text-center text-xl align-middle font-rmedium">{`${user.firstName} ${user.lastName}`}</Text>
              </View>
              <View style={{ rowGap: 15 }}>
                <View className="bg-gray-100 rounded-lg p-3">
                  <View>
                    <Text className="text-base self-start align-middle bg-white rounded-xl p-1">
                      Personal Information
                    </Text>
                  </View>
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Email:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {user.email}
                    </Text>
                  </View>
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Birth Date:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {new Date(user.birthDate).toLocaleDateString('cs-CZ')}
                    </Text>
                  </View>
                  {user.placeOfResidence ? (
                    <View className="flex-row" style={{ columnGap: 10 }}>
                      <Text className="text-base text-center align-middle font-rregular">
                        Place of Residence:
                      </Text>
                      <Text className="text-base text-center align-middle font-rmedium">
                        {user.placeOfResidence}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View className="bg-gray-100 rounded-lg p-3">
                  <View>
                    <Text className="text-base self-start align-middle bg-white rounded-xl p-1">
                      Stats
                    </Text>
                  </View>
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Events:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {user.eventsVisited}
                    </Text>
                  </View>
                  <View className="flex-row" style={{ columnGap: 10 }}>
                    <Text className="text-base text-center align-middle font-rregular">
                      Benefits:
                    </Text>
                    <Text className="text-base text-center align-middle font-rmedium">
                      {user.benefitsUsed}
                    </Text>
                  </View>
                </View>
                {user.membership ? (
                  <View className="bg-gray-100 rounded-lg p-3">
                    <View>
                      <Text className="text-base self-start align-middle bg-white rounded-xl p-1">
                        Membership
                      </Text>
                    </View>
                    <View className="flex-row" style={{ columnGap: 10 }}>
                      <Text className="text-base text-center align-middle font-rregular">
                        Type:
                      </Text>
                      <Text className="text-base text-center align-middle font-rmedium">
                        {user.membership.membershipType.name}
                      </Text>
                    </View>
                    <View className="flex-row" style={{ columnGap: 10 }}>
                      <Text className="text-base text-center align-middle font-rregular">
                        Points:
                      </Text>
                      <Text className="text-base text-center align-middle font-rmedium">
                        {user.membership.points}
                      </Text>
                    </View>
                    <View className="flex-row" style={{ columnGap: 10 }}>
                      <Text className="text-base text-center align-middle font-rregular">
                        Expiry Date:
                      </Text>
                      <Text className="text-base text-center align-middle font-rmedium">
                        {new Date(
                          user.membership.expiryDate,
                        ).toLocaleDateString('cs-CZ')}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
              <SlideAlert
                success={false}
                message="Image size too large"
                description="Must be less than 500 kB"
                visible={imageSizeAlertVisible}
              />
              <SlideAlert
                success={true}
                message="Image uploaded"
                visible={imageAlertVisible}
              />
              <SlideAlert
                success={true}
                message="Membership extended"
                visible={membershipAlertVisible}
              />
              {user.membership?.state == 'Renewal' && (
                <CustomButton
                  title="Extend membership"
                  handlePress={async () => {
                    setExntendMemModalVisible(true);
                  }}
                />
              )}
              {!user.membership && (
                <CustomButton
                  title="Get membership"
                  handlePress={() => {
                    setMembershipModalVisible(true);
                  }}
                />
              )}
            </View>
          </Body>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Profile;
