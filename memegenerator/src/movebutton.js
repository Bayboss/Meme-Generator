import React from 'react'
import './movebutton.css'

function Movebutton(props){
	
	/*return (
		<div>
			<table cellpadding="0" cellspacing="0" border="2">
				<tr>
					<td></td>
					<td> 
						<div className="btn_up" /> 
					</td>
					<td></td>
				</tr>
				<tr>
					<td>
						<div className="btn_left" /> 
					</td>
					<td><div className="circle" /></td>
					<td>
						<div className="btn_right" /> 
					 </td>
				</tr>
				<tr>
					<td></td>
					<td> 
						<div className="btn_down" /> 
					</td>
					<td></td>
				</tr>
			</table>
		
		</div>
	)*/
	
	return (
		<div>
				<div className="btn_up" />
				<div className="innerTable">
					<div className="combine">
						<div className="btn_left" /> 
						<div className="circle" />
						<div className="btn_right" /> 
					</div>
					<div className="btn_down" /> 
				</div>
			</div>
	)
}

export default Movebutton