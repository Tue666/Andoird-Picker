import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from './contexts/Theme.context';
import { MainScreen } from './screens';

const App = (): React.JSX.Element => {
	return (
		<SafeAreaView style={[styles.container]}>
			<ThemeProvider>
				<MainScreen />
			</ThemeProvider>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
