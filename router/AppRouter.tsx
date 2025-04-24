import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/home/HomePage';
import ImagePage from '../pages/home/ImagePage';


const Stack = createNativeStackNavigator();



export const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ImagePage" component={ImagePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
