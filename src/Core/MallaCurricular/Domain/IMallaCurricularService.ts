import type { IAsignatura } from "../../Asignatura/Domain/IAsignatura";
import type { IAsignaturaEnMalla } from "../../AsignaturaEnMalla/Domain/IAsignaturaEnMalla";
import type { IMallaCurricular } from "./IMallaCurricular";

type MallaCurricularWithAsignaturas = IMallaCurricular & {
	asignaturasEnMalla: (IAsignaturaEnMalla & {
		asignatura: IAsignatura;
	})[];
};

export interface IMallaCurricularService {
	createMallaCurricular(data: any): Promise<IMallaCurricular>;
	getAllMallasCurriculares(): Promise<IMallaCurricular[]>;
	getMallaCurricularById(id: string): Promise<IMallaCurricular | null>;
	updateMallaCurricularById(params: {
		id: string;
		mallaCurricular: any;
	}): Promise<IMallaCurricular>;
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
}
