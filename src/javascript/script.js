const input = document.getElementById("inputField");
const computeBtn = document.getElementById("btn");
const prefixResult = document.getElementById("prefixResult");
const postfixResult = document.getElementById("postfixResult");

computeBtn.addEventListener("click", () => {
  const value = input.value;
  const prefixStack = to_prefix(value);
  const postfixStack = to_postfix(value);
  prefixResult.innerHTML = prefixStack.join(" ");
  postfixResult.innerHTML = postfixStack.join(" ");
  let result = computeFromPrefix(prefixStack);
  let resultpos = computeFromPostfix(postfixStack);
  document.getElementById("stepsResult").classList.remove("hidden");
  renderPrefixSteps(result)
  renderPostfixSteps(resultpos)
});

function renderPrefixSteps(result){
  let tbody = document.querySelector("#stepsTableBody");
  tbody.innerHTML = ""; // reset dulu biar nggak dobel
  
  result.steps.forEach(step => {
    let row = document.createElement("div");
    row.className = "grid grid-cols-3 border-b border-gray-200 text-sm py-1";
  
    let tdToken = document.createElement("div");
    tdToken.textContent = step.token;
    tdToken.className = "px-4 py-2 font-mono";
  
    let tdAction = document.createElement("div");
    tdAction.textContent = step.action;
    tdAction.className = "px-4 py-2";
  
    let tdStack = document.createElement("div");
    tdStack.textContent = step.stack;
    tdStack.className = "px-4 py-2 font-mono";
  
    row.appendChild(tdToken);
    row.appendChild(tdAction);
    row.appendChild(tdStack);
  
    tbody.appendChild(row);
  });
}

function renderPostfixSteps(result) {
  let tbody = document.querySelector("#stepsPostfixBody");
  tbody.innerHTML = "";

  result.steps.forEach(step => {
    let row = document.createElement("div");
    row.className = "grid grid-cols-3 border-b border-gray-200 text-sm";

    let tdToken = document.createElement("div");
    tdToken.textContent = step.token;
    tdToken.className = "px-4 py-2 font-mono";

    let tdAction = document.createElement("div");
    tdAction.textContent = step.action;
    tdAction.className = "px-4 py-2";

    let tdStack = document.createElement("div");
    tdStack.textContent = step.stack;
    tdStack.className = "px-4 py-2 font-mono";

    row.appendChild(tdToken);
    row.appendChild(tdAction);
    row.appendChild(tdStack);

    tbody.appendChild(row);
  });
  document.getElementById("hasil").textContent = `Hasil = ${result.stack[0]}`;
}


function computeFromPrefix(arr) {
  let operators = ["+", "-", "*", "/"];
  let stack = [];
  let steps = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    let token = arr[i];
    let rowSteps = { token: token }; // <-- bikin object baru setiap loop

    if (operators.includes(token)) {
      let a = stack.pop();
      let b = stack.pop();
      let result;
      switch (token) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = a / b; break;
      }
      stack.push(result);
      rowSteps.action = `Pop ${a},${b} -> ${a} ${token} ${b} = ${result} -> push ${result}`;
    } else {
      stack.push(Number(token));
      rowSteps.action = `Push ${Number(token)}`;
    }

    rowSteps.stack = `[${stack.join(",")}]`;
    steps.push(rowSteps); // simpan step
  }

  return {
    stack,
    steps
  };
}


function computeFromPostfix(arr) {
  let operators = ["+", "-", "*", "/"];
  let stack = [];
  let steps = [];

  for (let i = 0; i < arr.length; i++) {
    let token = arr[i];
    let rowSteps = { token: token };

    if (operators.includes(token)) {
      let b = stack.pop();
      let a = stack.pop();

      let result;
      switch (token) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = a / b; break;
      }
      stack.push(result);

      rowSteps.action = `Pop ${a},${b} -> ${a} ${token} ${b} = ${stack[stack.length-1]} -> push ${stack[stack.length-1]}`;
    } else {
      stack.push(Number(token));
      rowSteps.action = `Push ${token}`;
    }

    rowSteps.stack = `[${stack.join(",")}]`;
    steps.push(rowSteps);
  }

  return {
    stack,
    steps
  };
}

const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", () => {
  // kosongkan input
  input.value = "";

  // kosongkan hasil prefix & postfix
  prefixResult.innerHTML = "";
  postfixResult.innerHTML = "";

  // sembunyikan hasil langkah (biar rapi)
  document.getElementById("stepsResult").classList.add("hidden");

  // kosongkan tabel langkah prefix & postfix
  document.querySelector("#stepsTableBody").innerHTML = "";
  document.querySelector("#stepsPostfixBody").innerHTML = "";

  // kosongkan hasil perhitungan postfix
  document.getElementById("hasil").textContent = "";
});
