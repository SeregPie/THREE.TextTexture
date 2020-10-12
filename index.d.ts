import {
	Camera,
	Object3D,
	Texture,
	WebGLRenderer,
} from 'three';

export default class extends Texture {
	constructor(options?: {
		alignment?: string = 'center';
		color?: string = '#fff';
		fontFamily?: string = 'sans-serif';
		fontSize?: number = 16;
		fontStyle?: string = 'normal';
		fontVariant?: string = 'normal';
		fontWeight?: string = 'normal';
		lineGap?: number = 1/4;
		padding?: number = 1/2;
		strokeColor?: string = '#fff';
		strokeWidth?: number = 0;
		text?: string = '';
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

	readonly lines: string[];

	readonly font: string;

	readonly width: number;

	readonly height: number;

	pixelRatio: number = 1;

	redraw(): void;

	setOptimalPixelRatio(
		object: Object3D,
		renderer: WebGLRenderer,
		camera: Camera,
	): void;

	checkFontFace(): boolean;

	loadFontFace(): Promise<void>;
};
