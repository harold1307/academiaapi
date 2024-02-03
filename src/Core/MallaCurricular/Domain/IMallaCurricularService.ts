import type { IAsignaturaEnNivelMalla } from "../../AsignaturaEnNivelMalla/Domain/IAsignaturaEnNivelMalla";
import type { IAsignaturaModuloEnMalla } from "../../AsignaturaModuloEnMalla/Domain/IAsignaturaModuloEnMalla";
import type { INivelMalla } from "../../NivelMalla/Domain/INivelMalla";
import type { ICreatePracticaComunitariaEnMalla } from "../../PracticaComunitariaEnMalla/Domain/ICreatePracticaComunitariaEnMalla";
import type { ICreatePracticaPreProfesionalEnMalla } from "../../PracticaPreProfesionalEnMalla/Domain/ICreatePracticaPreProfesionalEnMalla";
import type { ICreateMallaCurricular } from "./ICreateMallaCurricular";
import type { ILugarEjecucion } from "./ILugarEjecucion";
import type { IMallaCurricular } from "./IMallaCurricular";
import type { UpdateMallaCurricularParams } from "./IMallaCurricularRepository";

export type MallaCurricularWithAsignaturas = IMallaCurricular & {
	niveles: (INivelMalla & {
		asignaturas: IAsignaturaEnNivelMalla[];
	})[];
	modulos: IAsignaturaModuloEnMalla[];
};

export type MallaCurricularWithLugaresEjecucion = IMallaCurricular & {
	lugaresEjecucion: ILugarEjecucion[];
};

export type IMallaCurricularService = {
	createMallaCurricular: (
		data: ICreateMallaCurricular & {
			practicasPreProfesionales: ICreatePracticaPreProfesionalEnMalla | null;
			practicasComunitarias: ICreatePracticaComunitariaEnMalla | null;
		},
	) => Promise<IMallaCurricular>;
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
