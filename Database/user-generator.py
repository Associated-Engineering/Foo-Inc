print("/* ================================FOO INC. USER GENERATOR====================================== */")

import names
from random import randrange

# == NOTES
# - 60003 is largest employee number
# - currently 40 employees
# --> new employee no. range: 60004 - 60964 (q. 960 new employees)

photoUrls = ["0330125.jpeg", "0319102.jpeg", "0220105.jpeg", "0330123.jpeg", "0220102.jpeg", "0330124.jpeg", "0230115.jpeg", "0220104.jpeg", "0239123.jpeg", "0110104.jpeg", "0129102.jpeg", "0330024.jpeg", "03.jpeg", "0330112.jpeg"]
hireDates = ["2020-01-01", "2020-03-01", "2017-04-03", "1998-09-23", "1998-05-06", "2006-10-11"]
supervisors = ["10003", "20006", "20002", "20003", "20004", "20005", "30015", "30012", "30023", "30024", "30025"]
codeTuples = [("03", "04", "08"), ("03", "03", "05"), ("02", "02", "04"), ("02", "02", "05"), ("01", "01", "03"), ("03", "03", "03"), ("02", "01", "02", ), ("03", "03", "04"), ("01", "01", "01"), ("02", "01", "03"), ("01", "01", "04"), ("01", "01", "02"), ("01", "01", "05")]
locs = ["GHHDT1H7", "TH8LF9", "LDFS8F3DDS", "JGH7T", "GHHDT1H7", "GHHDT1H7", "GHHDT1H7", "GHHDT1H7", "TH8LF9", "TH8LF9", "TH8LF9", "TH8LF9"] # Vancouver = locs[0], Victoria = locs[2]

print("/* >>>======================BEGIN EMPLOYEES======================= */")
for i in range(961): # (0, 961] -- (0, 960)
  employeeNumber = str(60004 + i) # (60004, 60964)

  photoIndex = randrange(len(photoUrls))
  photo = photoUrls[photoIndex]

  hireDateIndex = randrange(len(hireDates))
  hireDate = hireDates[hireDateIndex]

  supervisorIndex = randrange(len(supervisors))
  supervisor = supervisors[supervisorIndex]

  codeIndex = randrange(len(codeTuples))
  code = codeTuples[codeIndex]

  locIndex = randrange(len(locs))
  loc = locs[locIndex]

  yoE = str(randrange(3))

  print("INSERT INTO \"Employee\" (\"EmployeeNumber\", \"CompanyCode\", \"OfficeCode\", \"GroupCode\", \"LastName\", \"FirstName\", \"EmploymentType\", \"Title\", \"HireDate\", \"TerminationDate\", \"SupervisorEmployeeNumber\", \"YearsPriorExperience\", \"Email\", \"WorkPhone\", \"WorkCell\", \"PhysicalLocationId\", \"PhotoUrl\") VALUES ('" + employeeNumber + "', '" + code[0] + "', '" + code[1] + "', '" + code[2] + "', '" + names.get_last_name() + "', '" + names.get_first_name() + "', 'Salary', 'Some \"Title\"', '" + hireDate + "', NULL, '" + supervisor + "', " + yoE + ", 'something@acme.ca', '604-555-5555', '604-555-5555', '" + loc + "', 'https://ae-images-foo-inc.s3-us-west-2.amazonaws.com/" + photo + "');")

print("/* >>>=======================END EMPLOYEES======================== */")

print("/* >>>=======================BEGIN SKILLS======================== */")

skills = [("1","1"), ("1","2"), ("1","3"), ("1","4"), ("1","5"),("2","1"), ("2","2"), ("2","3"),("3","1"), ("3","2"), ("3","3"), ("4","1"), ("4","2"), ("4","3")]

for i in range(961):
  employeeNumber = str(60004 + i)
  numberOfSkills = randrange(5)
  usedSkillIndices = {}
  for j in range(numberOfSkills):
    skillIndex = randrange(len(skills))
    if skillIndex in usedSkillIndices:
      j -= 1
      continue
    skill = skills[skillIndex]
    print("INSERT INTO \"EmployeeSkills\" (\"EmployeeNumber\", \"SkillCategoryId\", \"SkillId\") VALUES ('" + employeeNumber + "', '" + skill[0] + "', '" + skill[1] +"');")

print("/* >>>=======================END SKILLS========================*/")