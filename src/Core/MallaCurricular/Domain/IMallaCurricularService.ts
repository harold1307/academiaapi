import type { ICreateMallaCurricular } from "./ICreateMallaCurricular";
import type { ILugarEjecucion } from "./ILugarEjecucion";
import type { IMallaCurricular } from "./IMallaCurricular";
import type { UpdateMallaCurricularParams } from "./IMallaCurricularRepository";

export type MallaCurricularWithLugaresEjecucion = IMallaCurricular & {
	lugaresEjecucion: ILugarEjecucion[];
};

export type IMallaCurricularService = {
	createMallaCurricular: (
		data: ICreateMallaCurricular,
	) => Promise<IMallaCurricular>;
	getAllMallasCurriculares(
		filters?: Record<string, string>,
	): Promise<IMallaCurricular[]>;
	getMallaCurricularById(id: string): Promise<IMallaCurricular | null>;
	updateMallaCurricularById(
		params: UpdateMallaCurricularParams,
	): Promise<IMallaCurricular>;
	deleteMallaCurricularById(id: string): Promise<IMallaCurricular>;

	// getAllMallasCurricularesWithAsignaturas(): Promise<IMallaCurricular[]>;
	// getMallaCurricularByIdWithAsignaturas(
	// 	id: string,
	// 	filters?: {
	// 		asignaturas_esAnexo?: boolean;
	// 	},
	// ): Promise<IMallaCurricular | null>;

	createLugarEjecucion(mallaId: string, data: any): Promise<ILugarEjecucion>;
	getMallaCurricularByIdWithLugaresEjecucion(
		id: string,
	): Promise<MallaCurricularWithLugaresEjecucion | null>;
};
