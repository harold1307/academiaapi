import type { HttpResponseInit, InvocationContext } from "@azure/functions";

export class ErrorHandler {
	static handle({
		ctx,
		error,
	}: {
		ctx: InvocationContext;
		error: any;
	}): HttpResponseInit {
		if (error instanceof SyntaxError) {
			ctx.error(
				"Error de sintaxis, seguramente debido al procesar un tipo de body inesperado",
			);
			return {
				jsonBody: { message: "Body de peticion inesperado" },
				status: 400,
			};
		}

		if (error.name === "PrismaClientKnownRequestError") {
			ctx.error(error.message);

			return {
				jsonBody: { message: `Codigo de error ${error.code}` },
				status: 500,
			};
		}

		// todos los errores que se manejan en la aplicacion son de servicios, y terminan con ServiceError
		if (String(error.name).includes("ServiceError")) {
			ctx.error(error.message);

			return {
				jsonBody: { message: error.message },
				status: 500,
			};
		}

		ctx.error("Error desconocido");
		ctx.error(error.message);

		return {
			jsonBody: { message: "Se ha producido un error interno en el servidor" },
			status: 500,
		};
	}
}
