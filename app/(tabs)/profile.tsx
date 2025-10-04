
import React from "react";
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  Alert,
  Switch
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles, buttonStyles, textStyles } from "@/styles/commonStyles";

// Mock user data
const userData = {
  name: 'Jean Mukendi',
  email: 'jean.mukendi@email.com',
  phone: '+243 812 345 678',
  address: 'Avenue Kasavubu, Kinshasa, RDC',
  memberSince: 'Membre depuis Mars 2024',
  orders: 12,
  savings: 45000,
};

const menuSections = [
  {
    title: 'Mon Compte',
    items: [
      { id: 'orders', title: 'Mes Commandes', icon: 'bag.fill', badge: '3' },
      { id: 'wishlist', title: 'Ma Liste de Souhaits', icon: 'heart.fill', badge: null },
      { id: 'addresses', title: 'Mes Adresses', icon: 'location.fill', badge: null },
      { id: 'payment', title: 'Moyens de Paiement', icon: 'creditcard.fill', badge: null },
    ]
  },
  {
    title: 'Vendeur',
    items: [
      { id: 'become-seller', title: 'Devenir Vendeur', icon: 'storefront.fill', badge: 'Nouveau' },
      { id: 'seller-dashboard', title: 'Tableau de Bord Vendeur', icon: 'chart.bar.fill', badge: null },
    ]
  },
  {
    title: 'Support',
    items: [
      { id: 'help', title: 'Centre d\'Aide', icon: 'questionmark.circle.fill', badge: null },
      { id: 'contact', title: 'Nous Contacter', icon: 'phone.fill', badge: null },
      { id: 'returns', title: 'Retours & Remboursements', icon: 'return', badge: null },
    ]
  },
  {
    title: 'Paramètres',
    items: [
      { id: 'notifications', title: 'Notifications', icon: 'bell.fill', badge: null, hasSwitch: true },
      { id: 'language', title: 'Langue', icon: 'globe', badge: 'Français', hasSwitch: false },
      { id: 'privacy', title: 'Confidentialité', icon: 'lock.fill', badge: null },
      { id: 'terms', title: 'Conditions d\'Utilisation', icon: 'doc.text.fill', badge: null },
    ]
  }
];

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleMenuPress = (itemId: string) => {
    console.log('Menu item pressed:', itemId);
    
    switch (itemId) {
      case 'orders':
        Alert.alert('Mes Commandes', 'Affichage de vos commandes récentes...');
        break;
      case 'become-seller':
        Alert.alert(
          'Devenir Vendeur',
          'Rejoignez notre marketplace et vendez vos produits à des milliers de clients en RDC!',
          [
            { text: 'Plus tard', style: 'cancel' },
            { text: 'Commencer', onPress: () => console.log('Start seller registration') }
          ]
        );
        break;
      case 'help':
        Alert.alert('Centre d\'Aide', 'Comment pouvons-nous vous aider?');
        break;
      case 'contact':
        Alert.alert(
          'Nous Contacter',
          'WhatsApp: +243 123 456 789\nEmail: support@shopykin.cd\nTéléphone: +243 987 654 321'
        );
        break;
      case 'language':
        Alert.alert(
          'Choisir la langue',
          'Sélectionnez votre langue préférée',
          [
            { text: 'Français', onPress: () => console.log('French selected') },
            { text: 'Lingala', onPress: () => console.log('Lingala selected') },
            { text: 'Swahili', onPress: () => console.log('Swahili selected') },
            { text: 'Annuler', style: 'cancel' }
          ]
        );
        break;
      default:
        Alert.alert('Fonctionnalité', `${itemId} sera bientôt disponible!`);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => {
          console.log('User logged out');
          // In a real app, this would clear user session
        }}
      ]
    );
  };

  const renderUserInfo = () => (
    <View style={[commonStyles.card, styles.userCard]}>
      <View style={styles.userHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userData.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.userPhone}>{userData.phone}</Text>
          <Text style={styles.memberSince}>{userData.memberSince}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <IconSymbol name="pencil" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.orders}</Text>
          <Text style={styles.statLabel}>Commandes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.savings.toLocaleString()} FC</Text>
          <Text style={styles.statLabel}>Économisé</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Note</Text>
        </View>
      </View>
    </View>
  );

  const renderMenuSection = (section: typeof menuSections[0]) => (
    <View key={section.title} style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={commonStyles.card}>
        {section.items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index < section.items.length - 1 && styles.menuItemBorder
            ]}
            onPress={() => handleMenuPress(item.id)}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <IconSymbol name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            
            <View style={styles.menuItemRight}>
              {item.badge && (
                <View style={[
                  styles.badge,
                  item.badge === 'Nouveau' && styles.badgeNew
                ]}>
                  <Text style={[
                    styles.badgeText,
                    item.badge === 'Nouveau' && styles.badgeTextNew
                  ]}>
                    {item.badge}
                  </Text>
                </View>
              )}
              
              {item.hasSwitch ? (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={notificationsEnabled ? '#FFFFFF' : colors.textSecondary}
                />
              ) : (
                <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen options={{ headerShown: false }} />
      )}
      
      <View style={styles.header}>
        <Text style={styles.title}>Mon Compte</Text>
        <TouchableOpacity onPress={handleLogout}>
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.error} />
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
        {renderUserInfo()}
        
        {menuSections.map(renderMenuSection)}
        
        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Shopy Kin v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ in RDC</Text>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  userCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  editButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeNew: {
    backgroundColor: colors.secondary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  badgeTextNew: {
    color: '#FFFFFF',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
});
