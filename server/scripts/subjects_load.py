import csv
from subject.models import Subject, Chapter, Question, Test
from userauth.models import User


def run():
    fhand = open("staticdata/subjects_data.csv")
    reader = csv.reader(fhand)
    next(reader)

    Test.objects.all().delete()
    Question.objects.all().delete()
    Chapter.objects.all().delete()
    Subject.objects.all().delete()
    User.objects.all().delete()

    superuser = User.objects.create_superuser(id=1, email="admin@elabx.com", password="Elabx@123", username="elabx")
    superuser.save()
    i = 0

    for row in reader:
        i += 1
        code_no = row[0]
        sub_title = row[1]
        sub_desc = row[2]
        ch_title = row[3]
        ch_desc = row[4]
        que_title = row[5]
        que_desc = row[6]

        print(row)
        sub, created = Subject.objects.get_or_create(code_no=code_no, title=sub_title, owner=User.objects.get(id=1), description=sub_desc)
        if ch_title:
            ch, created = Chapter.objects.get_or_create(title=ch_title, description=ch_desc, subject=sub)
            que, created = Question.objects.get_or_create(title=que_title, description=que_desc, chapter=ch)
            test = Test(source_code="This is source code", question=que)
            test.save()

