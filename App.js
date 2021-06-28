
import React from "react"
import Header from "./header"
import htmlToImage from 'html-to-image';
import PopulateGrid from './PopulateGrid'

class App extends React.Component{
	
	constructor(){
		super();
		this.state={
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
	}
	
	handleImageChange(event){
		const {value}=event.target
		this.setState({imgsrc:value})
		console.log(value)
	}
	
	
	handleOnsubmit(event){
		event.preventDefault();
		const x=Math.floor(Math.random() * this.state.pics.length)
		const url=this.state.pics[x].url;
		this.setState({imgsrc:url})
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
	
	downloadImage(){
			htmlToImage.toJpeg(document.getElementById('completememe'), { quality: 0.95 })
		  .then(function (dataUrl) {
			var link = document.createElement('a');
			link.download = 'my-image-name.jpeg';
			link.href = dataUrl;
			link.click();
		  });
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
							<h2 className="top"> {this.state.topText} </h2>
							<h2 className="bottom"> {this.state.bottomText} </h2>
					</div>
					
					<div className="webpart">
						<input className="inpt" name="weburl" type="text" placeholder="Enter image URL" onChange={this.handleChange}/>
						<button className="btn" onClick={this.handleOnsubmitwebImage}>Apply Image</button>
						<br/><br/><br/><br/><br/><br/><br/><br/>
						<button className="btndownload" onClick={this.downloadImage}>Download Meme as Image</button>
					</div>
				</div>
				<hr/>
				<div className="imageoutergrid">
						<PopulateGrid pictures={varpasstoParent} />
				</div>
			</div>
		)
	}
}

export default App;