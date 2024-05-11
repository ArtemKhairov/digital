import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type InformationItemProps = {
  title: string;
  subTitle?: string;
};
const InformationItem: FC<InformationItemProps> = ({title, subTitle}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  title: {
    fontSize: 11,
  },
  subTitle: {
    fontSize: 18,
  },
});

export default InformationItem;
