// Design tokens as per spec
export const colors = {
  primary: '#E63946',
  textPrimary: '#000000',
  textSecondary: '#666666',
  iconInactive: '#757575',
  background: '#FFFFFF',
  surface: '#F2F2F2',
  shadow: 'rgba(0,0,0,0.06)',
  inputPlaceholder: '#999999',
  borderColor: '#E0E0E0',
  
  // Dark mode colors
  darkBackground: '#000000',
  darkCards: '#1C1C1E',
  darkTextPrimary: '#FFFFFF',
  darkTextSecondary: '#8E8E93',
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 24,
  card: 12,
};

export const spacing = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 24,
  s6: 32,
};

export const typography = {
  header1: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  cardBody: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  inputPlaceholder: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
};

export const shadows = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
};

export const theme = {
  colors,
  radii,
  spacing,
  typography,
  shadows,
};

export default theme;