
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
import React, { useState } from "react";
import { colors, commonStyles, buttonStyles, textStyles } from "@/styles/commonStyles";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuSection: {
    backgroundColor: colors.card,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 24,
    marginRight: 16,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  menuBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  menuBadgeText: {
    fontSize: 12,
    color: colors.card,
    fontWeight: '600',
  },
  switchContainer: {
    marginLeft: 'auto',
  },
  logoutButton: {
    backgroundColor: colors.error,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
});

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleMenuPress = (itemId: string) => {
    switch (itemId) {
      case 'orders':
        Alert.alert('Mes Commandes', 'Fonctionnalité en cours de développement');
        break;
      case 'favorites':
        Alert.alert('Mes Favoris', 'Fonctionnalité en cours de développement');
        break;
      case 'addresses':
        Alert.alert('Mes Adresses', 'Fonctionnalité en cours de développement');
        break;
      case 'payment':
        Alert.alert('Moyens de Paiement', 'Fonctionnalité en cours de développement');
        break;
      case 'help':
        Alert.alert('Centre d\'Aide', 'Utilisez le chat bot en bas à droite pour obtenir de l\'aide instantanée !');
        break;
      case 'contact':
        Alert.alert('Nous Contacter', 'Vous pouvez nous contacter via le chat bot ou par email : support@shopykin.cd');
        break;
      case 'about':
        Alert.alert('À Propos', 'Shopy Kin - La plateforme e-commerce n°1 en RDC\nVersion 1.0.0');
        break;
      case 'privacy':
        Alert.alert('Confidentialité', 'Fonctionnalité en cours de développement');
        break;
      case 'terms':
        Alert.alert('Conditions d\'Utilisation', 'Fonctionnalité en cours de développement');
        break;
      default:
        console.log('Menu item pressed:', itemId);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => {
          Alert.alert('Déconnecté', 'Vous avez été déconnecté avec succès');
        }},
      ]
    );
  };

  const renderUserInfo = () => (
    <View style={styles.userInfo}>
      <View style={styles.avatar}>
        <IconSymbol name="person.fill" size={40} color={colors.card} />
      </View>
      <Text style={styles.userName}>Jean Mukendi</Text>
      <Text style={styles.userEmail}>jean.mukendi@email.cd</Text>
    </View>
  );

  const menuSections = [
    {
      title: 'Mon Compte',
      items: [
        { id: 'orders', icon: 'bag.fill', text: 'Mes Commandes', badge: '3' },
        { id: 'favorites', icon: 'heart.fill', text: 'Mes Favoris' },
        { id: 'addresses', icon: 'location.fill', text: 'Mes Adresses' },
        { id: 'payment', icon: 'creditcard.fill', text: 'Moyens de Paiement' },
      ],
    },
    {
      title: 'Paramètres',
      items: [
        { id: 'notifications', icon: 'bell.fill', text: 'Notifications', hasSwitch: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
        { id: 'darkmode', icon: 'moon.fill', text: 'Mode Sombre', hasSwitch: true, value: darkModeEnabled, onToggle: setDarkModeEnabled },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help', icon: 'questionmark.circle.fill', text: 'Centre d\'Aide' },
        { id: 'contact', icon: 'message.fill', text: 'Nous Contacter' },
      ],
    },
    {
      title: 'Légal',
      items: [
        { id: 'about', icon: 'info.circle.fill', text: 'À Propos' },
        { id: 'privacy', icon: 'lock.fill', text: 'Confidentialité' },
        { id: 'terms', icon: 'doc.text.fill', text: 'Conditions d\'Utilisation' },
      ],
    },
  ];

  const renderMenuSection = (section: typeof menuSections[0]) => (
    <View key={section.title}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.menuSection}>
        {section.items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index === section.items.length - 1 && styles.menuItemLast,
            ]}
            onPress={() => handleMenuPress(item.id)}
          >
            <View style={styles.menuIcon}>
              <IconSymbol name={item.icon as any} size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>{item.text}</Text>
            {item.badge && (
              <View style={styles.menuBadge}>
                <Text style={styles.menuBadgeText}>{item.badge}</Text>
              </View>
            )}
            {item.hasSwitch ? (
              <View style={styles.switchContainer}>
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.card}
                />
              </View>
            ) : (
              <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Compte",
          headerShown: false,
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {renderUserInfo()}
        </View>

        {menuSections.map(renderMenuSection)}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
