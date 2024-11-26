const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @returns {Promise<String>} A promise resolving to a report of the students.
 */
const countStudents = (dataPath) => 
  new Promise((resolve, reject) => {
    if (!dataPath) {
      return reject(new Error('Cannot load the database'));
    }

    fs.readFile(dataPath, (err, data) => {
      if (err) {
        return reject(new Error('Cannot load the database'));
      }

      const reportParts = [];
      const fileLines = data.toString('utf-8').trim().split('\n');
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',');
      const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];

        if (!studentGroups[field]) {
          studentGroups[field] = [];
        }

        const studentEntries = studentPropNames.map((propName, idx) => [
          propName,
          studentPropValues[idx],
        ]);
        studentGroups[field].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object.values(studentGroups).reduce(
        (sum, group) => sum + group.length,
        0
      );

      reportParts.push(`Number of students: ${totalStudents}`);
      for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        reportParts.push(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }

      resolve(reportParts.join('\n'));
    });
  });

/**
 * Root route handler.
 */
app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

/**
 * Students route handler.
 */
app.get('/students', (_, res) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      res.status(200).send(responseParts.join('\n'));
    })
    .catch((err) => {
      responseParts.push(err.message);
      res.status(500).send(responseParts.join('\n'));
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
