USE archive;

INSERT INTO Students VALUES("mtop1234", "원령이", "ex_face.jpg", "MA", 1);

INSERT INTO NewRecord (studentID, regEng, levelEng, friendShip, personality, parentShip, concentration, homework, checklist) VALUES("mtop1234", "22-02-01", "SproutA", 0,1,0,2,1, "dummy_img.jpeg");

INSERT INTO LevelTest (studentID, dataType, dataPath) VALUES("mtop1234", 0, "dummy_img.jpeg");

INSERT INTO Testpaper (studentID, dataType, dataPath) VALUES("mtop1234", 0, "dummy_img.jpeg");

INSERT INTO Grade (studentID, dataType, dataPath) VALUES("mtop1234", 0, "dummy_img.jpeg");

INSERT INTO Monthly (studentID, MonthType, monthPath) VALUES("mtop1234", 0, "dummy_img.jpeg");

INSERT INTO Consulting (studentID, teacherComment) VALUES ("mtop1234", "아주 잘하는 학생입니다.");

INSERT INTO Modifyer (studentID, Consulting, ConsultingD) VALUES ("mtop1234", "mteacher99", now());

INSERT INTO Teacher VALUES ("juwon", "이주원", "testpw", "CH");