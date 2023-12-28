import type { IAsignaturaEnMalla } from "./IAsignaturaEnMalla";

export type IAsignaturaEnMallaService = {
	createAsignaturaEnMalla(
		data: any,
		mallaId: string,
		asignaturaId: string,
	): Promise<IAsignaturaEnMalla>;
	// getAllMallasCurriculares(): Promise<IMallaCurricular[]>;
	// getMallaCurricularById(id: string): Promise<IMallaCurricular | null>;
	// updateMallaCurricularById(params: {
	// 	id: string;
	// 	mallaCurricular: any;
	// }): Promise<IMallaCurricular>;
	// deleteMallaCurricularById(id: string): Promise<IMallaCurricular>;
};
