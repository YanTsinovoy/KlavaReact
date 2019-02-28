let textSeparator = (text, cW = 8, cS = 45) => { // OLD
  if (!text) return []
  let resArr = []
  let resStr = ""
  text.split("").reduce((obj, el, ind, arr) => {
    obj.str += el // лепим символ в текct строку
    if (el === " ") { // если символ пробел
      obj.words++ // увеличиваем счетчик слов на 1
      obj.symb += obj.str.length // помещаем в переменную текущую длину строки
      if (obj.symb <= cS && obj.words <= cW) { // прверяем условия ограничения
        resStr += obj.str // пхаем текущую строку в результатирующую
        obj.str = "" // обнуляем текущую строку
      } else {
        console.log(resStr)
        resArr.push(resStr.trim()) // отправляем в резудьтатирующий массив рес строку
        resStr = "" // чистим рес строку
        resStr += obj.str // добавляем в рес строку текущую строку
        obj.str = "" // чистим текущую строку
        obj.words = 0 // обнуляем счетчик слов
        obj.symb = 0
      }
    } else {
      if (obj.str.length === cS) {
        resArr.push(resStr.trim()) // отправляем в резудьтатирующий массив рес строку
        resStr = "" // чистим рес строку
        resStr += obj.str // добавляем в рес строку текущую строку
        obj.str = "" // чистим текущую строку
        obj.words = 0 // обнуляем счетчик слов
        obj.symb = 0
      }
    }
    if (ind === arr.length - 1) {
      resArr.push(resStr.trim()) // отправляем в резудьтатирующий массив рес строку
      resStr = "" // чистим рес строку
      resStr += obj.str // добавляем в рес строку текущую строку
      obj.str = "" // чистим текущую строку
      obj.words = 0 // обнуляем счетчик слов
      obj.symb = 0
      resArr.push(resStr.trim())
    }
    return obj
  }, {
    str: "",
    words: 0,
    symb: 0
  })
  return resArr.filter(line => line.length)
} // else в фунуция if функция в параметры задавать условие

export default textSeparator
