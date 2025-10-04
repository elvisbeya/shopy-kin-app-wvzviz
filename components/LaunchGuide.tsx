
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { colors, commonStyles, textStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

const LaunchGuide = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
    });
  };

  const steps = [
    {
      id: 1,
      title: 'Installer EAS CLI',
      description: 'Installez les outils de construction Expo',
      command: 'npm install -g @expo/eas-cli',
      icon: 'terminal.fill' as const,
    },
    {
      id: 2,
      title: 'Connexion à Expo',
      description: 'Connectez-vous à votre compte Expo',
      command: 'eas login',
      icon: 'person.circle.fill' as const,
    },
    {
      id: 3,
      title: 'Configurer le projet',
      description: 'Configurez votre projet pour EAS Build',
      command: 'eas build:configure',
      icon: 'gear' as const,
    },
    {
      id: 4,
      title: 'Construire pour Android',
      description: 'Créez un APK pour le Google Play Store',
      command: 'eas build --platform android --profile production',
      icon: 'smartphone' as const,
    },
    {
      id: 5,
      title: 'Construire pour iOS',
      description: 'Créez un IPA pour l\'App Store',
      command: 'eas build --platform ios --profile production',
      icon: 'applelogo' as const,
    },
    {
      id: 6,
      title: 'Soumettre aux stores',
      description: 'Soumettez automatiquement aux app stores',
      command: 'eas submit --platform all',
      icon: 'arrow.up.circle.fill' as const,
    },
  ];

  const storeRequirements = [
    {
      store: 'Google Play Store',
      requirements: [
        'Compte développeur Google Play (25$ unique)',
        'APK ou AAB signé',
        'Icônes et captures d\'écran',
        'Description de l\'app',
        'Politique de confidentialité',
      ],
      color: colors.success,
    },
    {
      store: 'Apple App Store',
      requirements: [
        'Compte développeur Apple (99$/an)',
        'IPA signé avec certificat',
        'Icônes et captures d\'écran',
        'Description de l\'app',
        'Révision par Apple (1-7 jours)',
      ],
      color: colors.primary,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <IconSymbol name="rocket.fill" size={48} color={colors.primary} />
        <Text style={[textStyles.title, styles.title]}>
          Guide de Lancement
        </Text>
        <Text style={[textStyles.body, styles.subtitle]}>
          Déployez Shopy Kin sur les app stores
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[textStyles.subtitle, styles.sectionTitle]}>
          Étapes de Déploiement
        </Text>
        {steps.map((step) => (
          <View key={step.id} style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={styles.stepIcon}>
                <IconSymbol name={step.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.stepContent}>
                <Text style={[textStyles.subtitle, styles.stepTitle]}>
                  {step.id}. {step.title}
                </Text>
                <Text style={[textStyles.body, styles.stepDescription]}>
                  {step.description}
                </Text>
              </View>
            </View>
            <View style={styles.commandContainer}>
              <Text style={styles.command}>{step.command}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[textStyles.subtitle, styles.sectionTitle]}>
          Exigences des App Stores
        </Text>
        {storeRequirements.map((store) => (
          <View key={store.store} style={styles.storeCard}>
            <View style={[styles.storeHeader, { backgroundColor: store.color + '20' }]}>
              <Text style={[textStyles.subtitle, { color: store.color }]}>
                {store.store}
              </Text>
            </View>
            <View style={styles.requirementsList}>
              {store.requirements.map((req, index) => (
                <View key={index} style={styles.requirementItem}>
                  <IconSymbol 
                    name="checkmark.circle.fill" 
                    size={16} 
                    color={store.color} 
                  />
                  <Text style={[textStyles.body, styles.requirementText]}>
                    {req}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[textStyles.subtitle, styles.sectionTitle]}>
          Ressources Utiles
        </Text>
        <TouchableOpacity 
          style={styles.linkCard}
          onPress={() => openLink('https://docs.expo.dev/build/introduction/')}
        >
          <IconSymbol name="book.fill" size={24} color={colors.primary} />
          <View style={styles.linkContent}>
            <Text style={[textStyles.subtitle, styles.linkTitle]}>
              Documentation EAS Build
            </Text>
            <Text style={[textStyles.body, styles.linkDescription]}>
              Guide complet pour construire votre app
            </Text>
          </View>
          <IconSymbol name="arrow.right" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkCard}
          onPress={() => openLink('https://docs.expo.dev/submit/introduction/')}
        >
          <IconSymbol name="paperplane.fill" size={24} color={colors.success} />
          <View style={styles.linkContent}>
            <Text style={[textStyles.subtitle, styles.linkTitle]}>
              Documentation EAS Submit
            </Text>
            <Text style={[textStyles.body, styles.linkDescription]}>
              Soumettez automatiquement aux app stores
            </Text>
          </View>
          <IconSymbol name="arrow.right" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkCard}
          onPress={() => openLink('https://expo.dev/')}
        >
          <IconSymbol name="globe" size={24} color={colors.warning} />
          <View style={styles.linkContent}>
            <Text style={[textStyles.subtitle, styles.linkTitle]}>
              Expo Dashboard
            </Text>
            <Text style={[textStyles.body, styles.linkDescription]}>
              Gérez vos projets et builds
            </Text>
          </View>
          <IconSymbol name="arrow.right" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tipCard}>
        <IconSymbol name="lightbulb.fill" size={24} color={colors.warning} />
        <View style={styles.tipContent}>
          <Text style={[textStyles.subtitle, styles.tipTitle]}>
            Conseil Pro
          </Text>
          <Text style={[textStyles.body, styles.tipText]}>
            Testez d'abord avec le profil "preview" pour créer un APK de test 
            avant de construire pour la production. Cela vous permet de tester 
            sur des appareils réels sans passer par les app stores.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    color: colors.text,
  },
  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...commonStyles.shadow,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    marginBottom: 4,
  },
  stepDescription: {
    color: colors.textSecondary,
  },
  commandContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  command: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.text,
  },
  storeCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    ...commonStyles.shadow,
  },
  storeHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  requirementsList: {
    padding: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    marginLeft: 8,
    flex: 1,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...commonStyles.shadow,
  },
  linkContent: {
    flex: 1,
    marginLeft: 12,
  },
  linkTitle: {
    marginBottom: 4,
  },
  linkDescription: {
    color: colors.textSecondary,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.warning + '10',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    marginBottom: 8,
    color: colors.warning,
  },
  tipText: {
    lineHeight: 20,
  },
});

export default LaunchGuide;
