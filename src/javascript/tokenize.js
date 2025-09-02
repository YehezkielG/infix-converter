function tokenize(expr) {
    let tokens = [];
    let numBuffer = "";
    let prevChar = null;
  
    for (let i = 0; i < expr.length; i++) {
      let ch = expr[i];
      if (ch === " ") continue;
      if (/[0-9.]/.test(ch)) {
        numBuffer += ch;
      } else {
        if (numBuffer) {
          tokens.push(numBuffer);
          numBuffer = "";
        }
        if (ch === "-" && (prevChar === null || /[+\-*/(]/.test(prevChar))) {
          numBuffer = "-";
        } else {
          tokens.push(ch);
        }
      }
      prevChar = ch;
    }
    if (numBuffer) tokens.push(numBuffer);
    return tokens;
  }