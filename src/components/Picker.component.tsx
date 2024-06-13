import React, { useEffect, useRef, useState } from 'react';
import {
	Animated,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ConstantConfig } from '../config';
import { useTheme } from '../hooks';
import { globalStyles } from '../styles';

const { BOX, ICON } = ConstantConfig;

const ANIMATION_TIME = 300;

interface PickerProps extends TouchableOpacityProps {
	title: string;
	placeholder?: string;
	icon?: string;
	clearText?: boolean;
	onClearText?: () => void;
	modal: React.ElementType;
	[key: string]: any;
}

const Picker = (props: PickerProps): React.JSX.Element => {
	const { title, placeholder, icon, clearText, onClearText, modal: Modal, style, ...rest } = props;
	const [modalVisible, setModalVisible] = useState(false);
	const placeholderAnim = useRef(new Animated.Value(0)).current;
	const { background, text, outline } = useTheme();
	const placeholderStyle = {
		bottom: placeholderAnim.interpolate({
			inputRange: [0, 1],
			outputRange: [0, BOX.PADDING + BOX.PADDING / 1.5],
		}),
		paddingVertical: placeholderAnim.interpolate({
			inputRange: [0, 1],
			outputRange: [BOX.PADDING / 4, 0],
		}),
		paddingLeft: placeholderAnim.interpolate({
			inputRange: [0, 1],
			outputRange: [0, BOX.PADDING / 4],
		}),
		paddingRight: placeholderAnim.interpolate({
			inputRange: [0, 1],
			outputRange: [0, BOX.PADDING / 4],
		}),
		color: outline,
	};
	const placeHolderOnFocusStyle: StyleProp<TextStyle> = {
		position: title ? 'absolute' : 'relative',
		backgroundColor: title ? background : 'transparent',
		maxWidth: '100%',
	};

	useEffect(() => {
		Animated.timing(placeholderAnim, {
			toValue: title ? 1 : 0,
			duration: ANIMATION_TIME,
			useNativeDriver: false,
		}).start();
	}, [title, placeholderAnim]);

	const onToggleModalVisible = () => {
		setModalVisible(!modalVisible);
	};
	return (
		<TouchableOpacity
			style={[globalStyles.fw, styles.container, { borderColor: outline }, style]}
			onPress={onToggleModalVisible}
		>
			{modalVisible && <Modal visible={modalVisible} onCloseModal={onToggleModalVisible} {...rest} />}
			<View style={[globalStyles.row, { justifyContent: 'space-between' }]}>
				{title && (
					<View style={[globalStyles.row, styles.text, { justifyContent: 'space-between' }]}>
						<Text numberOfLines={1} style={[{ paddingRight: BOX.PADDING / 10, color: text }]}>
							{title}
						</Text>
						{clearText && (
							<TouchableOpacity activeOpacity={1} onPress={onClearText}>
								<Icon name="times-circle-o" size={ICON.SIZE * 1.2} color={outline} />
							</TouchableOpacity>
						)}
						{!clearText && <View />}
					</View>
				)}
				{placeholder && (
					<Animated.Text numberOfLines={1} style={[styles.text, placeholderStyle, placeHolderOnFocusStyle]}>
						{placeholder}
					</Animated.Text>
				)}
				{!title && !placeholder && <Text style={[styles.text]} />}
				{icon && (
					<Icon name={icon} size={ICON.SIZE * 2} color={text} style={[{ marginLeft: BOX.MARGIN / 2 }]} />
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		margin: BOX.MARGIN / 2,
		padding: BOX.PADDING / 1.5,
		borderWidth: 1,
		borderRadius: BOX.BORDER_RADIUS,
	},
	text: {
		flex: 1,
		padding: BOX.PADDING / 4,
	},
});

export default Picker;
