import type { Administrativo } from "@prisma/client";

export type ICreateAdministrativo = Omit<
	Administrativo,
	| "estado"
	| "id"
	| "createdAt"
	| "updatedAt"
	| "usuarioId"
	| "parametrosInstitucion"
	| "talentoHumano"
	| "personalAdministrativo"
	| "profesores"
	| "periodosLectivos"
	| "asignaturas"
	| "modelosEvaluativos"
	| "crmPreinscritos"
>;
