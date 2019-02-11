import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

let errorsReducer = (state, action) => {
  if(state === undefined) return {
    error: false, // сделана ли ошибка
    errPos:999, // позиция ошибки в тексте ( для ограничения длины инпута)
    errs: 0, // количество допущенных ошибок
  }
  if(action.type === "SWITCH_ERROR"){
    return {error: !state.error, errPos: state.errPos, errs: state.errs}
  }
  if(action.type === "ADD_ERROR"){
    return {error: state.error, errPos: state.errPos, errs: ++state.errs}
  }
  if(action.type === "SET_ERRPOS"){
    return {error: state.error, errPos: action.pos, errs: state.errs}
  }
  return state
}

let panelReduser = (state, action) => {
  if(state === undefined) return {
    sumW: 0 , // количество набраного текста необходимое для замера скорости
    curSpeed: [], // массив скоростей
    fin: false, // индикатор конца
    typedTextLength: 0 // длина наброного текста
  }
  if(action.type === 'INC_SW') return Object.assign(state,{sumW: ++state.sumW})
  if(action.type === 'ZERO_SW') return Object.assign(state, {sumW: 0})
  if(action.type === "FIN_PRINT")return Object.assign(state, {fin: true})
  if(action.type === 'PUSH_SPEED'){
    let arrSp = JSON.parse(JSON.stringify(state.curSpeed))
    arrSp.push(action.speed)
    return Object.assign(state, {curSpeed: arrSp})
  }
  if(action.type === 'INC_TXT_LN') return
    Object.assign(state,{typedTextLength: ++state.typedTextLength } )
  return state
}

let textWorkReducer = (state, action) => {
  if(state === undefined) return {
    text: [], // массив с строками одного текста
    inputValue: "", // значение получамые с инпута
    currentLine: 0 // текущщая строка массива строк
  }
  if(action.type === "ADD_TEXT"){
    let textSeparator = text => {
        if(!text) return []
        let resArr = []
      	let resStr = ""
      	let obj = {str: "", words: 0, symb: 0}
      	let cW = 8
      	let cS = 45
      	text.split("").forEach ((el, ind) => {
      		obj.str += el
      		if(el === " "){
      			obj.words++
      			obj.symb += obj.str.length
      			if(obj.symb <= cS || obj.words <= cW){
      				resStr += obj.str
      				obj.str = ""
                  } else {
      				resArr.push(resStr.slice(0, resStr.length - 1))
      				resStr = ""
      				resStr += obj.str
      				obj.str = ""
      				obj.words = 0
      			}
      		}
      	})
      	return resArr
    }
    return Object.assign(state, {text: textSeparator(action.text)})
  }
  if(action.type === "ADD_INPV"){
    console.log(state.inputValue + " => " + action.value)
    return Object.assign(state, {inputValue: action.value})
  }
  if(action.type === "CLEAN_INPV") return Object.assign(state, {inputValue: ""})
  if(action.type === "INC_LINE") return Object.assign(state, {currentLine: ++state.currentLine})
  return state
}


const reducers = combineReducers({
    err: errorsReducer,
    pnl: panelReduser,
    txt: textWorkReducer
})

const store = createStore(reducers);

export { store }
