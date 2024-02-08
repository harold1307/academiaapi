import { app } from "@azure/functions";

import { NivelAcademicoController } from "../../Core/NivelAcademico/Application/Controller";

const controller = new NivelAcademicoController();

app.get("nivelesAcademicosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesAcademicosGetAll(req, ctx),
	route: "niveles-academicos",
});

app.get("nivelesAcademicosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesAcademicosGetById(req, ctx),
	route: "niveles-academicos/{nivelAcademicoId}",
});

app.deleteRequest("nivelesAcademicosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesAcademicosDeleteById(req, ctx),
	route: "niveles-academicos/{nivelAcademicoId}",
});

app.patch("nivelesAcademicosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesAcademicosUpdateById(req, ctx),
	route: "niveles-academicos/{nivelAcademicoId}",
});

// materias
app.post("nivelesAcademicosCreateMaterias", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesAcademicosCreateMaterias(req, ctx),
	route: "niveles-academicos/{nivelAcademicoId}/materias",
});
