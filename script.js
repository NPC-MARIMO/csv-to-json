let browse = document.querySelector("#browse");
let convert = document.querySelector("#convert");
let copy = document.querySelector("#copy");
let save = document.querySelector("#save");
let csvText = document.querySelector("#csvText");
let jsonText = document.querySelector("#jsonText");

browse.addEventListener('change' , (e) => {
    const file = event.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const fileContent = e.target.result;
      csvText.textContent = fileContent;
    };

    reader.onerror = function(e) {
      console.error("Error reading file", e);
    };
    
    reader.readAsText(file); // Read the file as text (for CSV, TXT, etc.)
  } else {
    console.log("No file selected.");
  }
})

function csvToJson(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const result = [];
  
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');
  
      if (currentLine.length === headers.length) {
        headers.forEach((header, index) => {
          obj[header.trim()] = currentLine[index].trim();
        });
        result.push(obj);
      }
    }
    return result;
}


convert.addEventListener("click", () => {
    let csvTxt = document.querySelector("#csvText").value
    const jsonResult = csvToJson(csvTxt);
    jsonText.value = JSON.stringify(jsonResult, null, 2);
});


copy.addEventListener("click", () => {
    navigator.clipboard.writeText(jsonText.value)
    alert(" JSON Data Copied to clipboard");
});
save.addEventListener("click", () => {
    if (!jsonText.value) {
        alert("No JSON data to save");
    } else {
        let blob = new Blob([jsonText.value], { type: "application/json" });
        let a = document.createElement("a");
        a.download = "data.json";
        a.href = window.URL.createObjectURL(blob);
        a.click();
    }
});