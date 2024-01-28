import type { IMallaCurricular } from "./IMallaCurricular";

export type ICreateMallaCurricular = Omit<
	IMallaCurricular,
	"id" | "createdAt" | "updatedAt"
>;
