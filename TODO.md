# TODO

## CursoEscuela

- [] Implementar metodo PATCH
- [] Implementar programas
- [] Implementar costos
- [] Implementar campo "enUso", parece no tener interaccion con sus submodulos, sino con los usuarios inscritos/matriculados
- [x] Implementar sesiones
- [] Implementar creacion mediante plantilla Curso
  - [x] Materias
  - [] Programas
  - [] Costos
- [] Implementar exclusion de creacion y actualizacion cuando este en uso el CursoEscuela en sus submodulos
  - [x] Materias
  - [] Programas
  - [] Costos

## VarianteCurso

- [] Implementar programas

## Asignatura En Variante Curso

- [x] Implementar modelo evaluativo

## Paralelo

- [x] Implementar metodo PATCH

## Sesion

- [x] Implementar metodo PATCH
- [x] Implementar conexion con Turno

## Turno

- [x] Implementar metodo PATCH
- [x] Implementar logica de exclusion para eliminar un Turno

## Asignatura En Curso Escuela

- [] Implementar logica de exclusion para crear, actualizar y eliminar
- [x] Implementar modelo evaluativo
- [] Implementar edicion de profesor

## Modelo Evaluativo

- [x] Implementar campo enUso al dominio, este campo no es afectado por la logica de evaluacion ni los campos de modelo evaluativo
- [] Implementar logica de modelo
- [x] Implementar campo enUso

## Modelo Nivelacion

- [] Implementar logica de modelo
- [] Implementar campo enUso

## Proyecto Integrador

- [] Implementar logica de modelo
- [] Implementar campo enUso

## Malla Curricular

- [x] Implementar logica de exclusion para eliminar y actualizar
- [x] Implementar enUso

## Titulo Obtenido

- [x] Implementar enUso
- [x] Implementar creacion desde Programa

## TIpo Documento En Programa

- [] Implementar enUso

## Programa

- [x] Implementar enUso

# Nivel Academico

- [] Implementar enUso, no le afecta sus propias asignaturas/materias y horarios creados
