DROP DATABASE IF EXISTS archive;
CREATE DATABASE archive DEFAULT CHARSET=utf8;

USE archive;
DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
    studentID CHAR(20),
    studentName CHAR(20) NOT NULL,
    levelEng TINYINT,
    levelMath TINYINT,
    consultation TEXT,
    checklist VARCHAR(255),
    registerDate TIMESTAMP DEFAULT now(),
    PRIMARY KEY (studentID)
);

DROP TABLE IF EXISTS Consulting;
CREATE TABLE Consulting (
    studentID CHAR(20),
    consultingType TINYINT NOT NULL,
    content TEXT,
    consultingDate TIMESTAMP DEFAULT now(),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);

DROP TABLE IF EXISTS Testpaper;
CREATE TABLE Testpaper (
    studentID CHAR(20),
    testData VARCHAR(255) NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);

DROP TABLE IF EXISTS Grade;
CREATE TABLE Grade (
    studentID CHAR(20),
    examType TINYINT NOT NULL,
    reportCard VARCHAR(255),
    gradeDate TIMESTAMP DEFAULT now(),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);
