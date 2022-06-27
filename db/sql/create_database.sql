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

DROP TABLE IF EXISTS Teacher;
CREATE TABLE Teacher (
    teacherID CHAR(20),
    teacherName CHAR(20) NOT NULL,
    teacherPW CHAR(20) NOT NULL,
    branch CHAR(10),
    PRIMARY KEY (teacherID)
);

DROP TABLE IF EXISTS NewRecord;
CREATE TABLE NewRecord (
    studentID CHAR(20),
    regEng DATE,
    levelEng VARCHAR(20),
    regMath DATE,
    levelMath VARCHAR(20),
    friendship TINYINT,
    personality TINYINT,
    parentship TINYINT,
    concentration TINYINT,
    homework TINYINT,
    comment TEXT,
    checklist VARCHAR(255),
    PRIMARY KEY (studentID)
);

DROP TABLE IF EXISTS LevelTest;
CREATE TABLE LevelTest (
    studentID CHAR(20),
    dataType TINYINT,
    dataPath VARCHAR(255)
);

/*
careerNet : pdf_link
*/
DROP TABLE IF EXISTS Testpaper;
CREATE TABLE Testpaper (
    studentID CHAR(20),
    dataType TINYINT NOT NULL,
    dataPath VARCHAR(255),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);

DROP TABLE IF EXISTS Grade;
CREATE TABLE Grade (
    studentID CHAR(20),
    dataType TINYINT NOT NULL,
    dataPath VARCHAR(255),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);

DROP TABLE IF EXISTS Monthly;
CREATE TABLE Monthly (
    studentID CHAR(20),
    monthType VARCHAR(10),
    monthPath VARCHAR(255)
);

DROP TABLE IF EXISTS Consulting;
CREATE TABLE Consulting (
    studentID CHAR(20),
    teacherComment TEXT,
    studentComment TEXT,
    parentsComment TEXT,
    etcComment TEXT,
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);


/*
col마다 teacherID 입력하고, Teacher table에서 이름 긁긁
*/
DROP TABLE IF EXISTS Modifyer;
CREATE TABLE Modifyer (
    studentID CHAR(20),
    newRecord VARCHAR(20) DEFAULT NULL,
    newRecordD TIMESTAMP DEFAULT now(),
    Testpaper VARCHAR(20) DEFAULT NULL,
    TestpaperD TIMESTAMP DEFAULT now(),
    Grade VARCHAR(20) DEFAULT NULL,
    GradeD TIMESTAMP DEFAULT now(),
    Monthly VARCHAR(20) DEFAULT NULL,
    MonthlyD TIMESTAMP DEFAULT now(),
    Consulting VARCHAR(20) DEFAULT NULL,
    ConsultingD TIMESTAMP DEFAULT now(),
    FOREIGN KEY (studentID) REFERENCES Students (studentID)
);
