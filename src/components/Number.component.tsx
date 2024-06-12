import React from 'react';
import {
	StyleSheet,
	Text,
	TextProps,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from 'react-native';
import { ConstantConfig } from '../config';
import { useTheme } from '../hooks';
import { globalStyles } from '../styles';

const { NUMBER } = ConstantConfig;

interface NumberProps extends TouchableOpacityProps {
	intend?: {
		containerWidth: number;
		rowSize: number;
	};
	size?: number;
	isSelected?: boolean;
	textStyle?: TextProps['style'];
	value?: string | number;
}

const Number = (props: NumberProps): React.JSX.Element => {
	const { intend, size, isSelected, value, style, textStyle, ...rest } = props;
	const { background, text, primary } = useTheme();
	// Size of number will depend on whether or not you intend to take up some space when render UI
	// If "intend" is provided, the size will be calculated to display in the correct number on a horizontal row
	// Otherwise, it will be its default value or customize value
	const defaultSize =
		size ||
		(!intend
			? NUMBER.SIZE
			: Math.floor((intend.containerWidth - intend.rowSize * NUMBER.MARGIN * 2) / intend.rowSize));
	const bgColor = isSelected ? primary?.main : background;
	const textColor = isSelected ? primary?.contrastText : text;

	return (
		<TouchableOpacity
			style={[
				globalStyles.center,
				styles.container,
				{ width: defaultSize, height: defaultSize, backgroundColor: bgColor },
				style,
			]}
			{...rest}
		>
			{value !== undefined && <Text style={[{ color: textColor }, textStyle]}>{value}</Text>}
			{value === undefined && isSelected && <View style={[styles.dot, { backgroundColor: text }]} />}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 99,
		margin: NUMBER.MARGIN,
	},
	dot: {
		width: NUMBER.DOT_SIZE,
		height: NUMBER.DOT_SIZE,
		borderRadius: NUMBER.DOT_SIZE / 2,
	},
});

export default Number;
