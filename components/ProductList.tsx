import { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      image: string;
    };
  }

interface Props {
  numColumns?: number;
  horizontalPadding?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const INITIAL_PAGE_SIZE = 10;

export const ProductList = ({
  numColumns = 2,
  horizontalPadding = 16,
}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    handleRefresh()
  }, [])

  const loadProducts = useCallback(async (currentOffset: number) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${currentOffset}&limit=1`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json();
      return data as Product[];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const newProducts = await loadProducts(0);
      setProducts(newProducts);
      setOffset(INITIAL_PAGE_SIZE);
      setHasMore(newProducts.length === INITIAL_PAGE_SIZE);
    } finally {
      setIsRefreshing(false);
    }
  }, [loadProducts]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isLoading || isLoadingMore) return;
    
    setReachedEnd(true);
  }, [hasMore, isLoading, isLoadingMore]);

  const handlePullToLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoading) return;

    setIsLoadingMore(true);
    try {
      const currentProducts = await loadProducts(offset);
      
      if (currentProducts.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts(prev => [...prev, ...currentProducts]);
      setOffset(prev => prev + 1);
    } finally {
      setIsLoadingMore(false);
      setReachedEnd(false);
    }
  }, [isLoadingMore, hasMore, isLoading, offset, loadProducts]);

  const renderItem = useCallback(({ item }: { item: Product }) => {
    if (!item?.images?.[0]) {
      return null
    }

    const columnWidth = (SCREEN_WIDTH - (horizontalPadding * 2) - (numColumns - 1) * 8) / numColumns;
    
    return (
      <View style={[styles.itemContainer, { width: columnWidth }]}>
        <View style={styles.imageContainer}>
          <Image
            source={item.images[0]}
            style={styles.image}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            recyclingKey={item.id.toString()}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>¥</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </View>
    );
  }, [numColumns, horizontalPadding]);

  return (
    <FlashList
      data={products}
      renderItem={renderItem}
      estimatedItemSize={200}
      numColumns={numColumns}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.2}
      onMomentumScrollEnd={() => {
        if (reachedEnd && hasMore) {
          handlePullToLoadMore();
        }
      }}
      contentContainerStyle={{
        paddingVertical: 8,
        paddingHorizontal: horizontalPadding
      }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>暂无商品</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          {isLoadingMore ? (
            <>
              <ActivityIndicator size="small" color="#666" />
              <Text style={styles.footerText}>加载中...</Text>
            </>
          ) : hasMore ? (
            <TouchableOpacity 
              onPress={handlePullToLoadMore}
              style={styles.loadMoreButton}
              disabled={isLoadingMore || isLoading}
            >
              <Text style={styles.loadMoreText}>点击加载更多</Text>
            </TouchableOpacity>
          ) : products.length > 0 ? (
            <Text style={styles.footerText}>没有更多商品了</Text>
          ) : null}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  itemContainer: {
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: '#333',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 12,
    color: '#ff4d4f',
    marginRight: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4d4f',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  loadMoreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  loadMoreText: {
    fontSize: 14,
    color: '#666',
  },
}); 
