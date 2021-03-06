import React, { Component } from 'react';
import './chart_canvas.css'


class ChartCanvas extends Component {
  drawChart (){
    let historyBiggerToHeight = this.props.history.slice(this.props.history.length - 10 > 0 ?
      this.props.history.length - 10 : 0, this.props.history.length).reduce((val, num)=>{
      if(num > val) val = num
      return val
    },0)
    let scaler = historyBiggerToHeight ? this.props.height / historyBiggerToHeight : 1
    let ctx = this.refs.canvas.getContext('2d')
    ctx.clearRect(0, 0,this.props.width, this.props.height)
    let inc = 0
    let incArr = []
    let drawGrid = () => {
      let xStep = this.props.width/10
      let yStep = this.props.height/10
      let x = 0
      let y = 0
      let draw= (coord, coord2, step, mode ) => {
        if(!mode) return console.error("set the fouth parameter mode = 'vertical'/ 'horizontal'")
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = '#3f4042aa'
        ctx.moveTo(coord, coord2)
        if(mode === 'vertical'){
          ctx.lineTo(coord, 0)
          x += step
        }  else if(mode === 'horizontal'){
          ctx.lineTo(0, coord2)
          y += step
        }

        ctx.stroke()
      }
      let i = 0
      while(i++ < 11){
        draw(x, this.props.height, xStep, 'vertical')
        draw( this.props.width, y, yStep, 'horizontal')
      }
    }
    drawGrid()
    this.props.history.slice(this.props.history.length - 10 > 0 ?
      this.props.history.length - 10 : 0, this.props.history.length)
        .map(num => {
          return num * scaler
        }).forEach((coord, ind, arr) => {
          if(arr[ind + 1] !== undefined){
            ctx.beginPath()
            ctx.moveTo((inc += this.props.width/10) - this.props.width/10, this.props.height - coord);
            ctx.strokeStyle = '#8ff442fa'
            ctx.lineWidth = 4
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.lineTo(inc, this.props.height - arr[ind + 1] );
            ctx.stroke();
            incArr.push(inc)
          }
        })
  }

  shouldComponentUpdate(){return true}

  componentDidUpdate(){
    this.drawChart()
  }

  render(){
    console.log(this.props.width, this.props.height)
    let p = this.props
    return (
      <div className="chart_canvas" style={{width: p.width+ 10 + "px"}}>
        <div className='chart_canvas_horizontal'>
          <div className='chart_canvas_horizontal-value_name'>{
            p.names[0] + ": every " + Math.round(Math.max(...p.history.slice(this.props.history.length - 9 > 0 ?
              this.props.history.length - 9 : 0, this.props.history.length))/10)
          }</div>
          <canvas className="canvas_ch" ref="canvas" width={this.props.width} height={this.props.height}/>
        </div>
        <div className='chart_canvas_step_name'>{p.names[1]}</div>
      </div>
    )
  }
}


export default ChartCanvas
