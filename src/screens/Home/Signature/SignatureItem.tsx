import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {SignatureItemProps} from './types';

const SignatureItem: FC<SignatureItemProps> = ({title, subTitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 11,
  },
  subTitle: {
    fontSize: 18,
  },
});

export {SignatureItem};
