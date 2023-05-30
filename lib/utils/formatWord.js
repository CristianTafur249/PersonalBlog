const formatWord = (word) => {
  // Convertir la palabra a minúsculas
  let formattedWord = word.toLowerCase()
  // Reemplazar los espacios con guiones
  formattedWord = formattedWord.replace(/\s+/g, '-')
  // Retornar la palabra formateada
  return formattedWord
}
export default formatWord
