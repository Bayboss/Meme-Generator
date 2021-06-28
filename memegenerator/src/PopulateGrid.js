import React from 'react'
import


function PopulateGrid(props){
	
	const picturesgrid=props.pictures.pics.map(pic => {
			return (
				<img className="gridimage" src={pic.url} onClick={props.pictures.func}/>
				
			)
		})
	
	return (
		 picturesgrid
	)
}

export default PopulateGrid