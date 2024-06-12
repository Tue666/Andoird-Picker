import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ConstantConfig } from '../config';
import { useTheme } from '../hooks';
import { globalStyles } from '../styles';

const { BOX, ICON } = ConstantConfig;

interface PickerProps extends TouchableOpacityProps {
	title: string;
	placeholder?: string;
	icon?: string;
	modal: React.ElementType;
	[key: string]: any;
}

const Picker = (props: PickerProps): React.JSX.Element => {
	const { title, placeholder, icon, modal: Modal, style, ...rest } = props;
	const [modalVisible, setModalVisible] = useState(false);
	const { text, outline } = useTheme();
	const textDisplay = title || (placeholder && placeholder);

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
				<Text numberOfLines={1} style={[styles.text, { color: !title && placeholder ? outline : text }]}>
					{textDisplay}
				</Text>
				{icon && <Icon name={icon} size={ICON.SIZE * 1.5} color={text} />}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: BOX.MARGIN / 2,
		padding: BOX.PADDING,
		borderWidth: 1,
		borderRadius: BOX.BORDER_RADIUS,
	},
	text: {
		flex: 1,
		paddingRight: BOX.PADDING / 2,
	},
});

export default Picker;
