import React, { Component } from 'react';

class ChartCanvas extends Component {
  counter = 0
  ctx = null
  inc = 0
  drawChart (){
    console.log("slice",this.props.history.slice(this.props.history.length - 10 ?  this.props.history.length - 10 : 0, this.props.history.length))
    let height = this.props.sizes[1]
    let ctx = this.refs.canvas.getContext('2d')
    console.log("clearRect",this.props.sizes[0], this.props.sizes[1])
    ctx.clearRect(0, 0, this.props.sizes[0], this.props.sizes[1])
    let inc = 0
    let incArr = []
    this.props.history.slice(this.props.history.length - 15 > 0 ?  this.props.history.length - 15 : 0, this.props.history.length).forEach((coord, ind, arr) => {
      console.log(ctx, arr, this.inc)
      console.warn(arr[ind + 1])
      if(arr[ind + 1] !== undefined){
        console.warn("if")
        console.log("width",this.inc, "heigth",height - coord)
        console.log("moveTo",inc, height - coord)
        ctx.moveTo((inc += 20) - 20, height - coord);
        console.log("lineTo",inc,height - arr[ind + 1] )
        ctx.lineTo(inc, height - arr[ind + 1] );
        ctx.stroke();
        ctx.beginPath()
        incArr.push(inc)
      }
      console.log(incArr)
      this.counter ++
      //ctx.clearRect(0, 0, this.props.sizes[0], this.props.sizes[1])
    })
  }

  shouldComponentUpdate(){return true}
  componentDidUpdate(){
    console.log("didUpdate")
    this.drawChart()
  }

  render(){
    let p = this.props
    console.log( p.history)
    return (
      <div>
        <canvas style={{background: "red"}} ref="canvas" width={p.sizes[0]} height={p.sizes[1]}/>
      </div>
    )
  }
}


export default ChartCanvas
