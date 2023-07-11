import csv
import sqlite3


def run():
    connection = sqlite3.connect("elabx_db_.sqlite3")
    cursor = connection.cursor()

    # For Subject
    cursor.execute("SELECT * FROM Subject_elabx")
    csvfile = open("staticdata/export/subject_elabx.csv", "w")

    writer = csv.writer(csvfile, delimiter=",")
    writer.writerow(["id", "code_no", "title", "description", "thumbnail"])
    for row in cursor:
        writer.writerow(row)

    csvfile.close()
    print("Subject data exported!")

    # For Chapter
    cursor.execute("SELECT * FROM Chapter_elabx")
    csvfile = open("staticdata/export/chapter_elabx.csv", "w")

    writer = csv.writer(csvfile, delimiter=",")
    writer.writerow(["id", "title", "description", "subject"])
    for row in cursor:
        writer.writerow(row)

    csvfile.close()
    print("Chapter data exported!")

    # For Question
    cursor.execute("SELECT * FROM Question_elabx")
    csvfile = open("staticdata/export/question_elabx.csv", "w")

    writer = csv.writer(csvfile, delimiter=",")
    writer.writerow(["id", "title", "description", "chapter"])
    for row in cursor:
        writer.writerow(row)

    csvfile.close()
    print("Question data exported!")

    cursor.close()
    connection.close()


if __name__ == "__main__":
    run()
