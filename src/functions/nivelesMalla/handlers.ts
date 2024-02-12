import { app } from "@azure/functions";

import { NivelMallaController } from "../../Core/NivelMalla/Application/Controller";

const controller = new NivelMallaController();

app.get("nivelesMallaGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesMallaGetAll(req, ctx),
	route: "niveles-malla",
});

app.get("nivelesMallaGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesMallaGetById(req, ctx),
	route: "niveles-malla/{nivelMallaId}",
});

app.patch("nivelesMallaUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesMallaUpdateById(req, ctx),
	route: "niveles-malla/{nivelMallaId}",
});

// asignaturas
app.post("nivelesMallaCreateAsignatura", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesMallaCreateAsignatura(req, ctx),
	route: "niveles-malla/{nivelMallaId}/asignaturas/{asignaturaId}",
});

// niveles academicos
app.post("nivelesMallaCreateNivelAcademico", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesMallaCreateNivelAcademico(req, ctx),
	route: "niveles-malla/{nivelMallaId}/sesiones/{sesionId}",
});
