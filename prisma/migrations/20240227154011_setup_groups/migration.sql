-- This is an empty migration.
INSERT INTO grupos (id,nombre) VALUES (uuid(),'PROFESORES');
INSERT INTO grupos (id,nombre) VALUES (uuid(),'ALUMNOS');
INSERT INTO grupos (id,nombre) VALUES (uuid(),'ADMINISTRATIVOS');
INSERT INTO grupos (id,nombre) VALUES (uuid(),'EMPLEADORES');

DELIMITER //
CREATE TRIGGER before_update_grupo
BEFORE UPDATE ON grupos
FOR EACH ROW
BEGIN
    IF OLD.nombre IN ('PROFESORES', 'ALUMNOS', 'ADMINISTRATIVOS', 'EMPLEADORES') AND OLD.nombre <> NEW.nombre THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se puede modificar el nombre de este grupo.';
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER before_delete_grupo
BEFORE DELETE ON grupos
FOR EACH ROW
BEGIN
    IF OLD.nombre IN ('PROFESORES', 'ALUMNOS', 'ADMINISTRATIVOS', 'EMPLEADORES') THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se puede eliminar este grupo.';
    END IF;
END//
DELIMITER ;