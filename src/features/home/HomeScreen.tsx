import { StyleSheet, Text, View } from 'react-native';

/**
 * Placeholder for the first vertical slice (list/detail/auth will follow the roadmap).
 */
export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Senior RN demo</Text>
      <Text style={styles.subtitle}>Day 1 — scaffold + feature folders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
  },
});
