import React, { Component } from 'react';

class ChartCanvas extends Component {
  drawChart (){
    let height = this.props.sizes[1]
    let width = this.props.sizes[0]
    let historyBiggerToHeight = this.props.history.reduce((val, num)=>{
      if(num > val) val = num
      return val
    },0)
    let scaler = historyBiggerToHeight ? height / historyBiggerToHeight : 1
    let ctx = this.refs.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.props.sizes[0], this.props.sizes[1])
    let inc = 0
    let incArr = []
    this.props.history.slice(this.props.history.length - 9 > 0 ?
      this.props.history.length - 9 : 0, this.props.history.length)
        .map(num => {
          console.warn(num)
          return num * scaler
        }).forEach((coord, ind, arr) => {
          if(arr[ind + 1] !== undefined){
            ctx.moveTo((inc += width/10) - width/10, height - coord);
            if(height - coord < 0)console.error(`coord:${coord}; scaler:${scaler}; height:${height}; position: ${height - coord}`)
             else console.warn(`coord:${coord}; scaler:${scaler}; height:${height}; position: ${height - coord}`)
            ctx.lineTo(inc, height - arr[ind + 1] );
            ctx.stroke();
            ctx.beginPath()
            incArr.push(inc)
          }
        })
  }

  shouldComponentUpdate(){return true}

  componentDidUpdate(){
    this.drawChart()
  }

  render(){
    let p = this.props
    console.log( p.history)
    return (
      <div>
        <canvas style={{background: "gray"}} ref="canvas" width={p.sizes[0]} height={p.sizes[1]}/>
      </div>
    )
  }
}


export default ChartCanvas
