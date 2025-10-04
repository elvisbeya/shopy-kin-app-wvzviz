
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, textStyles } from '@/styles/commonStyles';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  visible: boolean;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

export default function ChatBot({ visible, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant Shopy Kin. Comment puis-je vous aider aujourd\'hui ?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: screenHeight,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [visible]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // E-commerce specific responses in French
    if (lowerMessage.includes('livraison') || lowerMessage.includes('livrer')) {
      return 'Nous livrons dans tout Kinshasa en 24-48h ! La livraison coûte 2000 FC et est gratuite pour les commandes de plus de 50 000 FC. Voulez-vous connaître les zones de livraison ?';
    }
    
    if (lowerMessage.includes('paiement') || lowerMessage.includes('payer')) {
      return 'Nous acceptons plusieurs moyens de paiement : Mobile Money (M-Pesa, Airtel Money, Orange Money), paiement à la livraison, et cartes bancaires. Quel mode préférez-vous ?';
    }
    
    if (lowerMessage.includes('retour') || lowerMessage.includes('remboursement')) {
      return 'Vous pouvez retourner vos articles sous 7 jours ! C\'est simple : allez dans "Mes commandes", sélectionnez l\'article et cliquez sur "Retourner". Nous récupérons gratuitement.';
    }
    
    if (lowerMessage.includes('commande') || lowerMessage.includes('commander')) {
      return 'Pour passer commande : ajoutez vos articles au panier, vérifiez votre adresse de livraison, choisissez votre mode de paiement et confirmez ! Besoin d\'aide pour une étape ?';
    }
    
    if (lowerMessage.includes('prix') || lowerMessage.includes('coût')) {
      return 'Nos prix sont très compétitifs ! Utilisez les filtres de prix dans chaque catégorie pour trouver ce qui correspond à votre budget. Y a-t-il un produit spécifique qui vous intéresse ?';
    }
    
    if (lowerMessage.includes('produit') || lowerMessage.includes('article')) {
      return 'Nous avons des milliers de produits : mode, électronique, maison, alimentation... Quelle catégorie vous intéresse ? Je peux vous aider à trouver ce que vous cherchez !';
    }
    
    if (lowerMessage.includes('compte') || lowerMessage.includes('inscription')) {
      return 'Créer un compte est rapide ! Vous pouvez vous inscrire avec votre email, numéro de téléphone, ou même via WhatsApp. Cela vous permet de suivre vos commandes et sauvegarder vos favoris.';
    }
    
    if (lowerMessage.includes('aide') || lowerMessage.includes('problème')) {
      return 'Je suis là pour vous aider ! Vous pouvez me poser des questions sur les produits, les commandes, la livraison, les paiements, ou les retours. Que puis-je faire pour vous ?';
    }
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      return 'Bonjour ! Ravi de vous parler. Je peux vous aider avec vos achats, répondre à vos questions sur nos services, ou vous guider dans l\'application. Que souhaitez-vous savoir ?';
    }
    
    if (lowerMessage.includes('merci')) {
      return 'De rien ! C\'est un plaisir de vous aider. N\'hésitez pas si vous avez d\'autres questions. Bon shopping sur Shopy Kin ! 🛒';
    }
    
    // Default responses
    const defaultResponses = [
      'Intéressant ! Pouvez-vous me donner plus de détails pour que je puisse mieux vous aider ?',
      'Je comprends votre question. Laissez-moi vous expliquer comment cela fonctionne sur Shopy Kin.',
      'C\'est une excellente question ! Voici ce que je peux vous dire à ce sujet...',
      'Pour vous donner la meilleure réponse, pouvez-vous préciser ce que vous recherchez exactement ?',
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(userMessage.text),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.isUser ? styles.userText : styles.aiText,
          ]}
        >
          {message.text}
        </Text>
      </View>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.aiMessage]}>
      <View style={[styles.messageBubble, styles.aiBubble]}>
        <View style={styles.typingIndicator}>
          <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
          <View style={[styles.typingDot, { animationDelay: '150ms' }]} />
          <View style={[styles.typingDot, { animationDelay: '300ms' }]} />
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.chatContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.botAvatar}>
                  <IconSymbol name="message.fill" size={20} color={colors.card} />
                </View>
                <View>
                  <Text style={styles.headerTitle}>Assistant Shopy Kin</Text>
                  <Text style={styles.headerSubtitle}>En ligne</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <IconSymbol name="xmark" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            >
              {messages.map(renderMessage)}
              {isTyping && renderTypingIndicator()}
            </ScrollView>

            {/* Input */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.inputContainer}
            >
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Tapez votre message..."
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  maxLength={500}
                  onSubmitEditing={sendMessage}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  onPress={sendMessage}
                  style={[
                    styles.sendButton,
                    { opacity: inputText.trim() ? 1 : 0.5 },
                  ]}
                  disabled={!inputText.trim()}
                >
                  <IconSymbol name="arrow.up" size={20} color={colors.card} />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: screenHeight * 0.8,
    maxHeight: 600,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  closeButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: colors.card,
  },
  aiText: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 11,
    color: colors.textSecondary,
    marginHorizontal: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 2,
    opacity: 0.4,
  },
  inputContainer: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
