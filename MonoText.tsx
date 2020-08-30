import { Code } from '@expo/html-elements';
import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

const MonoText: React.FunctionComponent<{
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}> = ({ children, containerStyle, textStyle }) => {
  const theme = useTheme();
  const viewThemeStyle = { backgroundColor: theme.colors.surface };
  const textThemeStyle = { color: theme.colors.text };
  return (
    <View style={[styles.container, containerStyle, viewThemeStyle]}>
      <Code style={[styles.monoText, textStyle, textThemeStyle]}>{children}</Code>
    </View>
  );
};

export default MonoText;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#666666',
  },
  monoText: {
    fontSize: 10,
  },
});
