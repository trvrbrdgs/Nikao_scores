$(document).ready(function () {
    $('#myElement').text('Nikao Score Search');
    var $monthInput = $('#monthInput');
    var $dayInput = $('#dayInput');
    var $yearInput = $('#yearInput');
    var $searchButton = $('#searchButton');

    // Attach event handlers for input change
    $monthInput.on('change', search);
    $dayInput.on('change', search);
    $yearInput.on('change', search);
    $searchButton.on('click', search);
    

    //will need to create all results arrays below here:
    const results0 = [];
    const results1 = [];
    const results2 = [];
    const results3 = [];
    const results4 = [];
    const results5 = [];
    const results6 = [];
    const results7 = [];
    const results8 = [];
    const results9 = [];
    const results10 = [];
    const results11 = [];

    const rowResults = [results0, results1, results2, results3, results4, results5, results6, results7, results8, results9, results10, results11
    ];

    function search() {

        //Clear the results arrays
        for (let h = 0; h <= 11; h++) {
            rowResults[h].length = 0;
        }

        var month = $monthInput.val();
        var day = $dayInput.val();
        var year = $yearInput.val();

        // Define userInput
        var userInputDate = `${month} ${day}, ${year}`;

        // Convert the user input date to a formatted date
        var parsedDate = new Date(userInputDate);
        var dateToMatch = `${parsedDate.getMonth() + 1}.${parsedDate.getDate()}.${parsedDate.getFullYear() % 100}`;
        
        // //Create a single array to hold all the results
        const rowDisplay = [];

        //Create an array to store all fetch promises (i.e. help clear the results to not get a bunch of extra data in the results)
        const fetchPromises = [];

        //Create the for loop to iterate through the worksheets
        for (let i = 0; i <= 13; i++){
            //Construct the URL of the CSV file
            var csvFile = `resources/wods/Meso${i}_${year}.csv`;
            // console.log('What are we referencing?', csvFile)
            
            // Push the fetch promise to the array
            fetchPromises.push(
                fetch(csvFile)
                    .then(response => response.text())
                    .then(csvData => {
                        // Split the CSV data into rows
                        const rows = csvData.split('\n');

                        // Move the rowDisplay outside the inner loop
                        rowDisplay.length = 0;

                        // Get the values in row 2 (assuming dates are in row 2)
                        const dateRow = rows[1].split(',').map(date => date.trim());
                        console.log('Date Row:', dateRow);

                        // Find the index of the matching date
                        const columnIndex = dateRow.findIndex(date => date === dateToMatch);
                        console.log('Column Index of Y:', columnIndex);

                        if (columnIndex !== -1 && dateRow[columnIndex]) {
                            // Display the data in the matching date cell
                            console.log(`Data in the matching cell (Row 2, column ${columnIndex + 1}): ${dateRow[columnIndex]}`);

                            // Extract data from the matching column and store it in rowResults
                            for (let j = 0; j < rows.length; j++) {
                                const rowData = rows[j].split(',')[columnIndex];

                                // Handle specific rows for better HTML formatting
                                if (j === 0) {
                                    results0.push(rowData);
                                } else if (j === 3) {
                                    results1.push(rowData);
                                } else if (j === 4) {
                                    results2.push(rowData);
                                } else if (j === 5) {
                                    results3.push(rowData);
                                } else if (j === 6) {
                                    results4.push(rowData);
                                } else if (j === 7) {
                                    results5.push(rowData);
                                } else if (j === 9) {
                                    results6.push(rowData);
                                } else if (j >= 10 && j <= 22) {
                                    results7.push(rowData);
                                } else if (j >= 23 && j <= 35) {
                                    results8.push(rowData);
                                } else if (j >= 36 && j <= 48) {
                                    results9.push(rowData);
                                } else if (j >= 49 && j <= 61) {
                                    results10.push(rowData);
                                } else if (j === 62) {
                                    results11.push(rowData);
                                }
                            }
                        } else {
                            console.log('Matching date not found.');
                        }
                    })
                    .catch(error => console.error(`Error fetching or processing ${csvFile}`, error))
            );
        }

        // Wait for all fetch promises to resolve
        Promise.all(fetchPromises)
            .then(() => {
                // All fetch requests have completed

                // Now you can proceed with the rest of your logic
                displayResults();

            })
            .catch(error => console.error('Error with fetch promises:', error));
    }
   
    

    //Display the results
    function displayResults() {
        // Target specific elements by their IDs
        var topBottomContainerElements = document.querySelectorAll('.top-bottom-container span');
        var rowElements = document.querySelectorAll('.row .column span');
        var cashOutElement = document.getElementById("results11");
        var referenceElement = document.getElementById("results1");
      
        // Display the corresponding arrays in specific places
        topBottomContainerElements[0].innerHTML = rowResults[0].join('<div></div>');
        topBottomContainerElements[1].innerHTML = rowResults[6].join('<div></div>');
      
        rowElements[0].innerHTML = rowResults[2].join('<div></div>');
        rowElements[1].innerHTML = rowResults[7].join('<div></div>');
        rowElements[2].innerHTML = rowResults[3].join('<div></div>');
        rowElements[3].innerHTML = rowResults[8].join('<div></div>');
        rowElements[4].innerHTML = rowResults[4].join('<div></div>');
        rowElements[5].innerHTML = rowResults[9].join('<div></div>');
        rowElements[6].innerHTML = rowResults[5].join('<div></div>');
        rowElements[7].innerHTML = rowResults[10].join('<div></div>');
      
        cashOutElement.innerHTML = rowResults[11].join('<div></div>');
        referenceElement.innerHTML = rowResults[1].join('<div></div>'); 
      }
});