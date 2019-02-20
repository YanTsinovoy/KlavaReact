import React, { Component } from 'react';


class ChartCanvas extends Component {
  inc = 0
  drawChart (){
    console.log("Drawing",this.props.history)
    let height = this.props.sizes[1]
    const ctx = this.refs.canvas.getContext('2d')
    this.props.history.slice(this.props.history.length - 6 ?  this.props.history.length - 6 : 0).forEach((coord, ind, arr) => {
      console.log(ctx, arr, this.inc)
      if(arr[ind + 1]){
        ctx.moveTo(this.inc, height - coord);
        ctx.lineTo(this.inc, height - arr[ind + 1][0] );
        ctx.stroke();
        this.inc += 10
      }
    })
    this.inc = 0
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
        <canvas style={{background: "gray"}} ref="canvas" width={p.sizes[0]} height={p.sizes[1]}/>
        {p.history}
      </div>
    )
  }
}


export default ChartCanvas
