import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICronogramaMatriculacion } from "../../CronogramaMatriculacion/Domain/ICronogramaMatriculacion";
import type { ICreatePeriodoLectivo } from "../Domain/ICreatePeriodoLectivo";
import type { IPeriodoLectivo } from "../Domain/IPeriodoLectivo";
import type {
	IPeriodoLectivoRepository,
	UpdatePeriodoLectivoParams,
} from "../Domain/IPeriodoLectivoRepository";
import type { IPeriodoLectivoService } from "../Domain/IPeriodoLectivoService";
import { CreatePeriodoLectivoDTO } from "../Infrastructure/DTOs/CreatePeriodoLectivoDTO";
import { UpdatePeriodoLectivoDTO } from "../Infrastructure/DTOs/UpdatePeriodoLectivoDTO";

@injectable()
export class PeriodoLectivoService implements IPeriodoLectivoService {
	constructor(
		@inject(TYPES.PeriodoLectivoRepository)
		private _periodoLectivoRepository: IPeriodoLectivoRepository,
	) {}

	getAllPeriodoLectivos(): Promise<IPeriodoLectivo[]> {
		return this._periodoLectivoRepository.getAll();
	}

	getPeriodoLectivoById(id: string): Promise<IPeriodoLectivo | null> {
		return this._periodoLectivoRepository.getById(id);
	}

	async deletePeriodoLectivoById(id: string): Promise<IPeriodoLectivo> {
		const periodo = await this._periodoLectivoRepository.getById(id);

		if (!periodo) throw new PeriodoLectivoServiceError("El periodo no existe");

		if (periodo.enUso)
			throw new PeriodoLectivoServiceError(
				"El periodo esta en uso, no se puede eliminar",
			);

		return this._periodoLectivoRepository.deleteById(id);
	}

	createPeriodoLectivo(data: ICreatePeriodoLectivo): Promise<IPeriodoLectivo> {
		const dto = new CreatePeriodoLectivoDTO(data);

		return this._periodoLectivoRepository.create(dto.getData());
	}

	async updatePeriodoLectivoById({
		id,
		data,
	}: UpdatePeriodoLectivoParams): Promise<IPeriodoLectivo> {
		const dto = new UpdatePeriodoLectivoDTO(data);
		const valid = dto.getData();

		const periodo = await this._periodoLectivoRepository.getById(id);

		if (!periodo) throw new PeriodoLectivoServiceError("El periodo no existe");

		if (periodo.estado) {
			valid.cronogramaNotasCoordinacion = undefined;
			valid.legalizacionAutomaticaContraPagos = undefined;
			valid.numeroMatriculaAutomatico = undefined;
			valid.numeroMatricularAlLegalizar = undefined;
		}

		if (periodo.enUso) {
			valid.abierto = undefined;
			valid.estado = undefined;
			valid.actividadesDocencia = undefined;
			valid.actividadesInvestigacion = undefined;
			valid.actividadesGestion = undefined;
		}

		// una vez creado no se pueden volver null los campos de fechas en matricula
		if (periodo.fechasEnMatricula) {
			valid.limiteMatriculaEspecial =
				valid.limiteMatriculaEspecial !== null
					? valid.limiteMatriculaEspecial
					: undefined;
			valid.limiteMatriculaExtraordinaria =
				valid.limiteMatriculaExtraordinaria !== null
					? valid.limiteMatriculaExtraordinaria
					: undefined;
			valid.limiteMatriculaOrdinaria =
				valid.limiteMatriculaOrdinaria !== null
					? valid.limiteMatriculaOrdinaria
					: undefined;
			valid.automatriculaAlumnosFechaExtraordinaria =
				valid.automatriculaAlumnosFechaExtraordinaria !== null
					? valid.automatriculaAlumnosFechaExtraordinaria
					: undefined;
		}

		if (!periodo.fechasEnMatricula) {
			valid.limiteMatriculaEspecial =
				valid.limiteMatriculaEspecial === null ? null : undefined;
			valid.limiteMatriculaExtraordinaria =
				valid.limiteMatriculaExtraordinaria === null ? null : undefined;
			valid.limiteMatriculaOrdinaria =
				valid.limiteMatriculaOrdinaria === null ? null : undefined;
			valid.automatriculaAlumnosFechaExtraordinaria =
				valid.automatriculaAlumnosFechaExtraordinaria === null
					? null
					: undefined;
		}

		try {
			new CreatePeriodoLectivoDTO({
				...periodo,
				...Object.fromEntries(
					Object.entries(valid).filter(([, v]) => v !== undefined),
				),
			});
		} catch (error: any) {
			console.log(error.error.issues);

			throw new PeriodoLectivoServiceError(
				"El periodo a actualizar no es valido",
			);
		}

		return this._periodoLectivoRepository.update({ id, data: valid });
	}

	getPeriodoLectivoByIdWithCronogramasMatriculacion(id: string): Promise<
		| (IPeriodoLectivo & {
				cronogramasMatriculacion: ICronogramaMatriculacion[];
		  })
		| null
	> {
		return this._periodoLectivoRepository.getByIdWithCronogramasMatriculacion(
			id,
		);
	}
}

class PeriodoLectivoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "PeriodoLectivoServiceError";
	}
}
