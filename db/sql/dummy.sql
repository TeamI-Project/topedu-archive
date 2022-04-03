USE archive;

INSERT INTO Students VALUES("mtop1234", "원령이", "ex_face.jpg", "MA", 1);

INSERT INTO NewRecord (studentID, regEng, levelEng, testEng, friendShip, personality, parentShip, concentration, homework, checklist, modifyer) VALUES("mtop1234", "22-02-01", "SproutA", "dummy_img.jpeg", 0,1,0,2,1, "dummy_img.jpeg", "teacher727");

INSERT INTO Testpaper (studentID, SCA, careerNet, sixSence, modifyer) VALUES ("mtop1234", "dummy_img.jpeg", "ex_pdf_file.pdf", "dummy_img.jpeg", "teacher727");

INSERT INTO Grade (studentID, highType, highCard, modifyer) VALUES ("mtop1234", 0, "dummy_img.jpeg", "teacher727");

INSERT INTO Monthly (studentID, monthType, monthCard, modifyer) VALUES ("mtop1234", 0, "dummy_img.jpeg", "teacher727");

INSERT INTO Consulting (studentID, teacherComment, modifyer) VALUES ("mtop1234", "아주 잘하는 학생입니다.", "teacher727");