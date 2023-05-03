from flask import Flask, render_template, request
import openpyxl

# create the Flask app
app = Flask(__name__)

# define a route to display the form
@app.route("/", methods=["GET"])
def form():
    return render_template("form.html")

# define a route to handle form submission and display the score
@app.route("/", methods=["POST"])
def score():
    # retrieve the form data
    name = request.form.get("name")
    day = request.form.get("day")
    month = request.form.get("month")

    # open the Excel spreadsheet
    workbook = openpyxl.load_workbook("scores.xlsx")

    # get the worksheet for the entered month
    sheet = workbook[month]

    # Initialize col_index so even if loop doesn't find a matching it will still have a value of 'none' instead of being undefined
    col_index= None

    # Loop through the cells in the first row to find the column with the entered day
    for cell in sheet[1]:
        if cell.value == day:
            col_index = cell.column_letter
            break

    #Loop through the cells in column A to find the row with the entered name
    for row in sheet.iter_rows(min_row=2, min_col=1):
        if row[0].value == name:
            row_index = row[0].row
            break

    # Get the value of the cell at the intersection of the row and column
    value = sheet[col_index + str(row_index)].value

    # render the score.html template with the score data
    return render_template("score.html", name=name, day=day, month=month, score=value)

# run the app if this file is executed
if __name__ == "__main__":
    app.run(debug=True)

