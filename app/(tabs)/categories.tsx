
import React from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  TextInput,
  FlatList
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles } from "@/styles/commonStyles";

// Mock categories data
const mainCategories = [
  {
    id: '1',
    name: 'Mode & Vêtements',
    icon: 'tshirt.fill',
    color: colors.primary,
    itemCount: 1250,
    subcategories: ['Hommes', 'Femmes', 'Enfants', 'Chaussures', 'Accessoires']
  },
  {
    id: '2',
    name: 'Électronique',
    icon: 'iphone',
    color: colors.accent,
    itemCount: 890,
    subcategories: ['Smartphones', 'Ordinateurs', 'TV & Audio', 'Appareils Photo']
  },
  {
    id: '3',
    name: 'Maison & Jardin',
    icon: 'house.fill',
    color: colors.secondary,
    itemCount: 650,
    subcategories: ['Meubles', 'Décoration', 'Cuisine', 'Jardin', 'Bricolage']
  },
  {
    id: '4',
    name: 'Alimentation',
    icon: 'fork.knife',
    color: colors.primary,
    itemCount: 420,
    subcategories: ['Fruits & Légumes', 'Viandes', 'Boissons', 'Épicerie']
  },
  {
    id: '5',
    name: 'Beauté & Santé',
    icon: 'heart.fill',
    color: colors.secondary,
    itemCount: 380,
    subcategories: ['Cosmétiques', 'Soins', 'Parfums', 'Santé']
  },
  {
    id: '6',
    name: 'Sport & Loisirs',
    icon: 'figure.run',
    color: colors.accent,
    itemCount: 290,
    subcategories: ['Fitness', 'Sports', 'Jeux', 'Livres']
  },
  {
    id: '7',
    name: 'Auto & Moto',
    icon: 'car.fill',
    color: colors.primary,
    itemCount: 180,
    subcategories: ['Pièces Auto', 'Accessoires', 'Motos', 'Outils']
  },
  {
    id: '8',
    name: 'Bébé & Enfant',
    icon: 'figure.2.and.child.holdinghands',
    color: colors.secondary,
    itemCount: 340,
    subcategories: ['Vêtements Bébé', 'Jouets', 'Puériculture', 'École']
  },
];

const popularSearches = [
  'Samsung Galaxy', 'Robe Africaine', 'Chaussures Nike', 'iPhone', 
  'Ordinateur Portable', 'Télévision', 'Réfrigérateur', 'Canapé'
];

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredCategories, setFilteredCategories] = React.useState(mainCategories);

  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(mainCategories);
    } else {
      const filtered = mainCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subcategories.some(sub => 
          sub.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery]);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Catégories</Text>
      
      {/* Search Bar */}
      <View style={commonStyles.searchBar}>
        <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une catégorie..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderPopularSearches = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recherches Populaires</Text>
      <View style={styles.tagsContainer}>
        {popularSearches.map((search, index) => (
          <TouchableOpacity
            key={index}
            style={styles.searchTag}
            onPress={() => setSearchQuery(search)}
          >
            <Text style={styles.searchTagText}>{search}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCategoryItem = ({ item }: { item: typeof mainCategories[0] }) => (
    <TouchableOpacity style={[commonStyles.card, styles.categoryItem]}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIconContainer, { backgroundColor: item.color }]}>
          <IconSymbol name={item.icon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryCount}>{item.itemCount} produits</Text>
        </View>
        <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
      </View>
      
      <View style={styles.subcategoriesContainer}>
        {item.subcategories.slice(0, 4).map((subcategory, index) => (
          <TouchableOpacity key={index} style={styles.subcategoryTag}>
            <Text style={styles.subcategoryText}>{subcategory}</Text>
          </TouchableOpacity>
        ))}
        {item.subcategories.length > 4 && (
          <TouchableOpacity style={styles.subcategoryTag}>
            <Text style={styles.subcategoryText}>+{item.subcategories.length - 4}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
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
      
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {searchQuery.trim() === '' && renderPopularSearches()}
          </View>
        }
        contentContainerStyle={[
          styles.listContainer,
          Platform.OS !== 'ios' && styles.listContainerWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    ...commonStyles.title,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    ...commonStyles.subtitle,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  searchTag: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  searchTagText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  listContainerWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  categoryItem: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  subcategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  subcategoryTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  subcategoryText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
