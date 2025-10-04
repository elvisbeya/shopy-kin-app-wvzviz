
import React from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  Image,
  Alert
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles, buttonStyles, textStyles } from "@/styles/commonStyles";

// Mock cart data
const cartItems = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy A54',
    price: 450000,
    originalPrice: 500000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    vendor: 'TechStore Kinshasa',
    inStock: true,
  },
  {
    id: '2',
    name: 'Robe Africaine Élégante',
    price: 75000,
    originalPrice: null,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop',
    vendor: 'Mode Africaine',
    inStock: true,
  },
  {
    id: '3',
    name: 'Casque Audio Bluetooth',
    price: 120000,
    originalPrice: null,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    vendor: 'Audio Pro',
    inStock: false,
  },
];

const paymentMethods = [
  { id: '1', name: 'Mobile Money (M-Pesa)', icon: 'creditcard.fill', available: true },
  { id: '2', name: 'Airtel Money', icon: 'creditcard.fill', available: true },
  { id: '3', name: 'Orange Money', icon: 'creditcard.fill', available: true },
  { id: '4', name: 'Cash à la livraison', icon: 'banknote.fill', available: true },
  { id: '5', name: 'Carte bancaire', icon: 'creditcard.fill', available: false },
];

export default function CartScreen() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(
    cartItems.filter(item => item.inStock).map(item => item.id)
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState('1');

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const updateQuantity = (itemId: string, change: number) => {
    console.log(`Update quantity for item ${itemId} by ${change}`);
    // In a real app, this would update the cart state
  };

  const removeItem = (itemId: string) => {
    Alert.alert(
      'Supprimer l\'article',
      'Êtes-vous sûr de vouloir supprimer cet article du panier?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => {
          console.log(`Remove item ${itemId}`);
          // In a real app, this would remove the item from cart
        }}
      ]
    );
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id) && item.originalPrice)
      .reduce((savings, item) => savings + ((item.originalPrice! - item.price) * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF',
      minimumFractionDigits: 0,
    }).format(price).replace('CDF', 'FC');
  };

  const renderCartItem = (item: typeof cartItems[0]) => {
    const isSelected = selectedItems.includes(item.id);
    
    return (
      <View key={item.id} style={[commonStyles.card, styles.cartItem]}>
        <View style={styles.itemHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => item.inStock && toggleItemSelection(item.id)}
            disabled={!item.inStock}
          >
            <View style={[
              styles.checkboxInner,
              isSelected && styles.checkboxSelected,
              !item.inStock && styles.checkboxDisabled
            ]}>
              {isSelected && (
                <IconSymbol name="checkmark" size={14} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
          >
            <IconSymbol name="trash.fill" size={16} color={colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.itemContent}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.vendorName}>{item.vendor}</Text>
            
            {!item.inStock && (
              <View style={styles.outOfStockBadge}>
                <Text style={styles.outOfStockText}>Rupture de stock</Text>
              </View>
            )}
            
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>{formatPrice(item.price)}</Text>
              {item.originalPrice && (
                <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
              )}
            </View>
            
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
                onPress={() => updateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
              >
                <IconSymbol name="minus" size={14} color={colors.text} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{item.quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <IconSymbol name="plus" size={14} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderPaymentMethods = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mode de paiement</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === method.id && styles.paymentMethodSelected,
            !method.available && styles.paymentMethodDisabled
          ]}
          onPress={() => method.available && setSelectedPaymentMethod(method.id)}
          disabled={!method.available}
        >
          <View style={styles.paymentMethodContent}>
            <IconSymbol 
              name={method.icon} 
              size={20} 
              color={method.available ? colors.text : colors.textSecondary} 
            />
            <Text style={[
              styles.paymentMethodText,
              !method.available && styles.paymentMethodTextDisabled
            ]}>
              {method.name}
            </Text>
            {!method.available && (
              <Text style={styles.comingSoonText}>Bientôt</Text>
            )}
          </View>
          <View style={[
            styles.radioButton,
            selectedPaymentMethod === method.id && styles.radioButtonSelected
          ]}>
            {selectedPaymentMethod === method.id && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOrderSummary = () => {
    const total = calculateTotal();
    const savings = calculateSavings();
    const deliveryFee = total > 100000 ? 0 : 5000; // Free delivery over 100,000 FC
    const finalTotal = total + deliveryFee;

    return (
      <View style={[commonStyles.card, styles.orderSummary]}>
        <Text style={styles.sectionTitle}>Résumé de la commande</Text>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sous-total</Text>
          <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
        </View>
        
        {savings > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.success }]}>Économies</Text>
            <Text style={[styles.summaryValue, { color: colors.success }]}>-{formatPrice(savings)}</Text>
          </View>
        )}
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Livraison {total > 100000 && '(Gratuite)'}
          </Text>
          <Text style={styles.summaryValue}>
            {deliveryFee > 0 ? formatPrice(deliveryFee) : 'Gratuit'}
          </Text>
        </View>
        
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(finalTotal)}</Text>
        </View>
      </View>
    );
  };

  const handleCheckout = () => {
    const selectedItemsCount = selectedItems.length;
    if (selectedItemsCount === 0) {
      Alert.alert('Panier vide', 'Veuillez sélectionner au moins un article pour continuer.');
      return;
    }
    
    console.log('Proceeding to checkout with:', selectedItems);
    Alert.alert(
      'Commande confirmée',
      `Votre commande de ${selectedItemsCount} article(s) a été confirmée. Vous recevrez un SMS de confirmation.`
    );
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={commonStyles.container} edges={['top']}>
        {Platform.OS === 'ios' && (
          <Stack.Screen options={{ headerShown: false }} />
        )}
        <View style={[commonStyles.container, commonStyles.center]}>
          <IconSymbol name="cart" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyCartTitle}>Votre panier est vide</Text>
          <Text style={styles.emptyCartText}>
            Découvrez nos produits et ajoutez-les à votre panier
          </Text>
          <TouchableOpacity style={[buttonStyles.primary, styles.shopButton]}>
            <Text style={textStyles.primaryButton}>Commencer mes achats</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen options={{ headerShown: false }} />
      )}
      
      <View style={styles.header}>
        <Text style={styles.title}>Mon Panier ({cartItems.length})</Text>
        <TouchableOpacity>
          <Text style={styles.selectAllText}>
            {selectedItems.length === cartItems.filter(item => item.inStock).length ? 'Tout désélectionner' : 'Tout sélectionner'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map(renderCartItem)}
        {renderPaymentMethods()}
        {renderOrderSummary()}
      </ScrollView>

      {selectedItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutInfo}>
            <Text style={styles.checkoutItemCount}>
              {selectedItems.length} article(s) sélectionné(s)
            </Text>
            <Text style={styles.checkoutTotal}>
              {formatPrice(calculateTotal())}
            </Text>
          </View>
          <TouchableOpacity 
            style={[buttonStyles.primary, styles.checkoutButton]}
            onPress={handleCheckout}
          >
            <Text style={textStyles.primaryButton}>Commander</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...commonStyles.title,
    fontSize: 20,
  },
  selectAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 180, // Extra padding for floating tab bar + checkout button
  },
  cartItem: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    padding: 4,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxDisabled: {
    backgroundColor: colors.highlight,
    borderColor: colors.border,
  },
  removeButton: {
    padding: 4,
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  outOfStockBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    ...commonStyles.subtitle,
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentMethodSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  paymentMethodDisabled: {
    opacity: 0.6,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  paymentMethodTextDisabled: {
    color: colors.textSecondary,
  },
  comingSoonText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
    marginLeft: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  orderSummary: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  checkoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...Platform.select({
      ios: {
        paddingBottom: 34, // Account for home indicator
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: `0 -2px 8px ${colors.shadow}`,
      },
    }),
  },
  checkoutInfo: {
    flex: 1,
    marginRight: 16,
  },
  checkoutItemCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  checkoutTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  checkoutButton: {
    paddingHorizontal: 32,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  shopButton: {
    paddingHorizontal: 32,
  },
});
