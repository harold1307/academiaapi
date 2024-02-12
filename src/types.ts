import type { z } from "zod";

export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
	T,
>() => T extends Y ? 1 : 2
	? true
	: false;

export type NonNullableObject<T extends object> = {
	[K in keyof T]: Exclude<T[K], null>;
};

type IsNullable<T> = null extends T ? true : false;
type IsOptional<T> = undefined extends T ? true : false;

type IsNullableOrOptional<T> = null extends T
	? true
	: undefined extends T
		? true
		: false;

export type ZodInferSchema<T extends object> = {
	[Key in keyof T]-?: IsNullableOrOptional<T[Key]> extends true
		? IsNullable<T[Key]> extends true
			? IsOptional<T[Key]> extends true
				? z.ZodOptional<z.ZodNullable<z.ZodType<T[Key]>>>
				: z.ZodNullable<z.ZodType<T[Key]>>
			: IsOptional<T[Key]> extends true
				? z.ZodOptional<z.ZodType<T[Key]>>
				: z.ZodType<T[Key]>
		: z.ZodType<T[Key]>;
};

export type Prettify<T> = {
	[K in keyof T]: T[K];
	// eslint-disable-next-line @typescript-eslint/ban-types
} & {};
