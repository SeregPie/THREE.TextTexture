import {
	Camera,
	Object3D,
	Texture,
	WebGLRenderer,
} from 'three';

export default class TextTexture extends Texture {
	constructor(options?: {
		alignment?: string;
		backgroundColor?: string;
		color?: string;
		fontFamily?: string;
		fontSize?: number;
		fontStyle?: string;
		fontVariant?: string;
		fontWeight?: string;
		lineGap?: number;
		padding?: number;
		strokeColor?: string;
		strokeWidth?: number;
		text?: string;
	});

	readonly isTextTexture: true;

	text: string;

	fontFamily: string;

	fontSize: number;

	fontWeight: string;

	fontVariant: string;

	fontStyle: string;

	color: string;

	strokeWidth: number;

	strokeColor: string;

	alignment: string;

	lineGap: number;

	padding: number;

	backgroundColor: string;

	readonly lines: string[];

	readonly font: string;

	readonly width: number;

	readonly height: number;

	pixelRatio: number;

	redraw(): void;

	setOptimalPixelRatio(
		object: Object3D,
		renderer: WebGLRenderer,
		camera: Camera,
	): void;

	checkFontFace(): boolean;

	loadFontFace(): Promise<void>;
}
