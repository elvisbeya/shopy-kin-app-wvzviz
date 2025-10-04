
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // E-commerce color scheme for Shopy Kin
  background: '#F5F5F5',        // Light gray for a clean look
  text: '#1E1E1E',              // Dark gray for readability
  textSecondary: '#6B7280',     // Medium gray for less important text
  primary: '#4CAF50',           // Green for main actions and branding
  secondary: '#FF9800',         // Orange as an accent color
  accent: '#2196F3',            // Blue for interactive elements
  card: '#FFFFFF',              // White for product cards and containers
  highlight: '#E0E0E0',         // Light gray for subtle highlights
  success: '#4CAF50',           // Green for success states
  warning: '#FF9800',           // Orange for warnings
  error: '#F44336',             // Red for errors
  border: '#E0E0E0',            // Light gray for borders
  shadow: 'rgba(0, 0, 0, 0.1)', // Subtle shadow
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const textStyles = StyleSheet.create({
  primaryButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  textButton: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  textSmall: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 16,
  },
  section: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
  productCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    minWidth: 100,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
  searchBar: {
    backgroundColor: colors.card,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
  banner: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
});
