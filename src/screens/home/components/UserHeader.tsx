import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Layout, Text, Icon, Button} from '@ui-kitten/components';
import Avatar from './Avatar';
import {creditsToDollars} from '../../../utils/moneyConversion';

import user from '../../../data/user.json';

const UserHeader: React.FC = (): React.JSX.Element => {
  const {name, lastName, credits} = user;

  return (
    <Layout level="2" style={styles.container}>
      <View style={styles.leftContainer}>
        <Avatar name={name} surname={lastName} />
        <View style={styles.textContainer}>
          <View style={styles.rowName}>
            <Text
              category="h6"
              style={styles.name}
              testID="UserHeader-completeName">
              {name} {lastName}
            </Text>
            {/* <Icon name="checkmark-circle-outline" style={styles.premiumIcon} /> */}
          </View>

          <View style={styles.creditsContainer}>
            <Text
              category="p1"
              style={styles.credits}
              testID="UserHeader-credits">
              {credits} credits
            </Text>
            <Text category="p1" appearance="hint">
              (${creditsToDollars(credits)})
            </Text>
          </View>
        </View>
      </View>
      <Button
        style={styles.button}
        size="small"
        accessoryLeft={() => <Icon name="plus" style={styles.icon} />}>
        Credits
      </Button>
    </Layout>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 8,
    padding: 12,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  rowName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 23,
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  credits: {marginRight: 6},
  premiumIcon: {
    width: 20,
    height: 20,
    tintColor: '#a2ff9f',
  },
  button: {
    borderRadius: 25,
  },
});
