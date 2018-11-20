CREATE TABLE Quizzes (
    ID int NOT NULL AUTO_INCREMENT,
    Question varchar(255) NOT NULL,
    AnswerOne varchar(255) NOT NULL,
    AnswerTwo varchar(255) NOT NULL,
    AnswerThree varchar(255) NOT NULL,
    AnswerFour varchar(255) NOT NULL,
    CorrectAnswer varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);

select * from Quizzes

if ($this->conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
echo "Connect successfully";