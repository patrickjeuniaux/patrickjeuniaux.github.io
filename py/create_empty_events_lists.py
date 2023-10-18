"""

Create empty events lists.

"""

import os
import calendar

folder = "~/Documents/github/patrickjeuniaux.github.io/html/events/"
folder = os.path.expanduser(folder)
start = 1990
group_by = 10
how_many_groups = 4


table = """

            <table>
                <tr>
                  <th>ID</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Where</th>
                  <th>Event</th>
                  <th>Involvement</th>
                </tr>

                <tr>
                  <td>1</td>
                  <td>30 JAN 2024</td>
                  <td>30 JAN 2024</td>
                  <td>Brussels</td>
                  <td>NICC Seminar</td>
                  <td>Speech entitled « L'usage de la théorie des graphes en criminalistique et en criminologie: études de cas » ( The use of graph theory in forensics and criminology: case studies )</td>
                </tr>


              </table>
              
"""

header = """<!DOCTYPE html>
<html lang="en-US" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>
        {title}
    </title>
    <meta charset="UTF-8" />
    <link rel="shortcut icon" href="{path}/img/PPJMHJ.ico"/>
    <link rel="stylesheet" type="text/css" href="{path}/css/default.css"/>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  </head>

  <body class="w3-container w3-auto w3-section w3-mobile">

    <a href="{path}/html/ubi_bene_ibi_patria.html">
      <img src="{path}/img/Ubi_bene_ibi_patria_logo.jpg" />
    </a>

    <ul class="site_menu">
      <li><a href = "{path}/index.html">Home</a></li>
      <li><a href = "{path}/html/publications/index.html">Publications</a></li>
      <li><a href = "{path}/html/events/index.html" class = "selected">Events</a></li>
      <li><a href = "{path}/html/institutions/index.html">Institutions</a></li>
      <li><a href = "{path}/html/contact.html">Contact</a></li>
      <li><a href = "{path}/html/miscellaneous/index.html">Miscellaneous</a></li>
    </ul>

"""

footer = """
    <div>

      <table>

        <tr>
          <th>ID</th>
          <th>Start</th>
          <th>End</th>
          <th>Where</th>
          <th>Event</th>
          <th>Involvement</th>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

      </table>
      
      <br /><signature> — {today}</signature>
    </div>
  </body>
</html>

"""

def run(start):

  """
  
  """

  for group in range(how_many_groups):
      
      start = process_group(start, group)

      return


def process_group(start, group):
    
    """
    
    """
    
    end = start + group_by - 1

    msg = "Group {}, starts in {}, ends in {}".format(group + 1,start,end)
    msg = "\n" + msg + "\n" + "=" * len(msg) + "\n"
    print(msg)

    group_folder = "{}-{}".format(start,end)
    print(group_folder + "\n" + "-" * len(group_folder) + "\n")

    new_folder = os.path.join(folder, group_folder)
    # print(new_folder)

    if not os.path.exists(new_folder):
      os.mkdir(new_folder)

    for year in range(start, end + 1):
        
        process_year(year, new_folder)

    start = end + 1

    return start

def process_year(year, new_folder) :
    
    """
    
    """

    msg = "Year {year}".format(year = year)
    print("\n" + msg + "\n" + "." * len(msg) + "\n")

    new_folder = os.path.join(new_folder, str(year))
    # print(new_folder)

    if not os.path.exists(new_folder):
      os.mkdir(new_folder)

    for month in range(1, 12 + 1):
        
        process_month(month, new_folder)



def process_month(month, new_folder):
    
    """
    
    """

    month_str = str(month).zfill(2)

    new_folder = os.path.join(new_folder, str(month_str))
    # print(new_folder)

    if not os.path.exists(new_folder):
      os.mkdir(new_folder)

    month_name = calendar.month_name[month]

    month_abbr = calendar.month_abbr[month].upper()

    msg = "Month {} : {} : {} : {}".format(month, month_str, month_abbr, month_name )
    print(msg)


if __name__ == "__main__":
    
	print("\n-- START --\n")
	run(start)
	print("\n-- The End --\n")
