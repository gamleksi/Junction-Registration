# Junction-2016 registration system

This project was made for Junction hackthon 2016. Junction 2016 gathers over 1200 coders together in Helsinki Finland at end of November
and it is the leading hackathon in Europe. More information: hackjunction.com

Purpose of the project was to make Junction's registration process more efficient for its team. In the long run our object is
to develop the project open solution for hackathon events. This object has been settled at the beginning and thus it can be notified
from the structure of the source code (for example: all the hackathon specific values is found from one file).

The project team consisted of two person who wanted to learn new technologies and build workable project from a scratch.
This kind of system could have been made easier if we had used completed libraries and frameworks more. For us it was more important to gain experience and knowledge of the newest technologies and frameworks.

#Functionality
1. Participant fills out the form and gets an email after sending the form.dmin side:
1. Login
2. Search applications with specific parameters and sort the result
3. Expand the view of a specific participant row and examine every section of the application.
4. Modify some answer of a specific application.
5. Save the application changes or cancel it.
6. Select applications to a hackathon by defining which travel reimburesments selected participant gets.
7. All selected applications in the session can be seen in the other tab of application list. In the selected list admin can cancel applications which are already selected, if it is needed.
8. After reviewing the selected list admin is able to accept applications. After accepting information it is saved into db. Moreover, every selected participant will be sent an invitations email that specfies which travel reimburement participant gets. An invited participant needs to confirm via email if he or she is still willing to participate the hackathon. This confirmation is linked into the database.

#Technologies
Backend:
- Node with Express
- webpack
DB:
- Postgresql
Used external APIs
- Sendgrid api
Frondtend:
- In the form: handlebar
- in the admin panel
  - react.js
  - there wasn't used add on react libaries.