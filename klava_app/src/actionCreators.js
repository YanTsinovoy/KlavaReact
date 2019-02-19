
//errorsReducer
let switchErr = () => ({type: "SWITCH_ERROR"})
let addErr = () => ({type: "ADD_ERROR"})
let setErrPos = position => ({type: "SET_ERRPOS", pos: position })
//errorsReducer end

//panelReduser
let incSumW = () => ({type: 'INC_SW'})
let zeroSumW = () => ({type: 'ZERO_SW'})
let finPrnt = () => ({type: "FIN_PRINT"})
let startPrint = () => ({type: "START_PRINT"})
let pushSpeed = nS => ({type:'PUSH_SPEED', speed: nS})
let setTxt = length => ({type: 'SET_TXT_LN', leng: length})
let setOlen = length => ({type: "SET_TXT_OL", lineLen: length})
//panelReduser end

//textWorkReducer
let addTxt = txt => ({type: "ADD_TEXT", text: txt})
let addInpV = val => ({type:"ADD_INPV", value: val })
let cleanInpV = () => ({type:"CLEAN_INPV"})
let incLine = () => ({type: "INC_LINE"})
//textWorkReducer end

//panel & text sonc action
function processingInpVal(val){
  return function(dispatch){
    dispatch(incSumW())
    dispatch(setTxt(val.length))
    dispatch(addInpV(val))
  }
}

function saveAndCleanValInpv(val){
  return function(dispatch){
    console.warn(`saveAndCleanValInpv:${val}`);
    dispatch(setOlen(val.length))
    dispatch(cleanInpV())
  }
}
//panel & text sonc action End



















export {switchErr, addErr, setErrPos, incSumW, zeroSumW,
finPrnt, pushSpeed, setTxt, addTxt, addInpV, cleanInpV,
 incLine, startPrint, processingInpVal, saveAndCleanValInpv}
