const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let employees = []; // Array to store employee objects in memory

// Helper function to ask questions asynchronously
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Function to add a new employee
async function addEmployee() {
  const name = await ask('Enter employee name: ');
  const id = await ask('Enter employee ID: ');
  
  // Check if ID already exists
  if (employees.some(emp => emp.id === id)) {
    console.log('Error: Employee ID already exists.');
    return;
  }
  
  // Add employee to array
  employees.push({ name, id });
  console.log('Employee added successfully.');
}

// Function to list all employees
function listEmployees() {
  if (employees.length === 0) {
    console.log('No employees in the system.');
    return;
  }
  
  console.log('List of Employees:');
  employees.forEach(emp => {
    console.log(`ID: ${emp.id}, Name: ${emp.name}`);
  });
}

// Function to remove an employee by ID
async function removeEmployee() {
  const id = await ask('Enter employee ID to remove: ');
  
  // Find the index of the employee with the given ID
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) {
    console.log('Error: Employee not found.');
    return;
  }
  
  // Remove employee from array
  employees.splice(index, 1);
  console.log('Employee removed successfully.');
}

// Main function to handle the menu loop
async function main() {
  console.log('Welcome to the Employee Management System!');
  
  while (true) {
    console.log('\nMenu:');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Remove Employee');
    console.log('4. Exit');
    
    const choice = await ask('Choose an option (1-4): ');
    
    switch (choice) {
      case '1':
        await addEmployee();
        break;
      case '2':
        listEmployees();
        break;
      case '3':
        await removeEmployee();
        break;
      case '4':
        console.log('Exiting the system. Goodbye!');
        rl.close();
        return;
      default:
        console.log('Invalid choice. Please select 1-4.');
    }
  }
}

// Start the application
main();
