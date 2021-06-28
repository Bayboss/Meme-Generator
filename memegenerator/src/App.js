
import React from "react"
import Header from "./header"
import htmlToImage from 'html-to-image';
import PopulateGrid from './PopulateGrid'

class App extends React.Component{
	
	constructor(){
		super();
		this.state={
			horizontal:50,
			vertical:0,
			topText:"",
			bottomText:"",
			weburl:"",
			imgsrc:"http://i.imgflip.com/1bij.jpg",
			pics:[]
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleOnsubmit=this.handleOnsubmit.bind(this);
		this.handleImageChange=this.handleImageChange.bind(this);
		this.handleOnsubmitwebImage=this.handleOnsubmitwebImage.bind(this);
		this.handleMemeChange=this.handleMemeChange.bind(this);
		this.handleUploadImage=this.handleUploadImage.bind(this);
		this.move=this.move.bind(this);
		this.myRef = React.createRef() 
	}
	
	scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop)  
	
	handleChange(event){
		const {name, value}=event.target;
		this.setState({ [name]:value})
	}
	
	componentDidMount(){
		fetch("https://api.imgflip.com/get_memes").then(response => response.json()).then(response => 
				{
				const {memes}=response.data
				this.setState({pics : memes})
				console.log(this.state.pics[0])
				}
		)
		/*if(this.state.pics.length <1)
		{
			document.getElementById("img_gallary").style="display:none";
		}
		else{
			document.getElementById("img_gallary").style="display:grid";
		}*/
	}
	
	handleImageChange(event){
		const {value}=event.target
		this.setState({imgsrc:value})
		console.log(value)
	}
	
	
	handleOnsubmit(event){
		if(this.state.pics.length > 0){
			event.preventDefault();
			const x=Math.floor(Math.random() * this.state.pics.length)
			const url=this.state.pics[x].url;
			this.setState({imgsrc:url})
		}
		else{
			alert("You are Offline");
		}
		//console.log(this.state.pics.length)
	}
	
	handleOnsubmitwebImage(event){
		const value=this.state.weburl;
		this.setState({imgsrc:value})
		console.log(value)
	}
	
	handleMemeChange(event){
		const {src}=event.target;
		this.setState({imgsrc:src})
		this.scrollToMyRef();
	}
	
	handleUploadImage(event){
		this.setState({imgsrc:URL.createObjectURL(event.target.files[0])})
	}
	
	downloadImage(){
			htmlToImage.toJpeg(document.getElementById('completememe'), { quality: 0.95 })
		  .then(function (dataUrl) {
			var link = document.createElement('a');
			link.download = 'my-image-name.jpeg';
			link.href = dataUrl;
			link.click();
		  });
	}
	
	
	move(i,direction){
		if(direction=='h'){
			const horiz_value=this.state.horizontal+i*5;
			const vert_value=this.state.vertical;
			this.setState({horizontal:horiz_value});
			document.getElementsByClassName("top")[0].style="transform:translateX(-"+horiz_value+"%);top:"+vert_value+"px;";
		}
		else{
			const vert_value=this.state.vertical+i*5;
			const horiz_value=this.state.horizontal;
			this.setState({vertical:vert_value});
			document.getElementsByClassName("top")[0].style="top:"+vert_value+"px;transform:translateX(-"+horiz_value+"%)";
		}
	}
	
	render(){
		
		const varpasstoParent={pics:this.state.pics,func:this.handleMemeChange};
		return (
			<div>
				<Header />
				<div>
					<form className="meme-form" >
						<input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange} />
						<input type="text" name="bottomText" placeholder="Botton Text" value={this.state.bottomText} onChange={this.handleChange} />
						<input className="inputButton" type="button" value="Shuffle" onClick={this.handleOnsubmit}/>
					</form>
				</div>
				<div className="dividememeandweb">
					<div ref={this.myRef} className="memepart" id="completememe">
							<img src={this.state.imgsrc} alt="Invalid Address"/>
							<h2 className="top" > {this.state.topText} </h2>
							<h2 className="bottom"> {this.state.bottomText} </h2>
					</div>
					
					<div className="webpart">
						&nbsp;&nbsp;&nbsp;&nbsp;<input className="inpt" name="weburl" type="text" placeholder="Enter image URL" onChange={this.handleChange}/>
						<button className="btn" onClick={this.handleOnsubmitwebImage}>Apply Image</button>
						<br/><br/><br/>
						<form>
							<input type="file" className="btndownload" onChange={this.handleUploadImage}/>
						</form>
						<button className="btndownload" onClick={this.downloadImage}>Download Meme as Image</button>
						
						<button className="left" onClick={this.move.bind(this,1,'h')}> Move left</button>
						<button className="left" onClick={this.move.bind(this,-1,'h')}> Move right</button>
						<input type="button" className="btn_up" onClick={this.move.bind(this,-1,'v')}/> 
						<button className="left" onClick={this.move.bind(this,1,'v')}> Move Down</button>
					</div>
				</div>
				<hr/>
				<div className="imageoutergrid" id="img_gallary">
						<h1> Meme Gallery</h1>
						<PopulateGrid pictures={varpasstoParent} />
				</div>
			</div>
		)
	}
}

export default App;