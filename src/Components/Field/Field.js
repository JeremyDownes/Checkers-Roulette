import React from 'react'
import './field.css'

class Field extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		
	}

	handleClick(e) {
		e.target.getAttribute('class') === 'location' ?  e.target.setAttribute('class','selected') : e.target.setAttribute('class','location')
		this.props.handleClick(e.target.id)
	}

	generateField () {
		let x = this.props.field.map(column=>{
			return column.map(row=> {return (<div className={row.status === 'active'? 'selected' : 'location'} id={row.location} onClick={this.handleClick}></div>)})
		})
		return x.map(column=> {return <div className='column'>{column}</div>})
	}


	render() {
		return (
		<div>
		{this.generateField()}
		</div>
		)
	}
}

export default Field