import { app } from "@azure/functions";

import { TipoDocumentoEnProgramaController } from "../../Core/TipoDocumentoEnPrograma/Application/Controller";

const controller = new TipoDocumentoEnProgramaController();

app.get("tiposDocumentoEnProgramasGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.tiposDocumentoEnProgramasGetAll(req, ctx),
	route: "tipos-documento-programas",
});

app.get("tiposDocumentoEnProgramasGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.tiposDocumentoEnProgramasGetById(req, ctx),
	route: "tipos-documento-programas/{tipoDocumentoEnProgramaId}",
});

app.deleteRequest("tiposDocumentoEnProgramasDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.tiposDocumentoEnProgramasDeleteById(req, ctx),
	route: "tipos-documento-programas/{tipoDocumentoEnProgramaId}",
});

app.patch("tiposDocumentoEnProgramasUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.tiposDocumentoEnProgramasUpdateById(req, ctx),
	route: "tipos-documento-programas/{tipoDocumentoEnProgramaId}",
});
