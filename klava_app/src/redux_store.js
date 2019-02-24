import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

let copy = (obj, howAdd) => howAdd ?
  Object.assign(JSON.parse(JSON.stringify(obj)), howAdd) :
  JSON.parse(JSON.stringify(obj))
var textSeparator = (text, cW = 8, cS = 45) => { // OLD
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


let errorsReducer = (state, action) => {
  if (state === undefined) return {
    error: false, // сделана ли ошибка
    errPos: 999, // позиция ошибки в тексте ( для ограничения длины инпута)
    errs: 0, // количество допущенных ошибок
  }
  if (action.type === "SWITCH_ERROR") {
    return {
      error: !state.error,
      errPos: state.errPos,
      errs: state.errs
    }
  }
  if (action.type === "ADD_ERROR") {
    return {
      error: state.error,
      errPos: state.errPos,
      errs: ++state.errs
    }
  }
  if (action.type === "SET_ERRPOS") {
    return {
      error: state.error,
      errPos: action.pos,
      errs: state.errs
    }
  }
  return state
}
let panelReduser = (state, action) => {
  if (state === undefined) return {
    sumW: 0, // количество набраного текста необходимое для замера скорости
    curSpeed: [0], // массив скоростей
    fin: false, // индикатор конца
    typedTextLength: 0, // длина набронного в данный момент текста
    ownLineLength: 0 // длина набранного за все время текста(вспомогательное свойство)
  }
  if (action.type === 'INC_SW')
    return copy(state, {
      sumW: ++state.sumW
    })
  if (action.type === 'ZERO_SW')
    return copy(state, {
      sumW: 0
    })
  if (action.type === "FIN_PRINT")
    return copy(state, {
      fin: true
    })
  if (action.type === "START_PRINT")
    return copy(state, {
      fin: false
    })
  if (action.type === "SET_TEXT_LENGTH")
    return copy(state, {
      textLength: action.len
    })
  if (action.type === 'PUSH_SPEED') {
    let arrSp = copy(state.curSpeed)
    arrSp.push(action.speed)
    return copy(state, {
      curSpeed: arrSp
    })
  }
  if (action.type === "SET_TXT_OL") {
    console.log("SET_TXT_OL", `state.ownLineLength:${state.ownLineLength} + action.lineLen:${action.lineLen}`)
    let line = state.ownLineLength + action.lineLen
    return copy(state, {
      ownLineLength: line
    })
  }
  if (action.type === 'SET_TXT_LN') {
    console.log('SET_TXT_LN', `action.leng:${action.leng} + state.ownLineLength:${state.ownLineLength}`);
    return copy(state, {
      typedTextLength: action.leng + state.ownLineLength
    })
  }
  return state
}

let textWorkReducer = (state, action) => {
  if (state === undefined) return {
    text: [], // массив с строками одного текста
    inputValue: "", // значение получамые с инпута
    currentLine: 0, // текущщая строка массива строк
  }
  if (action.type === "ADD_TEXT") {
    return copy(state, {
      text: textSeparator(action.text, 10, 60)
    })
  }
  if (action.type === "ADD_INPV") {
    console.warn(`STORE get input value ${action.value}`);
    console.log(state.inputValue + " => " + action.value)
    return copy(state, {
      inputValue: action.value
    })
  }
  if (action.type === "CLEAN_INPV")
    return copy(state, {
      inputValue: ""
    })
  if (action.type === "INC_LINE")
    return copy(state, {
      currentLine: ++state.currentLine
    })
  return state
}


const reducers = combineReducers({
  err: errorsReducer,
  pnl: panelReduser,
  txt: textWorkReducer
})

const store = createStore(reducers, applyMiddleware(thunk));

export {
  store
}
