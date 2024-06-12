import React, { useState } from 'react';
import { Button, View } from 'react-native';

interface PickerProps {
	title: string;
	modal: React.ElementType;
	[key: string]: any;
}

const Picker = (props: PickerProps): React.JSX.Element => {
	const { title, modal: Modal, ...rest } = props;
	const [modalVisible, setModalVisible] = useState(false);

	const onToggleModalVisible = () => {
		setModalVisible(!modalVisible);
	};
	return (
		<View>
			{modalVisible && <Modal visible={modalVisible} onCloseModal={onToggleModalVisible} {...rest} />}
			<Button title={title} onPress={onToggleModalVisible} />
		</View>
	);
};

export default Picker;
