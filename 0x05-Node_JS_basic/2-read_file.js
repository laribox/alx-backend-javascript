const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 */
const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath) || !fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // Read and process the file content
  const fileLines = fs.readFileSync(dataPath, 'utf-8').trim().split('\n');
  const headers = fileLines[0].split(',');
  const studentGroups = {};
  const studentPropNames = headers.slice(0, headers.length - 1);

  for (const line of fileLines.slice(1)) {
    const values = line.split(',');
    const field = values[values.length - 1];
    const studentData = Object.fromEntries(
      studentPropNames.map((prop, idx) => [prop, values[idx]]),
    );

    if (!studentGroups[field]) {
      studentGroups[field] = [];
    }
    studentGroups[field].push(studentData);
  }

  // Calculate and display the number of students
  const totalStudents = Object.values(studentGroups).flat().length;
  console.log(`Number of students: ${totalStudents}`);

  // Display the number of students in each field
  for (const [field, students] of Object.entries(studentGroups)) {
    const studentNames = students.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${students.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
