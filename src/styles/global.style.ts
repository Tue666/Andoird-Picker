import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const getGlobalStyles = () =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		center: {
			justifyContent: 'center',
			alignItems: 'center',
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		rowWrap: {
			flexDirection: 'row',
			flexWrap: 'wrap',
		},
		full: {
			width: '100%',
			height: '100%',
		},
		fw: {
			width: '100%',
		},
		fh: {
			height: '100%',
		},
	});

const useGlobalStyles = () => {
	const styles = useMemo(() => getGlobalStyles(), []);

	return styles;
};

export let globalStyles: ReturnType<typeof useGlobalStyles>;
const GlobalStylesConfiguration = () => {
	globalStyles = useGlobalStyles();

	return null;
};

export default GlobalStylesConfiguration;
