$(document).ready(function() {
    $('#myElement').text('Nikao Score Search');
    var $nameInput = $('#nameInput');
    var $monthInput = $('#monthInput');
    var $dayInput = $('#dayInput');
    var $yearInput = $('#yearInput');
    var $searchButton = $('#searchButton');
  
    // Attach event handlers for input change
    $nameInput.on('input', search);
    $monthInput.on('change', search);
    $dayInput.on('change', search);
    $yearInput.on('change', search);
    $searchButton.on('click', search);
  
    function search() {
      var name = $nameInput.val();
      var month = $monthInput.val();
      var day = $dayInput.val();
      var year = $yearInput.val();
  
      // Construct the URL of the CSV file based on the selected month and year
      var csvFile = 'resources/' + month + year + '.csv';
  
      // Perform your search logic here
      // You can make AJAX requests, filter data, or perform any other search operations
      $.ajax({
        url: csvFile,
        dataType: 'text',
        success: function(data) {
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
      for (var i = 1; i < lines.length; i++) {
        var columns = lines[i].split(',');
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
        var $li = $('<li>').text(message);
        $searchResults.append($li);
      } else {
        var message = 'No results found for the specified search criteria.';
        var $li = $('<li>').text(message);
        $searchResults.append($li);
      }
    }
  });
