// Print welcome message
console.log("Welcome to Holberton School, what is your name?");

process.stdin.setEncoding('utf8');

// Listen for user input
process.stdin.on('data', (input) => {
  const name = input.trim(); // Trim extra whitespace
  console.log(`Your name is: ${name}`);
  console.log("This important software is now closing");
  process.stdin.end(); // Close the input stream
});

// Handle stream end gracefully
process.stdin.on('end', () => {
  process.exit(0);
});

