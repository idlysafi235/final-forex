import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Database, ExternalLink, Copy, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { fetchSetupSteps, SetupStep } from '../lib/database';
import AboutAppSection from './AboutAppSection';

interface SetupGuideProps {
  visible: boolean;
  onClose: () => void;
}

export default function SetupGuide({ visible, onClose }: SetupGuideProps) {
  const { colors, fontSizes } = useTheme();
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      loadSetupSteps();
    }
  }, [visible]);

  const loadSetupSteps = async () => {
    setLoading(true);
    try {
      const steps = await fetchSetupSteps();
      setSetupSteps(steps);
    } catch (error) {
      console.error('Error loading setup steps:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, stepIndex: number) => {
    // Note: Clipboard API might not work in web environment
    // This is a placeholder for the copy functionality
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: colors.background,
      borderRadius: 20,
      width: '90%',
      maxWidth: 500,
      maxHeight: '80%',
      overflow: 'hidden',
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${colors.primary}20`,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: fontSizes.title,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: 'Inter-Bold',
    },
    subtitle: {
      fontSize: fontSizes.medium,
      color: colors.textSecondary,
      fontFamily: 'Inter-Regular',
      marginTop: 2,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    loadingText: {
      color: colors.text,
      fontSize: fontSizes.medium,
      fontFamily: 'Inter-Medium',
      marginTop: 16,
    },
    intro: {
      padding: 20,
      backgroundColor: `${colors.primary}10`,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    introText: {
      fontSize: fontSizes.medium,
      color: colors.text,
      fontFamily: 'Inter-Regular',
      lineHeight: 22,
    },
    stepsContainer: {
      padding: 20,
    },
    step: {
      marginBottom: 20,
    },
    stepHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    stepNumber: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    stepNumberText: {
      fontSize: fontSizes.small,
      fontFamily: 'Inter-Bold',
      color: colors.background,
    },
    stepTitle: {
      fontSize: fontSizes.subtitle,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      flex: 1,
    },
    stepDescription: {
      fontSize: fontSizes.medium,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginBottom: 12,
      marginLeft: 36,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      marginLeft: 36,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionButtonText: {
      fontSize: fontSizes.medium,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      flex: 1,
    },
    codeBlock: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      marginLeft: 36,
      marginTop: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    codeText: {
      fontSize: fontSizes.small,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      lineHeight: 18,
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    footerText: {
      fontSize: fontSizes.medium,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.container}>
          <SafeAreaView style={{ flex: 1 }}>
            <AboutAppSection />
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}