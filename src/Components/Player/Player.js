import React from 'react'
import './Player.css'
import walk from './step.gif' // needs Character.js
import stand from './some_pissed_off_little_guy_by_rongs1234.png'

class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {currentAnimation: 'stand', animation: {stand: require('./some_pissed_off_little_guy_by_rongs1234.png'), walk: require('./step.gif'), left: require('./left.gif')}}
		this.class = ''
	}



	render() {
		return (
			<div id='player' className={this.class}>
				<img src={this.state.animation[this.state.currentAnimation]} style={{height: this.props.scale*1.25+'px'}}/>
				<div id='input' type='text' value={this.props.position}></div>
			</div>
		)
	}
}

export default Player