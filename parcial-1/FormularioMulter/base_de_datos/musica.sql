USE Musica;

CREATE TABLE Artistas ( 
    Id INT AUTO_INCREMENT PRIMARY KEY, 
    Nombre VARCHAR(100) NOT NULL, 
    Nacionalidad VARCHAR(100), 
    FechaNacimientos DATE 
); 

CREATE TABLE Albumes ( 
    Id INT AUTO_INCREMENT PRIMARY KEY, 
    Titulo VARCHAR(200) NOT NULL, 
    FechaLanzamiento DATE, 
    IdArtista INT, 
    FOREIGN KEY (IdArtista) REFERENCES Artistas(Id) 
); 

CREATE TABLE Canciones ( 
    Id INT AUTO_INCREMENT PRIMARY KEY, 
    Titulo VARCHAR(200) NOT NULL, 
    Duracion INT, 
    Genero VARCHAR(100), 
    IdAlbum INT, 
    IdArtista INT, 
    FOREIGN KEY (IdAlbum) REFERENCES Albumes(Id), 
    FOREIGN KEY (IdArtista) REFERENCES Artistas(Id) 
);

-- Insertar datos
INSERT INTO Artistas (Nombre, Nacionalidad, FechaNacimientos)
VALUES ('Shakira', 'Colombia', '1977-02-02');

INSERT INTO Artistas (Nombre, Nacionalidad, FechaNacimientos)
VALUES ('Coldplay', 'Reino Unido', '1996-01-01');

INSERT INTO Artistas (Nombre, Nacionalidad, FechaNacimientos)
VALUES ('The Beatles', 'Reino Unido', '1960-01-01');

INSERT INTO Albumes (Titulo, FechaLanzamiento, IdArtista)
VALUES ('Laundry Service', '2001-11-13', 1);

INSERT INTO Albumes (Titulo, FechaLanzamiento, IdArtista)
VALUES ('A Head Full of Dreams', '2015-12-04', 2);

INSERT INTO Albumes (Titulo, FechaLanzamiento, IdArtista)
VALUES ('Abbey Road', '1969-09-26', 3);

-- Álbum de Shakira (IdAlbum = 1)
INSERT INTO Canciones (Titulo, Duracion, Genero, IdAlbum, IdArtista)
VALUES ('Whenever, Wherever', 210, 'Pop', 1, 1);

-- Álbum de Coldplay (IdAlbum = 2)
INSERT INTO Canciones (Titulo, Duracion, Genero, IdAlbum, IdArtista)
VALUES ('Adventure of a Lifetime', 250, 'Pop Rock', 2, 2);

-- Álbum de The Beatles (IdAlbum = 3)
INSERT INTO Canciones (Titulo, Duracion, Genero, IdAlbum, IdArtista)
VALUES ('Come Together', 259, 'Rock', 3, 3);

