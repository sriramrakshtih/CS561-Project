from jinja2 import Template


with open(Template.html) as in_:
    data = in_.read()

t = Template(data)

user_data = requests.query.from_SQL(
    "SQL_URL",
     username="uname",
      password="password"
      )

for key, val in user_data:
    if key == "job-title":
        print(t.render(jobTitle=val))

    elif key == "full-name":
        print(t.render(full_name=val))
