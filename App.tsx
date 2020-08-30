import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView, Clipboard } from 'react-native';
import { Provider as PaperProvider, Surface, Subheading, Divider, List, Button, Snackbar } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import MonoText from './MonoText';

import Constants from 'expo-constants';
import * as Application from 'expo-application';

const applicationFilter = (key: any, val: any) => typeof val !== 'function' && key !== 'ApplicationReleaseType';

const applicationStr = JSON.stringify(
  Application,
  (key, val) => applicationFilter(key, val) ? val : undefined,
  2
);

const constantsStr = JSON.stringify(
  Constants,
  (key, val) => key === 'systemFonts' ? undefined : val, 
  2
);

function ScreenContent() {
  const [toastVisible, setToast] = React.useState(false);

  const copyToClipboard = (value: string) => {
    Clipboard.setString(value);
    setToast(true);
  };
  const copyConstants = () => copyToClipboard(constantsStr);
  const copyApplication = () => copyToClipboard(applicationStr);

  return (
    <View style={[styles.container, { justifyContent: 'space-between' }]}>
      <ScrollView style={styles.container}>
        <Surface style={styles.surface}>
          <Subheading>Application &amp; Constants demo!</Subheading>
        </Surface>
        <Divider />
        <List.Accordion title="Constants values">
          <MonoText>{constantsStr}</MonoText>
          <Button onPress={copyConstants}>Copy to clipboard</Button>
        </List.Accordion>
        <Divider />
        <List.Accordion title="Application values">
          <MonoText>{applicationStr}</MonoText>
          <Button onPress={copyApplication}>Copy to clipboard</Button>
        </List.Accordion>
        <Divider />
      </ScrollView>
      <Snackbar
        visible={toastVisible}
        onDismiss={() => setToast(false)}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
      >
        Contents copied to clipboard!
      </Snackbar>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView />
        <ScreenContent />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
