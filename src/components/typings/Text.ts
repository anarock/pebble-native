import * as RN from "react-native";

export interface TextProps {
	bold?: boolean;
	size?: number;
	color?: string;
	style?: RN.StyleSheetProperties;
	animated?: boolean;
	children: React.ReactChild;
}
