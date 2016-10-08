# Junction-2016 registration system

This project was made for Junction hackthon 2016. Junction 2016 gathers over 1200 coders together in Helsinki Finland end of November
and it is the leading hackathon in Europe made by students. More information: hackjunction.com

Purpose of the project was to make Junction's registration process more efficient for its team. In the long run our object is
to develop the project open solution for hackathon events. This object has been settled at the beginning and thus can be seen
of the structure of the source code (f.ex. all the hackathon specific values is found from one file).

The project team consist of two person who wanted to learn new technologies and build workable project from the scratch.
There would be more efficient techologies and way to build the whole project but for us it was more necessary to really
understand functionality of the newest frameworks and technologies.

#Functionality
Application side:
- 1. Participants fill out the form and gets email after sending the form.dmin side:
- 1. Login
- 2. Search applications with specific parameters and sort the result
- 3. Expand the view of a specific participant row and examine every section of application.
- 4. Modify some answer of a specific application.
- 5. Save the application changes or cancel it.
- 6. Select applications to a hackathon by defining which of travel reimburesments selected participant get.
- 7. All selected applications in the session can be seen in the another tab of application list.
In the selected list admin can cancel already selected applications if it is needed. 
- 8. After reviewing the selected list admin is able to accept applications. After accepting information is saved into db. 
Moreover for every selected participant will be sent invitations email which is specfied which travel reimburement it gets.
An invited participant needs to confirm through email if he or she is willing to particpate in a hackathon still. 
This confirmation is linked into database.

#Technologies
Backend:
- Node with Express
- webpack
DB: Postgresql
Used APIs: Sendgrid api
/* Frondtend: */
- In the form: handlebar
- in the admin panel
  - react.js
  - there wasn't used add on react libaries.
