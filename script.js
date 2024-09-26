document.addEventListener('DOMContentLoaded', function() { 
    let selectedLocation = null;
    let selectedDepartment = null;
    let data = {};

    fetch('interns.json')
    .then(response => {
      if (!response.ok) {
        throw new Error ('Network response was not okay');
      }
      return response.json();
    }) 
    .then(jsonData => {
      data = jsonData;
      updateTable();
    })
    .catch (error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  
    // Filter by Location
    function filterByLocation(location) {
      console.log("Location selected:", location);
      if (selectedLocation === location) {
        selectedLocation = null;
      } else {
        selectedLocation = location;
      }
      updateTable();
      updateActiveButton('.locContainer .button1', selectedLocation);
    }
  
    // Filter by Department
    function filterByDepartment(department) {
      console.log("Department selected:", department);
      if (selectedDepartment === department) {
        selectedDepartment = null;
      } else {
        selectedDepartment = department;
      }
      updateTable();
      updateActiveButton('.depContainer .button1', selectedDepartment);
    }
    
     // Update active button styling
      function updateActiveButton(buttonSelector, selectedValue) {
          document.querySelectorAll(buttonSelector).forEach(button => {
              if (button.textContent.trim() === selectedValue) {
                  button.classList.add('active-button');
              } else {
                  button.classList.remove('active-button');
              }
          });
      }
    
    // Update the table based on the current selection of location and department
    function updateTable() {
      const tableBody = document.querySelector('#peopleTable tbody');
      tableBody.innerHTML = ''; // Clear the table before repopulating
  
      // Loop through the locations
      data.locations.forEach(loc => {
        // Check if location matches or if no location is selected
        if (!selectedLocation || loc.locationName.toLowerCase() === selectedLocation.toLowerCase()) {
      // Loop through the departments in the matched location
      loc.departments.forEach(department => {
          // Check if department matches or if no department is selected
          if (!selectedDepartment || department.departmentName.toLowerCase() === selectedDepartment.toLowerCase()) {
              // Loop through the interns in the matched department
              department.interns.forEach(intern => {
                // Create a row
                const row = document.createElement('tr');
  
                // Create the Name cell
                const nameCell = document.createElement('td');
                nameCell.textContent = intern.name;
  
                // Create the Department cell
                const departmentCell = document.createElement('td');
                departmentCell.textContent = department.departmentName;
  
                // Create the Location cell
                const locationCell = document.createElement('td');
                locationCell.textContent = loc.locationName;
  
                // Create the Select cell (checkbox)
                const selectCell = document.createElement('td');
                const selectCheckbox = document.createElement('input');
                selectCheckbox.type = "checkbox";
                selectCheckbox.classList.add('select-slider');
                selectCheckbox.addEventListener('change', () => {
                  console.log(`${intern.name} ${selectCheckbox.checked ? 'selected' : 'deselected'}`);
                });
                selectCell.appendChild(selectCheckbox);
  
                // Append all cells to the row
                row.appendChild(nameCell);
                row.appendChild(departmentCell);
                row.appendChild(locationCell);
                row.appendChild(selectCell);
  
                // Append the row to the table body
                tableBody.appendChild(row);
              });
            }
          });
        }
      });
    }
  
    // Add event listeners for location buttons
    document.querySelectorAll('.locContainer .button1').forEach(button => {
      button.addEventListener('click', () => filterByLocation(button.textContent.trim()));
    });
  
    // Add event listeners for department buttons
    document.querySelectorAll('.depContainer .button1').forEach(button => {
      button.addEventListener('click', () => filterByDepartment(button.textContent.trim()));
    });
  
    // Initial table population if no filter is applied
    // updateTable();
  });