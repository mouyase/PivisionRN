import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export const ImagePage = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ImagePage</Text>
      <Button title="回" onPress={() => navigation.goBack()} ></Button>
      <Animated.Image source={{ uri: 'https://image.cdn2.seaart.me/2025-04-16/cvvusple878c73dj7jhg/0bc17625338756a5f493ce353b585da1_high.webp' }} style={{ width: 300, height: 300 }} sharedTransitionTag='image' />
    </View>
  );
};
