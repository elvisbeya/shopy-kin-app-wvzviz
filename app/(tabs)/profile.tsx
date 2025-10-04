
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
import { colors, commonStyles, buttonStyles, textStyles } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleMenuPress = (itemId: string) => {
    console.log('Menu item pressed:', itemId);
    
    switch (itemId) {
      case 'orders':
        Alert.alert('Mes Commandes', 'Fonctionnalité en développement');
        break;
      case 'addresses':
        Alert.alert('Mes Adresses', 'Fonctionnalité en développement');
        break;
      case 'payment':
        Alert.alert('Moyens de Paiement', 'Fonctionnalité en développement');
        break;
      case 'favorites':
        Alert.alert('Mes Favoris', 'Fonctionnalité en développement');
        break;
      case 'launch-guide':
        router.push('/launch-guide');
        break;
      case 'support':
        Alert.alert('Support Client', 'Contactez-nous à support@shopykin.com');
        break;
      case 'about':
        Alert.alert('À Propos', 'Shopy Kin v1.0.0\nPlateforme e-commerce pour la RDC');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        console.log('Unknown menu item:', itemId);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            Alert.alert('Déconnecté', 'Vous avez été déconnecté avec succès');
          }
        }
      ]
    );
  };

  const renderUserInfo = () => (
    <View style={styles.userSection}>
      <View style={styles.avatar}>
        <IconSymbol name="person.fill" size={40} color={colors.surface} />
      </View>
      <View style={styles.userInfo}>
        <Text style={[textStyles.title, styles.userName]}>Jean Mukendi</Text>
        <Text style={[textStyles.body, styles.userEmail]}>jean.mukendi@email.com</Text>
        <Text style={[textStyles.caption, styles.userLocation]}>
          <IconSymbol name="location.fill" size={12} color={colors.textSecondary} />
          {' '}Kinshasa, RDC
        </Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <IconSymbol name="pencil" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const menuSections = [
    {
      title: 'Mon Compte',
      items: [
        { id: 'orders', title: 'Mes Commandes', icon: 'bag.fill', badge: '3' },
        { id: 'addresses', title: 'Mes Adresses', icon: 'location.fill' },
        { id: 'payment', title: 'Moyens de Paiement', icon: 'creditcard.fill' },
        { id: 'favorites', title: 'Mes Favoris', icon: 'heart.fill', badge: '12' },
      ]
    },
    {
      title: 'Application',
      items: [
        { id: 'launch-guide', title: 'Guide de Lancement', icon: 'rocket.fill', highlight: true },
        { id: 'notifications', title: 'Notifications', icon: 'bell.fill', toggle: true },
        { id: 'dark-mode', title: 'Mode Sombre', icon: 'moon.fill', toggle: true },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'support', title: 'Support Client', icon: 'questionmark.circle.fill' },
        { id: 'about', title: 'À Propos', icon: 'info.circle.fill' },
      ]
    },
    {
      title: '',
      items: [
        { id: 'logout', title: 'Déconnexion', icon: 'rectangle.portrait.and.arrow.right', danger: true },
      ]
    }
  ];

  const renderMenuSection = (section: typeof menuSections[0]) => (
    <View key={section.title} style={styles.menuSection}>
      {section.title ? (
        <Text style={[textStyles.subtitle, styles.sectionTitle]}>{section.title}</Text>
      ) : null}
      <View style={styles.menuItems}>
        {section.items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              item.highlight && styles.highlightMenuItem,
              item.danger && styles.dangerMenuItem
            ]}
            onPress={() => handleMenuPress(item.id)}
          >
            <View style={styles.menuItemLeft}>
              <View style={[
                styles.menuIcon,
                item.highlight && styles.highlightIcon,
                item.danger && styles.dangerIcon
              ]}>
                <IconSymbol 
                  name={item.icon as any} 
                  size={20} 
                  color={
                    item.danger ? colors.error : 
                    item.highlight ? colors.primary : 
                    colors.textSecondary
                  } 
                />
              </View>
              <Text style={[
                textStyles.body, 
                styles.menuItemText,
                item.danger && styles.dangerText,
                item.highlight && styles.highlightText
              ]}>
                {item.title}
              </Text>
            </View>
            <View style={styles.menuItemRight}>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              {item.toggle ? (
                <Switch
                  value={item.id === 'notifications' ? notificationsEnabled : darkModeEnabled}
                  onValueChange={(value) => {
                    if (item.id === 'notifications') {
                      setNotificationsEnabled(value);
                    } else {
                      setDarkModeEnabled(value);
                    }
                  }}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.surface}
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
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen 
        options={{ 
          title: "Profil",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }} 
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderUserInfo()}
        
        {menuSections.map(renderMenuSection)}
        
        <View style={styles.footer}>
          <Text style={[textStyles.caption, styles.footerText]}>
            Shopy Kin v1.0.0
          </Text>
          <Text style={[textStyles.caption, styles.footerText]}>
            Plateforme e-commerce pour la RDC
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 20,
    marginBottom: 20,
    ...commonStyles.shadow,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    marginBottom: 4,
  },
  userEmail: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  userLocation: {
    color: colors.textSecondary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '600',
  },
  menuItems: {
    backgroundColor: colors.surface,
    ...commonStyles.shadow,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  highlightMenuItem: {
    backgroundColor: colors.primary + '10',
  },
  dangerMenuItem: {
    backgroundColor: colors.error + '05',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  highlightIcon: {
    backgroundColor: colors.primary + '20',
  },
  dangerIcon: {
    backgroundColor: colors.error + '20',
  },
  menuItemText: {
    flex: 1,
  },
  highlightText: {
    color: colors.primary,
    fontWeight: '600',
  },
  dangerText: {
    color: colors.error,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  footerText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default ProfileScreen;
