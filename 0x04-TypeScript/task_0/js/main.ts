// Define the Student interface
interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

// Create two student objects
const student1: Student = {
  firstName: 'John',
  lastName: 'Doe',
  age: 20,
  location: 'New York',
};

const student2: Student = {
  firstName: 'Jane',
  lastName: 'Smith',
  age: 22,
  location: 'Los Angeles',
};

// Create an array containing the two students
const studentsList: Student[] = [student1, student2];

// Function to render a table with student details
function renderTable(students: Student[]): void {
  // Create a table element
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');

  // Iterate through the students and create table rows
  students.forEach((student) => {
    const row = document.createElement('tr');

    // Create a cell for the first name
    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = student.firstName;

    // Create a cell for the location
    const locationCell = document.createElement('td');
    locationCell.textContent = student.location;

    // Append cells to the row
    row.appendChild(firstNameCell);
    row.appendChild(locationCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });

  // Append the table body to the table
  table.appendChild(tableBody);

  // Append the table to the document body (or another container)
  document.body.appendChild(table);
}

// Call the function to render the table
renderTable(studentsList);

