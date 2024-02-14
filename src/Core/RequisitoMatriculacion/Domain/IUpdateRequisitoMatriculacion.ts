import type { ICreateRequisitoMatriculacion } from "./ICreateRequisitoMatriculacion";

export type IUpdateRequisitoMatriculacion = Partial<
	Omit<ICreateRequisitoMatriculacion, "periodoId">
>;
