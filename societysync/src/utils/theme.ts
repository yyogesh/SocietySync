export type ThemeColors = {
    primary: string
    primaryDark: string
    primaryLight: string
    secondary: string
    secondaryDark: string
    secondaryLight: string
    accent: string
    accentDark: string
    accentLight: string
    background: string
    backgroundGradient: string
    text: string
    textLight: string
    error: string
    success: string
    warning: string
    info: string
  }
  
  export type ThemeConfig = {
    colors: ThemeColors
    logo: {
      icon: string
      text: string
    }
    name: string
  }
  
  // Default theme for SocietySync
  export const defaultTheme: ThemeConfig = {
    colors: {
      primary: "#FF9800",
      primaryDark: "#FF6F00",
      primaryLight: "#FFB74D",
      secondary: "#003366",
      secondaryDark: "#00274F",
      secondaryLight: "#004C99",
      accent: "#4CAF50",
      accentDark: "#388E3C",
      accentLight: "#81C784",
      background: "#FFFFFF",
      backgroundGradient: "from-[#FFEF80] via-[#FFCB45] to-[#FFA726]",
      text: "#333333",
      textLight: "#666666",
      error: "#F44336",
      success: "#4CAF50",
      warning: "#FF9800",
      info: "#2196F3",
    },
    logo: {
      icon: "Building",
      text: "SocietySync",
    },
    name: "SocietySync",
  }
  
  // Function to get theme colors with tailwind classes
  export const getThemeColors = (theme: ThemeConfig = defaultTheme) => {
    return {
      primary: theme.colors.primary,
      primaryDark: theme.colors.primaryDark,
      primaryLight: theme.colors.primaryLight,
      secondary: theme.colors.secondary,
      secondaryDark: theme.colors.secondaryDark,
      secondaryLight: theme.colors.secondaryLight,
      accent: theme.colors.accent,
      accentDark: theme.colors.accentDark,
      accentLight: theme.colors.accentLight,
      background: theme.colors.background,
      backgroundGradient: theme.colors.backgroundGradient,
      text: theme.colors.text,
      textLight: theme.colors.textLight,
      error: theme.colors.error,
      success: theme.colors.success,
      warning: theme.colors.warning,
      info: theme.colors.info,
    }
  }
  
  // Function to get theme classes for common components
  export const getThemeClasses = (theme: ThemeConfig = defaultTheme) => {
    return {
      // Background classes
      pageBackground: `bg-gradient-to-br ${theme.colors.backgroundGradient}`,
      cardBackground: "bg-white backdrop-blur-lg shadow-xl border border-white/20 md:rounded-2xl",
  
      // Button classes
      primaryButton: `bg-[${theme.colors.secondary}] text-white hover:bg-[${theme.colors.secondaryDark}] focus:ring-[${theme.colors.primary}]`,
      secondaryButton: `bg-[${theme.colors.primary}] text-white hover:bg-[${theme.colors.primaryDark}] focus:ring-[${theme.colors.secondary}]`,
      outlineButton: `border border-[${theme.colors.primary}] text-[${theme.colors.primary}] hover:bg-[${theme.colors.primary}]/10`,
  
      // Input classes
      input: `bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${theme.colors.primary}]`,
  
      // Text classes
      heading: "text-gray-800",
      subheading: "text-gray-600",
      link: `text-[${theme.colors.primary}] hover:text-[${theme.colors.primaryDark}]`,
  
      // Icon background
      iconBackground: `bg-[${theme.colors.primary}]/20`,
      iconColor: `text-[${theme.colors.primaryDark}]`,
    }
  }
  