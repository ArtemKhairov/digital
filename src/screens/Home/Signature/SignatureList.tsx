import {FC, useCallback} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';
import {SignatureItem} from './SignatureItem';
import type {SignatureItemProps} from './types';

type SignatureListProps = {
  header: string;
  data: SignatureItemProps[];
};

const SignatureList: FC<SignatureListProps> = ({header, data}) => {
  const renderItem: ListRenderItem<SignatureItemProps> = useCallback(
    ({item}) => {
      return <SignatureItem title={item.title} subTitle={item.subTitle} />;
    },
    []
  );

  const keyExtractor = (item: SignatureItemProps): string => item.subTitle;

  const listHeaderComponent = () => {
    return <Text>{header}</Text>;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={listHeaderComponent}
    />
  );
};

export {SignatureList};
