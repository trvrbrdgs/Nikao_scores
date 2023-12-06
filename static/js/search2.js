$(document).ready(function() {
    $('#myElement').text('Nikao Score Search');
    var $nameInput = $('#nameInput');
    var $monthDropdown = $('#monthDropdown');
    var $dayDropdown = $('#dayDropdown');
    var $yearDropdown = $('#yearDropdown');
    var $searchButton = $('#searchButton');

    var months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    // Populate month dropdown
    for (var i = 0; i < months.length; i++) {
        $monthDropdown.append($('<option>', {
            value: months[i],
            text: months[i]
        }));
    }

    var startYear = 2017; // Adjust the start year as needed
    var currentYear = new Date().getFullYear(); // Get the current year

    // Create an array of years from startYear to currentYear
    var years = [];
    for (var j = startYear; j <= currentYear; j++) {
        years.push(j);
    }

    // Populate the "years" dropdown
    for (var k = 0; k < years.length; k++) {
        $yearDropdown.append($('<option>', {
            value: years[k],
            text: years[k]
        }));
    }

    // Attach event handlers for input change
    $nameInput.on('input', search);
    $monthDropdown.on('change', function() {
        updateDays();
        search();
    });
    // $monthDropdown.on('change', search);
    $dayDropdown.on('change', search);
    $yearDropdown.on('change', function() {
        updateDays();
        search();
    });
    // $yearDropdown.on('change', search);
    $searchButton.on('click', search);

    // Populate and update day dropdown based on selected month and year
    function updateDays() {
        console.log('Update Days function called');
        var selectedMonth = $monthDropdown.val();
        console.log('Selected Month:', selectedMonth);
        var selectedYear = parseInt($yearDropdown.val());
        console.log('Selected Year:', selectedYear);

        //Convert the selected moth to it's corresponding numerical value
        var monthIndex = months.indexOf(selectedMonth) + 1;

        var daysInMonth = new Date(selectedYear, monthIndex, 0).getDate();
        console.log('Days in Month:', daysInMonth);

        console.log('Selected Month:', selectedMonth);
        console.log('Selected Year:', selectedYear);
        console.log('Days in Month:', daysInMonth);

        $dayDropdown.empty();
        for (var m = 1; m <= daysInMonth; m++) {
            $dayDropdown.append($('<option>', {
                value: m,
                text: m
            }));
        }
        // Disable day dropdown if either month or year is not selected
        // $dayDropdown.prop('disabled', isNaN(selectedMonth) || isNaN(selectedYear));
    }

    // Call updateDays when the page loads to initialize days based on default month and year
    updateDays();
  
    function search() {
      var name = $nameInput.val();
      var month = $monthDropdown.val();
      var day = $dayDropdown.val();
      var year = $yearDropdown.val();
  
      // Construct the URL of the CSV file based on the selected month and year
      var csvFile = 'resources/scoresheets/' + month + year + '.csv';
  
      // Perform your search logic here
      // You can make AJAX requests, filter data, or perform any other search operations
      $.ajax({
        url: csvFile,
        dataType: 'text',
        success: function(data) {
            console.log('CSV File:', csvFile);
            console.log('CSV Data:', data);
          // Filter the csv data based on the search criteria
          var filteredData = filterData(data, name, day);
  
          // Display the filtered results
          displayResults(filteredData, month, day, year, name);
        }
      });
    }
  
    function filterData(csvData, name, day) {
      // Implement your filtering logic here
      var lines = csvData.split('\n');
      var filteredResults = [];
  
      // Use the csvData and search criteria parameters to filter the data
      for (var l = 1; l < lines.length; l++) {
        var columns = lines[l].split(',');
        var csvName = columns[0].trim(); // Assuming name is in the first column
        var csvDay = columns[parseInt(day)].trim(); // Get the corresponding day column
        var cellData = columns.slice(1).map(function(cell) {
          return cell.trim();
        });
  
        if (
          csvName.toLowerCase().includes(name.toLowerCase()) &&
          csvDay !== ''
        ) {
          filteredResults.push(csvDay);
        }
      }
  
      return filteredResults;
    }
  
    function displayResults(results, month, day, year, name) {
      var $searchResults = $('#searchResults');
  
      // Clear previous results
      $searchResults.empty();
  
      // Display the search results
      if (results.length > 0) {
        var message =
          'On ' + month + ' ' + day + ' ' + year + ', ' + name + ' got a score of ' + results[0];
        var $li = $('<ul>').text(message);
        $searchResults.append($li);
      } else {
        var message = 'Huh, must have been a rest day.';
        var $li = $('<ul>').text(message);
        $searchResults.append($li);
      }
    }
  });
