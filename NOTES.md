# Curso Escuela

- Solo se puede editar o eliminar cuando no esta en uso
- Solo se pueden agregar submodulos cuando no esta en uso
- Al eliminar, se eliminan todos los submodulos

# Malla Curricular

- No se puede eliminar si esta en uso con niveles academicos
- Solo puede existir cantidadArrastres o porcentajeMinimoPasarNivel

# PracticaPreProfesionalEnMalla

- Si las practicas pre profesionales estan ligadas a las materias los campos horas, creditos y registroDesdeNivel son null.

# PracticaComunitariaEnMalla

- Si las practicas comunitarias estan ligadas a las materias los campos horas, creditos y registroDesdeNivel son null.

# Niveles academicos

- No se puede crear nivel academico a partir de una malla que esta desactivada.
- Al eliminar se eliminan tambien las materias
- profesores -> habilita el registro de profesores en las materias de los niveles academicos
- horarios -> habilita el registro de horarios en las materias de los niveles academicos
- cuposMaterias -> ??
- planificacionProfesores -> ??
- matriculacion -> ??

# Asignaturas/Materias en niveles academicos

- Al eliminar, si esta en un horario tambien se eliminara de los horarios presentes.
- No tiene restriccion para editar
- Estructura del nombre -> Nombre de asignatura + alias + (numero de creacion)
<!-- - No se puede eliminar si esta asignado a un nivel academico -->
- Composicion del alias inicial ->
  - Ejm: [MT-FC-AM-INDENTIFICACIONPRUEBA-7456]
    - MT -> alias de la sede
    - FC -> alias de programa
    - AM -> depende si la materia del nivel academico es una Asignatura en Malla(AM) o un Modulo en Malla(MM)
    - INDENTIFICACIONPRUEBA -> identificacion de la asignatura en el nivel de la malla o asignatura modulo en malla
    - 7456 -> numero de nivel academico

# Asignatura en malla curricular

- Si la malla esta en uso no se podra:

  - Eliminar del nivel en malla
  - Editar los siguientes campos:
    - Permite matriculacion
    - Calculo de nivel
    - Valida para credito
    - Valida para promedio
    - Costo en matricula
    - Requerida para egresar
    - Cantidad de matriculas
    - Horas, creditos y horas de proyecto integrador
    - Itinerario, Asignatura y nivel

- Lo de arriba pasa lo mismo con los modulos en la malla