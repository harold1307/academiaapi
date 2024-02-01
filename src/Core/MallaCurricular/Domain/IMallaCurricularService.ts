import type { IAsignatura } from "../../Asignatura/Domain/IAsignatura";
import type { IAsignaturaEnMalla } from "../../AsignaturaEnMalla/Domain/IAsignaturaEnMalla";
import type { ICreateMallaCurricular } from "./ICreateMallaCurricular";
import type { ILugarEjecucion } from "./ILugarEjecucion";
import type { IMallaCurricular } from "./IMallaCurricular";
import type { UpdateMallaCurricularParams } from "./IMallaCurricularRepository";

export type MallaCurricularWithAsignaturas = IMallaCurricular & {
	asignaturasEnMalla: (IAsignaturaEnMalla & {
		asignatura: IAsignatura;
	})[];
};

export type MallaCurricularWithLugaresEjecucion = IMallaCurricular & {
	lugaresEjecucion: ILugarEjecucion[];
};

export type IMallaCurricularService = {
	createMallaCurricular(
		data: ICreateMallaCurricular,
	): Promise<IMallaCurricular>;
	getAllMallasCurriculares(): Promise<IMallaCurricular[]>;
	getMallaCurricularById(id: string): Promise<IMallaCurricular | null>;
	updateMallaCurricularById(
		params: UpdateMallaCurricularParams,
	): Promise<IMallaCurricular>;
	deleteMallaCurricularById(id: string): Promise<IMallaCurricular>;

	getAllMallasCurricularesWithAsignaturas(): Promise<
		MallaCurricularWithAsignaturas[]
	>;
	getMallaCurricularByIdWithAsignaturas(
		id: string,
		filters?: {
			asignaturas_esAnexo?: boolean;
		},
	): Promise<MallaCurricularWithAsignaturas | null>;

	createLugarEjecucion(mallaId: string, data: any): Promise<ILugarEjecucion>;
	getMallaCurricularByIdWithLugaresEjecucion(
		id: string,
	): Promise<MallaCurricularWithLugaresEjecucion | null>;
};
