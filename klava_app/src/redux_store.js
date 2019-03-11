import { createStore, combineReducers, applyMiddleware } from 'redux';
import textSeparator from './utils/textSeparator.js';
import copy from './utils/copy.js'
import thunk from 'redux-thunk';


const errorsReducer = (state, action) => {
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


const panelReduser = (state, action) => {
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
    let line = state.ownLineLength + action.lineLen
    return copy(state, {
      ownLineLength: line
    })
  }
  if (action.type === 'SET_TXT_LN') {
    return copy(state, {
      typedTextLength: action.leng + state.ownLineLength
    })
  }
  return state
}


const textWorkReducer = (state, action) => {
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
const timeReducer = (state = {
  m: 0,
  s: 0
}, action) => {
  if (action.type === "INC_TIMER") {
    if (state.s === 59) {
      return {
        m: ++state.m,
        s: 0
      }
    } else return {
      m: state.m,
      s: ++state.s
    }
  }
  return state
}


const gameReducer = (state, action) => {
  if (state === undefined)
    return {
      diff: 1000,
      width: 0,
      enX: 0,
      plX: 0,
      length: 0,
      plW: 0,
      enW: 0,
      fin: "during"
    }
  if (action.type === 'SET_WIDTH')
    return {
      ...state,
      width: action.w,
      plW: action.pl,
      enW: action.en
    }
  if (action.type === "ENEMY_GO") {
    let nPos = state.enX + Math.round ( state.width / state.diff )
    if (nPos >= (state.width - state.enW)) {
      nPos = state.enX
      return {
        ...state,
        enX: nPos,
        fin: "LOSE"
      }
    }
    return {
      ...state,
      enX: nPos
    }
  }
  if (action.type === "SET_LENGTH") {
    return {
      ...state,
      length: action.len
    }
  }
  if (action.type === "PLAYER_GO") {
    let nPos = state.plX + state.width / state.length
    if (nPos >= state.width - state.plW) {
      nPos = state.plX
      return {
        ...state,
        plX: nPos,
        fin: "WIN"
      }
    } else return {
      ...state,
      plX: nPos
    }
  }
  return state
}


const reducers = combineReducers({
  err: errorsReducer,
  pnl: panelReduser,
  txt: textWorkReducer,
  time: timeReducer,
  game: gameReducer
})

const store = createStore(reducers, applyMiddleware(thunk));

export { store }
