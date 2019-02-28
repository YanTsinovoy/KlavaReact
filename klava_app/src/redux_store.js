import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import textSeparator from './utils/textSeparator.js';
import copy from './utils/copy.js'
import thunk from 'redux-thunk';

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
  txt: textWorkReducer,
})

const store = createStore(reducers, applyMiddleware(thunk));

export {
  store
}
