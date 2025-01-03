import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="products" 
        options={{
          title: '商品列表',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
    </Stack>
  );
} 
