export type OptionsProps = {
	options: any[];
	onSelect: (suggestion: any) => void;
	rowRenderElement: (
		item: any,
		index?: number,
		selected?: boolean
	) => JSX.Element | string;
	dropdownStyle?: any;
	width?: number | string;
	selected?: any;
	keyExtractor?: (item) => number | string;
	hideBorder?: boolean;
}
