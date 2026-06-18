import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { logAppHealth } from '../utils/healthLog';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error): void {
    logAppHealth('app_error', error.message);
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Something went wrong.</Text>
        <Text style={styles.body}>
          The app did not send health or child data anywhere.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={this.reset}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    color: '#374151',
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0f766e',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
});
