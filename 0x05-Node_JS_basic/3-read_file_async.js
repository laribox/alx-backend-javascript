const fs = require('fs');

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {String} dataPath The path to the CSV data file.
 * @returns {Promise<void>} A promise that resolves when the processing is complete.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    try {
      const lines = data.trim().split('\n');
      const headers = lines[0].split(',');
      const fieldIndex = headers.length - 1;
      const studentGroups = {};

      // Parse the student records
      for (const line of lines.slice(1)) {
        const record = line.split(',');
        const field = record[fieldIndex];
        const studentData = Object.fromEntries(
          headers.slice(0, fieldIndex).map((header, index) => [header, record[index]]),
        );

        if (!studentGroups[field]) {
          studentGroups[field] = [];
        }
        studentGroups[field].push(studentData);
      }

      // Calculate total students
      const totalStudents = Object.values(studentGroups).reduce(
        (sum, group) => sum + group.length,
        0,
      );
      console.log(`Number of students: ${totalStudents}`);

      // Log details per field
      for (const [field, students] of Object.entries(studentGroups)) {
        const names = students.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${students.length}. List: ${names}`);
      }

      resolve();
    } catch (error) {
      reject(new Error('Cannot process the database'));
    }
  });
});

module.exports = countStudents;
