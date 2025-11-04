import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

interface FixedButtonProps {
    onPress: () => void;
    children: ReactNode;
    testID?: string;
}

export default function FixedButton({ onPress, children, testID }: FixedButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} className="bg-blue-500 px-4 py-3" testID={testID}>
            <Text className="text-center font-semibold text-white">{children}</Text>
        </TouchableOpacity>
    );
}