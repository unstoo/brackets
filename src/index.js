module.exports = function check(str, bracketsConfig) {
  const openBracketsDictionary = []
  const closedBracketsDictionary = []

  bracketsConfig.forEach((setOfBrackets, i) => {
    openBracketsDictionary.push(setOfBrackets[0])
    closedBracketsDictionary.push(setOfBrackets[1])
  })

  function getLastBracketFrom(bracketList) {
    return bracketList[bracketList.length - 1]
  }

  function itsOpen(bracket) {
    return openBracketsDictionary.includes(bracket)
  }

  function itsClosed(bracket) {
    return closedBracketsDictionary.includes(bracket)
  }

  function isPair(closedBracket, openBracket) {
    return openBracketsDictionary.indexOf(openBracket) === closedBracketsDictionary.indexOf(closedBracket)
  }

  let openBracketsList = []
  let splitStr = str.split('')

  for (i=0; i < splitStr.length; i++) {
    let bracket = splitStr[i]
    
    if (itsOpen(bracket) && itsClosed(bracket)) {
      // "|"
      if (openBracketsList.length === 0) {
        openBracketsList.push(bracket)
        continue
      }
      
      let lastOpenBracket = getLastBracketFrom(openBracketsList)
      
      // "|(|"
      if (isPair(bracket, lastOpenBracket)) {
        openBracketsList.pop()
        continue
      } else {
        openBracketsList.push(bracket)
        continue
      } 
    }
    
    if (itsOpen(bracket)) {
      openBracketsList.push(bracket)
      continue
    } 
    
    // if the Bracket is closing
    // 1 There should be an open bracket(s)
    if (openBracketsList.length === 0) {
      return false
    }
    
    // 2  the closing Bracket should be a sibling of the last Open bracket
    let lastOpenBracket = getLastBracketFrom(openBracketsList)    

    if (itsClosed(bracket) && isPair(bracket, lastOpenBracket)) {
      openBracketsList.pop()
    } 
    
    // 3
    if (itsClosed(bracket) && !isPair(bracket, lastOpenBracket)){
      return false  
    } 
 
  }

  return openBracketsList.length === 0 ? true : false
}
