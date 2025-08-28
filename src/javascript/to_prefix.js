function tokenize(expr) {
  return expr.match(/\d+|[()+\-*/^]/g);
}

function precedence(op) {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/" || op === "%") return 2;
  if (op === "^") return 3;
  return 0;
}

function to_prefix(expr) {
  let tokens = tokenize(expr);

  tokens = tokens.reverse();

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "(") tokens[i] = ")";
    else if (tokens[i] === ")") tokens[i] = "(";
  }

  const stack = [];
  const output = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      output.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();
    } else { 
      while (
        stack.length &&
        precedence(token) <= precedence(stack[stack.length - 1])
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length) {
    output.push(stack.pop());
  }

  return output.reverse();
}