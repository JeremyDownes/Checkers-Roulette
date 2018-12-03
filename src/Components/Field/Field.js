import React from 'react'
import './field.css'

class Field extends React.Component {
	constructor(props) {
		super(props)
		this.toggleActiveColor = this.toggleActiveColor.bind(this)
		this.activate = this.activate.bind(this)
		this.selectLocation = this.selectLocation.bind(this)
		this.active = null
		
	}

	toggleActiveColor() {
		if(this.active){
			if(this.active.getAttribute('data-color') === 'white') {
				if(this.active.getAttribute('class') === 'white'){
					this.active.setAttribute('class','active')
				} else {
					this.active.setAttribute('class','white')	
				}											
			} else {

				if(this.active.getAttribute('data-color') === 'black') {
					if(this.active.getAttribute('class') === 'black'){
						this.active.setAttribute('class','active')
					} else {
						this.active.setAttribute('class','black')	
					}
				}
			} 
		}
	}



	selectLocation(e) {
		if(this.active) {
			let from = this.active.getAttribute('data-location').split(',').map(x=> Number(x))
			let direction = Number(this.active.getAttribute('data-direction'))
			let to = e.target.id.split(',').map(x=> Number(x))
			let valid = false

			if(this.props.field[from[1]][from[0]].content && this.props.field[from[1]][from[0]].content.king) {
				const validOffsets = [[-1,-1],[-1,1],[1,-1],[1,1]]
				const jumpOffsets = [[-2,-2],[-2,2],[2,-2],[2,2]]
				validOffsets.forEach(offset=>{ 
					if(from[0]+offset[0]===to[0]&&from[1]+offset[1]===to[1]) {
						if(!this.props.field[to[1]][to[0]].content) {
							this.props.singleSpace(from,to)
							return
						}
					}
				})

				jumpOffsets.forEach(offset=>{
					if(from[0]+offset[0]===to[0]&&from[1]+offset[1]===to[1]) {
						let sign = offset[0] > 0 && offset[1] > 0 ? [1,1] : offset[0] < 0 && offset[1] < 0 ? [-1,-1] : offset[0] > 0 && offset[1] < 0 ? [1,-1] : [-1,1]
						if(this.props.field[from[1]+sign[1]][from[0]+sign[0]].content) {
							if(this.props.field[from[1]+sign[1]][from[0]+sign[0]].content.direction !== direction) {
								if(!this.props.field[to[1]][to[0]].content) {
									this.props.jump(from,to,[to[1]-(offset[1]/2),to[0]-(offset[0]/2)])
								}
							}
						}
					}
				})
			} else {
			
			if(from[1]+direction===to[1]) {
				if(from[0]+1===to[0] || from[0]+-1===to[0]) {
					if(!this.props.field[to[1]][to[0]].content) {
						this.props.singleSpace(from,to)
						valid=true
					}
				}
			}
			if(from[1]+direction*2===to[1]) {
				if(from[0]+2===to[0]) {
					if(this.props.field[to[1]-direction][to[0]-1].content) {
						if(this.props.field[to[1]-direction][to[0]-1].content.direction !== direction ) {
							if(!this.props.field[to[1]][to[0]].content) {
								this.props.jump(from,to,[to[1]-direction,to[0]-1])
								valid=true
							}
						}
					}
				}
				if(from[0]-2===to[0]) {
					if(this.props.field[to[1]-direction][to[0]+1].content) {
						if(this.props.field[to[1]-direction][to[0]+1].content.direction !== direction ) {
							if(!this.props.field[to[1]][to[0]].content) {							
								this.props.jump(from,to,[to[1]-direction,to[0]+1])
								valid=true
							}
						}
					}	
				}
			}
			if(valid) {
				if(direction === -1 && to[1]===0) {setTimeout(this.props.kingMe(to),1000)}
				if(direction === 1 && to[1]===7) {setTimeout(this.props.kingMe(to),1000)}
			}
		}
	}
	}

	activate(e) {
		e.stopPropagation()
		this.toggleActiveColor()
		this.active = e.target
		this.toggleActiveColor()
	}

 	getRandomColor() {
 		return 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')'
 	}

	alternate(row) {

		if(row.location[0]%2===0&&row.location[1]%2===0) {return 		<div className='location' style ={{backgroundColor: 'yellow', height: 48/this.props.field.length+'rem', width:48/this.props.field[0].length+'rem'}} key={row.location} id={row.location}></div>}
		if(row.location[0]%2===1&&row.location[1]%2===1) {return <div className='location' style ={{backgroundColor: 'yellow', height: 48/this.props.field.length+'rem', width:48/this.props.field[0].length+'rem'}} key={row.location} id={row.location}></div>}
		return <div className='location' style ={{backgroundColor: 'blue', height: 48/this.props.field.length+'rem', width:48/this.props.field[0].length+'rem'}} key={row.location} id={row.location} onClick={this.selectLocation}>{this.renderContent(row)}</div>
	}

	renderContent(obj) {
		let color = ''
		if(obj.content) {
			color = obj.content.direction===1?'white':'black'
		  if(obj.content.king){color+=' king'}
		}
		return (
			obj.content? <div className={color} data-direction={obj.content.direction} data-location={obj.location} data-color={obj.content.direction===1?'white':'black'} onClick={this.activate}></div> : null
		)
	}

	generateField () {
		let x = this.props.field.map(column=>{
			return column.map(row=> { return this.alternate(row) })
		})
		return x.map(column=> {return <div className='column'>{column}</div>})
	}


	render() {
		return (
		<div className = 'container'>
		{this.generateField()}
		</div>
		)
	}
}

export default Field