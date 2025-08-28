// to_postfix.js
function to_postfix(expr) {
    const output = [];
    const stack = [];
    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "%": 2,
      "^": 3
    };
  
    const tokens = expr.match(/\d+|\+|\-|\*|\/|\%|\^|\(|\)/g);
  
    for (let token of tokens) {
      if (!isNaN(token)) {
        output.push(token);
      } else if (token in precedence) {
        // operator
        while (
          stack.length &&
          stack[stack.length - 1] in precedence &&
          (
            (precedence[token] <= precedence[stack[stack.length - 1]] && token !== "^") ||
            (precedence[token] < precedence[stack[stack.length - 1]] && token === "^")
          )
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      } else if (token === "(") {
        stack.push(token);
      } else if (token === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          output.push(stack.pop());
        }
        stack.pop(); 
      }
    }
  
    while (stack.length) {
      output.push(stack.pop());
    }
  
    return output;
  }
  