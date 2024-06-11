import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const getTypographyStyles = () =>
	StyleSheet.create({
		bold: {
			fontWeight: 'bold',
		},
		italic: {
			fontStyle: 'italic',
		},
		center: {
			textAlign: 'center',
		},
		large: {
			fontSize: 50,
		},
	});

const useTypographyStyles = () => {
	const styles = useMemo(() => getTypographyStyles(), []);

	return styles;
};

export let typographyStyles: ReturnType<typeof useTypographyStyles>;
const TypographyStylesConfiguration = () => {
	typographyStyles = useTypographyStyles();

	return null;
};

export default TypographyStylesConfiguration;
