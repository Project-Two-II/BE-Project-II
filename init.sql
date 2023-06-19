/*
Note to contributor about convention:
Table Name Is Capitalized,
Every Column of table begins with the name of table.
For eg: 
id of Table Course is course_id
*/

Create Database ELabx_db Default Character Set utf8;

-- Table definition begins here

-- Todo? what to do with thumbnail? using a BLOB or storing path to the file?
Create Table Course(
    course_id integer Primary key auto_increment,
    course_title varchar(255) unique,
    course_desc varchar(255),
    course_thumbnail varchar(255),
    course_code varchar(255) unique
);

-- Todo? what to do with image? using a BLOB or storing path to the file?
Create Table User(
    user_id integer Primary key auto_increment,
    user_name varchar(255) unique,
    user_email varchar(255) unique,
    user_password varchar(255),
    user_profile_img varchar(255) unique
);

Create Table Chapter(
    chapter_id integer Primary key auto_increment,
    chapter_title varchar(255),
    chapter_desc varchar(255),
    course_id integer,

    constraint foreign key (course_id)
    references Course(course_id)
    on delete cascade on update cascade
);
-- Todo? test_name? is the name of file which contain test or storing test codes directly?
Create Table Test(
    test_id integer Primary key auto_increment,
    test_name varchar(255) unique
);

Create Table Question(
    question_id integer Primary key auto_increment,
    question_title varchar(255),
    question_desc Text,
    course_id integer,
    chapter_id integer,
    test_id integer,
        
    constraint foreign key(course_id)
    references Course(course_id)
    on delete cascade on update cascade,

    constraint foreign key(chapter_id)
    references Chapter(chapter_id)
    on delete cascade on update cascade,

    constraint foreign key(test_id)
    references Test(test_id)
    on delete cascade on update cascade
);

/*
 Todo?: Splitting up the table, looks preety large and might get hectic to manage later..
 Toooooooo many foreignt keys :(
*/
Create Table Submission(
    submission_id integer Primary key auto_increment,
    submission_value Text,
    submission_status TinyInt, -- 0 for not-reviewed 1 otherwise
    course_id integer,
    chapter_id integer,
    question_id integer,
    user_id integer,

    constraint foreign key(course_id)
    references Course(course_id)
    on delete cascade on update cascade,

    constraint foreign key(chapter_id)
    references Chapter(chapter_id)
    on delete cascade on update cascade,

    constraint foreign key(question_id)
    references Question(question_id)
    on delete cascade on update cascade,

    constraint foreign key(user_id)
    references User(user_id)
    on delete cascade on update cascade

);

Create Table Token(
    token_id integer Primary key auto_increment,
    token_value varchar(255),
    token_expires_in varchar(255),
    token_purpose TinyInt,
    user_id integer,

    constraint foreign key(user_id)
    references User(user_id)
    on delete cascade on update cascade
);

-- This is a junction table linking User and Course
Create Table CourseUser(
    courseuser_id integer primary key auto_increment,
    courseuser_role TinyInt not null, -- 0 for stdnt 1 for admin
    courseuser_progress integer,
    user_id integer,
    course_id integer,

    constraint foreign key(user_id)
    references User(user_id)
    on delete cascade on update cascade,

    constraint foreign key(course_id)
    references Course(course_id)
    on delete cascade on update cascade
);
-- Table Definition ends here.

-- Inserting values into table
Insert into Course(
    course_id, course_title, course_desc, course_thumbnail, course_code
) values (
    1, "Object Oriented Programming in C++", "Learn Object Oriented Programming in C++",
    "/todo", "CMP-57471"
);


Insert into User(
    user_id, user_name, user_email, user_password, user_profile_img
) values(
    1, "abhilekh_gautam", "abhilekh.191304@ncit.edu.np", "57471", "/todo"
);

Insert into User(
    user_id, user_name, user_email, user_password, user_profile_img
) values(
    2, "paan_kopat", "paankopat.191304@ncit.edu.np", "57471", "/todo1"
);

-- Enroll Abhilekh in the Course as a Student
Insert into CourseUser(
    courseuser_role, courseuser_progress, user_id, course_id
) values(
    0, 0, 1, 1
);

-- Enroll Paankopat in the Course as an Admin
Insert into CourseUser(
    courseuser_id,courseuser_role, courseuser_progress, user_id, course_id
) values(
    2,1, 0, 2, 1
);

-- Add a chapter to the course
Insert into Chapter(
    chapter_id, chapter_title, chapter_desc, course_id
) values(
    1, "Getting Started", "Write your First Program in C++", 1
);


-- Add a question to the chapter
Insert into Question(
    question_id, question_title, question_desc, course_id, chapter_id, test_id
) values(
    1, "Hello World", "We will write our program first in C++. Write a basic Hello World Program in C++",1, 1, null
);

-- Add Abhilekh's submmision
Insert into Submission(
    submission_id, submission_value, submission_status, course_id, chapter_id, question_id, user_id
) values(
    1, '#include <iostream> int main(){std::cout << "Hello, World\n";}', 0, 1, 1, 1,1
);


