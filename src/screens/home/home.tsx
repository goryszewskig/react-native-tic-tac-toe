import React, { ReactElement } from 'react';
import { ScrollView, Image, View } from 'react-native';
import styles from './home.styles';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParams } from '@config/navigator';
import { GradientBackground } from '@components';
import { Button } from '@components';

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Home'>;
};

export default function Home({ navigation }: HomeProps): ReactElement {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={require('@assets/logo.png')} />
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('SinglePlayerGame')}
            title='Single Player'
          />
          <Button
            style={styles.button}
            onPress={() => alert(true)}
            title='Multi Player'
          />
          <Button
            style={styles.button}
            onPress={() => alert(true)}
            title='Login'
          />
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
            title='Settings'
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
