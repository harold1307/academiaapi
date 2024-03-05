import { app } from "@azure/functions";

import { UsuarioController } from "../../Core/Usuario/Application/Controller";

const controller = new UsuarioController();

app.get("usuariosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosGetAll(req, ctx),
	route: "usuarios",
});

app.get("usuariosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosGetById(req, ctx),
	route: "usuarios/{usuarioId}",
});

app.post("usuariosCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosCreate(req, ctx),
	route: "usuarios",
});

// app.deleteRequest("usuariosDeleteById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.usuariosDeleteById(req, ctx),
// 	route: "usuarios/{usuarioId}",
// });

app.patch("usuariosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosUpdateById(req, ctx),
	route: "usuarios/{usuarioId}",
});

// accesos de usuarios
app.post("usuariosCreateAlumno", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosCreateAlumno(req, ctx),
	route: "usuarios/{usuarioId}/alumnos",
});

app.post("usuariosCreateAdministrativo", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosCreateAdministrativo(req, ctx),
	route: "usuarios/{usuarioId}/administrativos",
});
app.patch("usuariosUpdateAdministrativo", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosUpdateAdministrativo(req, ctx),
	route: "usuarios/{usuarioId}/administrativos",
});

app.post("usuariosCreateProfesor", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosCreateProfesor(req, ctx),
	route: "usuarios/{usuarioId}/profesores",
});
app.patch("usuariosUpdateProfesor", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosUpdateProfesor(req, ctx),
	route: "usuarios/{usuarioId}/profesores",
});

// grupos
app.post("usuariosAppendToGroup", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosAppendToGroup(req, ctx),
	route: "usuarios/{usuarioId}/grupos/{grupoId}",
});
app.deleteRequest("usuariosRemoveFromGroup", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosRemoveFromGroup(req, ctx),
	route: "usuarios/{usuarioId}/grupos/{grupoId}",
});

// inscripciones
app.post("usuariosCreateInscripcion", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosCreateInscripcion(req, ctx),
	route: "usuarios/{usuarioId}/inscripciones",
});
app.patch("usuariosUpdateAlumnoWithInscripcion", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.usuariosUpdateAlumnoWithInscripcion(req, ctx),
	route: "usuarios/{usuarioId}/inscripciones/{inscripcionId}",
});

// asesores crm
app.post("usuariosCreateAsesorCrm", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosCreateAsesorCrm(req, ctx),
	route: "usuarios/{usuarioId}/asesores-crm",
});

// responsable de asesores crm
app.post("usuariosCreateResponsableCrm", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosCreateResponsableCrm(req, ctx),
	route: "usuarios/{usuarioId}/responsables-crm",
});

// asesores de estudiantes
app.post("usuariosCreateAsesorEstudiante", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.usuariosCreateAsesorEstudiante(req, ctx),
	route: "usuarios/{usuarioId}/asesores-estudiante",
});
