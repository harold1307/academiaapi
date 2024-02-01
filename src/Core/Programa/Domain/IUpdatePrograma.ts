import type { ICreatePrograma } from "./ICreatePrograma";

export type IUpdatePrograma = Partial<
	Omit<
		ICreatePrograma & {
			estado: boolean;
		},
		"nombre" | "mencion"
	>
>;
