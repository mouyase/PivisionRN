import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export const HomePage = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomePage</Text>
      <Button title="去" onPress={() => navigation.navigate('ImagePage')} ></Button>
      <Animated.Image source={{ uri: 'https://image.cdn2.seaart.me/2025-04-16/cvvusple878c73dj7jhg/0bc17625338756a5f493ce353b585da1_high.webp' }} style={{ width: 100, height: 100 }} sharedTransitionTag='image' />
    </View>
  );
};
