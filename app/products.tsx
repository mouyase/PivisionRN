import { View, StyleSheet } from 'react-native';
import { ProductList } from '../components/ProductList';

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <ProductList 
        numColumns={2}
        horizontalPadding={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 
