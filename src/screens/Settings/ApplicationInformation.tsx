import {useCallback} from 'react';
import {FlatList, Text, ListRenderItem, StyleSheet} from 'react-native';
import InformationItem from './InformationItem';

const APPLICATION_INFORMATION_LIST = [
  {
    id: 0,
    title: 'Версия',
    subTitle: '0.0.1',
  },
  {
    id: 1,
    title: 'Язык',
    subTitle: 'Русский',
  },
  {
    id: 2,
    title: 'Разрешения',
  },
];

type ListItem = {
  id: number;
  title: string;
  subTitle?: string;
};

const ApplicationInformation = () => {
  const keyExtractor = (item: ListItem): string => String(item.id);
  const renderItem: ListRenderItem<ListItem> = useCallback(({item}) => {
    return <InformationItem title={item.title} subTitle={item.subTitle} />;
  }, []);
  const listHeaderComponent = () => {
    return <Text>Информация о приложении</Text>;
  };
  return (
    <FlatList
      numColumns={1}
      data={APPLICATION_INFORMATION_LIST}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={listHeaderComponent}
      ListHeaderComponentStyle={styles.header}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 11,
  },
});

export default ApplicationInformation;
