
import React from "react";
import { Stack } from "expo-router";
import { 
  ScrollView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  Dimensions,
  TextInput
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles } from "@/styles/commonStyles";

const { width: screenWidth } = Dimensions.get('window');

// Mock data for the e-commerce home screen
const categories = [
  { id: '1', name: 'Mode', icon: 'tshirt.fill', color: colors.primary },
  { id: '2', name: 'Électronique', icon: 'iphone', color: colors.accent },
  { id: '3', name: 'Maison', icon: 'house.fill', color: colors.secondary },
  { id: '4', name: 'Alimentation', icon: 'fork.knife', color: colors.primary },
  { id: '5', name: 'Beauté', icon: 'heart.fill', color: colors.secondary },
  { id: '6', name: 'Sport', icon: 'figure.run', color: colors.accent },
];

const featuredProducts = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy',
    price: '450,000 FC',
    originalPrice: '500,000 FC',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    rating: 4.5,
    discount: '10%'
  },
  {
    id: '2',
    name: 'Robe Africaine Élégante',
    price: '75,000 FC',
    originalPrice: '90,000 FC',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop',
    rating: 4.8,
    discount: '17%'
  },
  {
    id: '3',
    name: 'Casque Audio Bluetooth',
    price: '120,000 FC',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    rating: 4.3,
    discount: null
  },
];

const promotionalBanners = [
  {
    id: '1',
    title: 'Livraison Gratuite',
    subtitle: 'Sur toutes les commandes de plus de 100,000 FC',
    backgroundColor: colors.primary,
    textColor: '#FFFFFF'
  },
  {
    id: '2',
    title: 'Retours Faciles',
    subtitle: '7 jours pour changer d\'avis',
    backgroundColor: colors.secondary,
    textColor: '#FFFFFF'
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greeting}>Bonjour! 👋</Text>
          <Text style={styles.appName}>Shopy Kin</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <IconSymbol name="bell.fill" size={24} color={colors.text} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={commonStyles.searchBar}>
        <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher des produits..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <IconSymbol name="mic.fill" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPromotionalBanners = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.bannersContainer}
    >
      {promotionalBanners.map((banner) => (
        <TouchableOpacity
          key={banner.id}
          style={[styles.promotionalBanner, { backgroundColor: banner.backgroundColor }]}
        >
          <Text style={[styles.bannerTitle, { color: banner.textColor }]}>
            {banner.title}
          </Text>
          <Text style={[styles.bannerSubtitle, { color: banner.textColor }]}>
            {banner.subtitle}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderCategories = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Catégories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[commonStyles.categoryCard, styles.categoryCard]}
          >
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <IconSymbol name={category.icon} size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFeaturedProducts = () => (
    <View style={styles.section}>
      <View style={commonStyles.spaceBetween}>
        <Text style={styles.sectionTitle}>Produits Populaires</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Voir tout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {featuredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[commonStyles.productCard, styles.productCard]}
          >
            <View style={styles.productImageContainer}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              {product.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{product.discount}</Text>
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" size={14} color={colors.secondary} />
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>{product.price}</Text>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
      )}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {renderPromotionalBanners()}
        {renderCategories()}
        {renderFeaturedProducts()}
        
        {/* Additional spacing for floating tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    ...commonStyles.textSecondary,
    fontSize: 16,
  },
  appName: {
    ...commonStyles.title,
    fontSize: 24,
    color: colors.primary,
    fontWeight: '700',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  bannersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  promotionalBanner: {
    width: screenWidth * 0.8,
    padding: 20,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.9,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...commonStyles.subtitle,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: 100,
    height: 100,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  productCard: {
    width: 180,
    marginRight: 12,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});
