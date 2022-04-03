DROP DATABASE IF EXISTS archive;
CREATE DATABASE archive DEFAULT CHARSET=utf8;

/*
modifyer : 수정한 사람
modifyDate : 수정한 날짜
*/

USE archive;
/*
branch : 지점 (MA/CH/SA)
nowStatus : 퇴원여부 (0/1)
*/
DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
    studentID CHAR(20),
    studentName CHAR(20) NOT NULL,
    studentImg VARCHAR(255),
    branch VARCHAR(10),
    nowStatus TINYINT,
    PRIMARY KEY (studentID)
);

DROP TABLE IF EXISTS NewRecord;
CREATE TABLE NewRecord (
    studentID CHAR(20),
    regEng DATE,
    levelEng VARCHAR(20),
    regMath DATE,
    levelMath VARCHAR(20),
    testEng VARCHAR(255),
    testMath VARCHAR(255),
    friendShip TINYINT,
    personality TINYINT,
    parentShip TINYINT,
    concentration TINYINT,
    homework TINYINT,
    comment TEXT,
    checklist VARCHAR(255),
    modifyer VARCHAR(20),
    modifyDate TIMESTAMP DEFAULT now(),
    PRIMARY KEY (studentID)
);

/*
careerNet : pdf_link
*/
DROP TABLE IF EXISTS Testpaper;
CREATE TABLE Testpaper (
    studentID CHAR(20),
    SCA VARCHAR(255),
    CPS VARCHAR(255),
    careerNet VARCHAR(255),
    sixSence VARCHAR(255),
    testEtc VARCHAR(255),
    modifyer VARCHAR(20),
    modifyDate TIMESTAMP DEFAULT now(),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);

DROP TABLE IF EXISTS Grade;
CREATE TABLE Grade (
    studentID CHAR(20),
    midType TINYINT NOT NULL,
    midCard VARCHAR(255),
    highType TINYINT NOT NULL,
    highCard VARCHAR(255),
    modifyer VARCHAR(20),
    modifyDate TIMESTAMP DEFAULT now(),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);

DROP TABLE IF EXISTS Monthly;
CREATE TABLE Monthly (
    studentID CHAR(20),
    monthType TINYINT NOT NULL,
    monthCard VARCHAR(255),
    modifyer VARCHAR(20),
    modifyDate TIMESTAMP DEFAULT now(),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);

DROP TABLE IF EXISTS Consulting;
CREATE TABLE Consulting (
    studentID CHAR(20),
    teacherComment TEXT,
    studentComment TEXT,
    parentsComment TEXT,
    etcComment TEXT,
    modifyer VARCHAR(20),
    modifyDate TIMESTAMP DEFAULT now(),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);



