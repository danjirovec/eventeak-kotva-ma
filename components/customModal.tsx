// import { StatusBar } from 'expo-status-bar';
// import React, { useState } from 'react';
// import { Button, Text, View } from 'react-native';
// import Modal from 'react-native-modal';
// import CustomButton from './customButton';
// import { Href, router } from 'expo-router';

// function ModalTester({
//   text,
//   redirectTo,
//   visible,
//   setVisible,
// }: {
//   text: { title: string; description?: string };
//   redirectTo?: Href;
//   visible: boolean;
//   setVisible: (visible: boolean) => void;
// }) {
//   const toggleModal = () => {
//     setVisible(!visible);
//   };

//   return (
//     <Modal
//       coverScreen
//       statusBarTranslucent
//       isVisible={visible}
//       animationIn="fadeIn"
//       animationInTiming={100}
//       animationOut="fadeOut"
//       animationOutTiming={100}
//       hideModalContentWhileAnimating={true}
//       useNativeDriver={true}
//       backdropOpacity={0.1}
//       onBackdropPress={() => setVisible(false)}
//       onBackButtonPress={() => setVisible(false)}>
//       <View
//         className="flex p-0 my-auto justify-center items-center w-full h-full"
//         style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
//         <View className="flex justify-center items-center w-9/12 h-fit p-5 bg-white rounded-lg">
//           <Text className="font-rmedium text-black text-xl">{text.title}</Text>
//           {text.description ? (
//             <Text className="text-base font-rregular mt-5">
//               {text.description}
//             </Text>
//           ) : null}
//           <CustomButton
//             title="Ok"
//             handlePress={() => {
//               setVisible(!visible);
//               if (redirectTo) {
//                 router.replace(redirectTo);
//               }
//             }}
//             textStyles="color-primary"
//             containerStyles="w-32 mt-5 bg-white border-primary border-2"
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// export default ModalTester;

import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Animated, Button, StyleSheet } from 'react-native';
import CustomButton from './customButton';
import { Href, router } from 'expo-router';

type Props = {
  children?: React.ReactNode;
  text: { title: string; description?: string };
  redirectTo?: Href;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const CustomModalTEST = ({
  children,
  text,
  redirectTo,
  visible,
  setVisible,
}: Props) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const showModal = () => {
    setVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100, // Speed up animation (200ms)
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200, // Speed up exit animation (200ms)
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Show Modal" onPress={showModal} />
      <Modal
        statusBarTranslucent
        transparent
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <Animated.View style={[styles.modalBackground, { opacity }]}>
          <View
            className="flex my-auto justify-center items-center w-full h-full"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <View className="flex justify-center items-center w-9/12 h-fit p-5 bg-white rounded-lg">
              <Text className="font-rmedium text-black text-xl">
                {text.title}
              </Text>
              {text.description ? (
                <Text className="text-base font-rregular mt-5">
                  {text.description}
                </Text>
              ) : null}
              <CustomButton
                title="Ok"
                handlePress={() => {
                  hideModal();
                  if (redirectTo) {
                    router.replace(redirectTo);
                  }
                }}
                textStyles="color-primary"
                containerStyles="w-32 mt-5 bg-white border-primary border-2"
              />
            </View>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default CustomModalTEST;
