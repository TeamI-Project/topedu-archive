CREATE USER 'topedu'@'localhost' IDENTIFIED BY 'topedu';

GRANT ALL PRIVILEGES ON *.* to 'topedu'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;