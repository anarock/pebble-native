import * as RN from "react-native";

export interface TextProps {
	bold?: boolean;
	size?: number;
	color?: string;
	style?: RN.StyleProp<RN.TextStyle>;
	animated?: boolean;
	children: JSX.Element | string | (string | boolean | JSX.Element | undefined)[];
}
