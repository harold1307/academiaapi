import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { VarianteCursoService } from "../../VarianteCurso/Application/Service";
import type { IVarianteCursoService } from "../../VarianteCurso/Domain/IVarianteCursoService";
import type { IAsignaturaEnVarianteCursoController } from "../Domain/IAsignaturaEnVarianteCursoController";
import type { IAsignaturaEnVarianteCursoService } from "../Domain/IAsignaturaEnVarianteCursoService";
import type { IUpdateAsignaturaEnVarianteCurso } from "../Domain/IUpdateAsignaturaEnVarianteCurso";
import { AsignaturaEnVarianteCursoService } from "./Service";

export class AsignaturaEnVarianteCursoController
	implements IAsignaturaEnVarianteCursoController
{
	private _asignaturaEnVarianteCursoService: IAsignaturaEnVarianteCursoService;
	private _varianteCursoService: IVarianteCursoService;

	constructor() {
		this._asignaturaEnVarianteCursoService = StartupBuilder.resolve(
			AsignaturaEnVarianteCursoService,
		);
		this._varianteCursoService = StartupBuilder.resolve(VarianteCursoService);
	}

	async asignaturasEnVariantesCursoDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaEnVarianteCursoId =
				req.params.asignaturaEnVarianteCursoId;

			if (!asignaturaEnVarianteCursoId) return CommonResponse.invalidId();

			const asignaturaEnVarianteCurso =
				await this._asignaturaEnVarianteCursoService.getAsignaturaEnVarianteCursoById(
					asignaturaEnVarianteCursoId,
				);

			if (!asignaturaEnVarianteCurso) {
				return {
					jsonBody: {
						message: "La asignatura en variante curso no existe",
					},
					status: 400,
				};
			}

			const varianteCurso =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					asignaturaEnVarianteCurso.varianteCursoId,
				);

			if (!varianteCurso)
				return {
					jsonBody: {
						message:
							"La variante de la asignatura en variante de curso no existe",
					},
					status: 400,
				};

			if (varianteCurso.estado)
				return {
					jsonBody: {
						message:
							"La variante de curso esta habilitada, no se puede eliminar",
					},
					status: 400,
				};

			await this._asignaturaEnVarianteCursoService.deleteAsignaturaEnVarianteCursoById(
				asignaturaEnVarianteCursoId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnVariantesCursoUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asignaturaEnVarianteCursoId =
				req.params.asignaturaEnVarianteCursoId;

			if (!asignaturaEnVarianteCursoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const asignaturaEnVarianteCurso =
				await this._asignaturaEnVarianteCursoService.getAsignaturaEnVarianteCursoById(
					asignaturaEnVarianteCursoId,
				);

			if (!asignaturaEnVarianteCurso) {
				return {
					jsonBody: {
						message: "La asignatura en variante curso no existe",
					},
					status: 400,
				};
			}

			const varianteCurso =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					asignaturaEnVarianteCurso.varianteCursoId,
				);

			if (!varianteCurso)
				return {
					jsonBody: {
						message:
							"La variante de la asignatura en variante de curso no existe",
					},
					status: 400,
				};

			if (varianteCurso.estado)
				return {
					jsonBody: {
						message:
							"La variante de curso esta habilitada, no se puede actualizar",
					},
					status: 400,
				};

			const updatedAsignaturaEnVarianteCurso =
				await this._asignaturaEnVarianteCursoService.updateAsignaturaEnVarianteCursoById(
					{
						id: asignaturaEnVarianteCursoId,
						data: bodyVal.data,
					},
				);

			return CommonResponse.successful({
				data: updatedAsignaturaEnVarianteCurso,
			});
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateAsignaturaEnVarianteCurso>
>({
	validaCredito: z.boolean().optional(),
	validaPromedio: z.boolean().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	requeridoAprobar: z.boolean().optional(),

	asignaturaId: z.string().optional(),
	modeloEvaluativoId: z.string().nullable().optional(),

	asistenciaAprobar: z.number().nullable().optional(),
	cantidadDecimales: z.number().nullable().optional(),
	notaMaxima: z.number().nullable().optional(),
	notaMinima: z.number().nullable().optional(),
});
