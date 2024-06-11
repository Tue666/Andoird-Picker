import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { DatePicker, TimePicker } from './modals';

type PickerVariant = 'time' | 'date';

interface PickerProps {
	title: string;
	variant: PickerVariant;
}

const Picker = (props: PickerProps): React.JSX.Element => {
	const { title, variant } = props;
	const [modalVisible, setModalVisible] = useState(true);

	const onToggleModalVisible = () => {
		setModalVisible(!modalVisible);
	};
	return (
		<View>
			{variant === 'date' && <DatePicker visible={modalVisible} onCloseModal={onToggleModalVisible} />}
			{variant === 'time' && <TimePicker visible={modalVisible} onCloseModal={onToggleModalVisible} />}
			<Button title={title} onPress={onToggleModalVisible} />
		</View>
	);
};

export default Picker;
