Web Service Primary URL: <br>
https://courseappwebservice.onrender.com/
<br>
Retrieve ALL Courses:<br>
https://courseappwebservice.onrender.com/courses
<br>

Add a Course using POST:<br>
https://courseappwebservice.onrender.com/addcourse
<br><br>
{
  "title": "Design",
  "description": "I love design",
  "duration": 2
}
<br>

Update a Course using PUT:<br>
https://courseappwebservice.onrender.com/courses/5
<br><br>
{
  "title": "drawing",
  "description": "Drawing course",
  "duration": 10
}

<br>
Delete a course using DELETE:<br>
https://courseappwebservice.onrender.com/courses/2
<br>
{
   "id": 2
}
