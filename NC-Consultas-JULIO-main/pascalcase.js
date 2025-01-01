

let nombre = "JULIO IGNACIO"

// nombre = nombre.toLowerCase()

const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


let result = toTitleCase(nombre)
console.log(result);