import {
  SectionList,
  StyleSheet,
  View,
  Text,
  SectionListRenderItem,
} from 'react-native';

type Signature = {
  title: string;
  data: SignatureItem[];
};

type SignatureItem = {
  subTitle: string;
  value: string;
};

const SIGNATURES: Signature[] = [
  {
    title: 'Advanced electronice signature',
    data: [
      {
        subTitle: 'Given names',
        value: 'Artem',
      },
      {
        subTitle: 'Surname',
        value: 'Khairov',
      },
      {
        subTitle: 'Certificate date of expiry',
        value: '06.05.2034',
      },
      {
        subTitle: 'Serial number',
        value: '1B233F143534DFR90000000RTR3',
      },
    ],
  },
  {
    title: 'Qualified electronic signature',
    data: [
      {
        subTitle: 'Given names',
        value: 'Artem',
      },
      {
        subTitle: 'Surname',
        value: 'Khairov',
      },
      {
        subTitle: 'Certificate date of expiry',
        value: '06.05.2034',
      },
      {
        subTitle: 'Serial number',
        value: '1B233F143534DFR90000000RTR3',
      },
    ],
  },
];

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const PersonalData = () => {
  const keyExtractor = (item: Signature, index: number) => {
    return String(item.title + index);
  };

  //   const renedrItem: SectionListRenderItem<SignatureItem, Signature> = ({
  //     item,
  //   }) => {
  //     return (
  //       <View>
  //         {item.data.map(subItem => {
  //           return (
  //             <View style={styles.itemRow}>
  //               <Text style={styles.subTitle}>{subItem.subTitle}</Text>
  //               <Text style={styles.title}>{subItem.value}</Text>
  //             </View>
  //           );
  //         })}
  //       </View>
  //     );
  //   };
  const renderItem = (item) => {
    console.log(item, 'item');
    return (
      <View>
        <Text>Text</Text>
      </View>
    );
  };

  return (
    <SectionList
      sections={DATA}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  itemRow: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontSize: 11,
  },
  subTitle: {
    fontSize: 18,
  },
});

export {PersonalData};
