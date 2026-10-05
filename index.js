const { load, save } = require('./storage');

// Parse command
function parseCommand(args) {
  if (args.length === 0) {
    return {
      cmd: 'help',
      text: ''
    };
  }

  const cmd = args[0];
  const text = args.slice(1).join(' ');

  return {
    cmd,
    text
  };
}

// Add todo
function addTodo(todos, text) {
  if (text.trim() === '') {
    return false;
  }

  todos.push({
    text: text.trim(),
    done: false
  });

  return true;
}

// Toggle todo
function toggleTodo(todos, index) {
  todos[index].done = !todos[index].done;
}

// Check index
function isValidIndex(todos, index) {
  return Number.isInteger(index) &&
         index >= 0 &&
         index < todos.length;
}

// Convert todos to text
function listText(todos) {
  if (todos.length === 0) {
    return 'No todos.';
  }

  return todos
    .map((todo, index) => {
      const mark = todo.done ? '✓' : ' ';
      return `${index + 1}. [${mark}] ${todo.text}`;
    })
    .join('\n');
}

// Help text
function helpText() {
  return `
Commands:
  node index.js add buy milk
  node index.js done 1
  node index.js list
  node index.js help
`;
}

// Get command
const args = process.argv.slice(2);

const { cmd, text } = parseCommand(args);

// Load todos from file
let todos = load();

// Run command
if (cmd === 'add') {
  if (addTodo(todos, text)) {
    save(todos);
    console.log(`Added: ${text.trim()}`);
  } else {
    console.log('Todo cannot be empty.');
  }

} else if (cmd === 'done') {
  const index = Number(text) - 1;

  if (!isValidIndex(todos, index)) {
    console.log('Invalid todo number.');
  } else {
    toggleTodo(todos, index);
    save(todos);
    console.log(`Todo ${index + 1} updated.`);
  }

} else if (cmd === 'list') {
  console.log(listText(todos));

} else if (cmd === 'help') {
  console.log(helpText());

} else {
  console.log('Unknown command.');
  console.log(helpText());
}