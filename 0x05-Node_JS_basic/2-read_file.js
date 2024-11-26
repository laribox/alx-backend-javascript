const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8'); // Read file synchronously
    const lines = data.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines

    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const header = lines.shift(); // Remove the header row
    const students = lines.map((line) => line.split(','));
    const totalStudents = students.length;
    console.log(`Number of students: ${totalStudents}`);

    // Group students by field
    const fields = {};
    students.forEach((student) => {
      const [firstName, lastName, age, field] = student;
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    });

    // Log field-specific counts and names
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
