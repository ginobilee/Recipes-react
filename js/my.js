ReactModal.setAppElement('#dialog');

class Edit extends React.Component{
	constructor(props){
		super(props);
		this.closeDialog=this.closeDialog.bind(this);
		this.edit = this.edit.bind(this);
		this.change = this.change.bind(this);
		this.state={
			name:this.props.name,
			ingres:this.props.ingre
		}
	}
	closeDialog(){
		/*------------dont update the change--------------*/
		this.setState({
			name:this.props.name,
			ingres:this.props.ingre
		});
		this.props.closeDialog();
	}
	change(){
		this.setState({
			name:this.refs.nameInput.value,
			ingres:this.refs.ingreInput.value
		});
	}
	edit(){
		this.props.edit(this.refs.nameInput.value,this.refs.ingreInput.value);
		this.setState({
			name:this.refs.nameInput.value,
			ingres:this.refs.ingreInput.value
		});
		this.props.closeDialog();
	}
	render(){
		return (
					<ReactModal
 						isOpen={this.props.showFlag}
 						onRequestClose={this.closeDialog}
 						shouldCloseOnOverlayClick={true}
 						style={{
 							overlay:{
 								backgroundColor:'rgba(0,0,0,0.5)',
 							},
 							content:{
 								position:'absolute',
 								height:'300'
 							}
 						}}
           	contentLabel="Example"
           	>
 						<h2>Edit Recipe</h2>
 						<button className='close' onClick={this.closeDialog}>X</button>
 						<hr />
 						<h3>Recipe</h3>
 						<input type = 'text' ref='nameInput' className='long' value={this.state.name} onChange={this.change} />
 						<h3>Ingredients</h3>
 						<input type='text' ref='ingreInput' className='long' value={this.state.ingres} onChange={this.change} />
 						<button  onClick={this.edit}>Edit Recipe</button>
 						<button  onClick={this.closeDialog}>Cancel</button>
 					</ReactModal>
		);
	}
}

class RecipeDetail extends React.Component{
	constructor(props){
		super(props);
		this.delete = this.delete.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
 		this.openDialog = this.openDialog.bind(this);
 		this.edit = this.edit.bind(this);
 		this.state = {
 				showFlag:false
 		}
	}
	delete(ee){
		this.props.delete();
	}
	closeDialog(){
 		this.setState({showFlag:false});
	}
	openDialog(){
		this.setState({showFlag:true});
	}
	edit(vn,vi){
 		this.props.edit(vn,vi);
	}
	render(){
		const ingres = this.props.ingre.map((element,index)=>
				<li key={element.name}>{element}</li>
		);
		return (
			<div className='recipeDetail'>
					<div className='recipeContent'>
						<div className='rname'>{this.props.name}</div>
						<ul>
							{ingres}
						</ul>
					</div>
					<div className='btns'>
						<button className='btn btn-danger floatRight' onClick={this.delete}>Delete</button>
						<button className='btn btn-success floatRight' onClick={this.openDialog}>Edit</button>
					</div>
						<Edit edit={this.edit} showFlag={this.state.showFlag} name={this.props.name} ingre={this.props.ingre} closeDialog={this.closeDialog} />
			</div>
		);
	}
}

class Recipe extends React.Component{
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.delete = this.delete.bind(this);
		this.edit = this.edit.bind(this);
		this.state = {
			showDetail:false
		}
	}
	toggle(){
		this.setState({showDetail:!this.state.showDetail});
	}
	delete(){
		this.props.delete(this.props['data-key']);
	}
	edit(vn,vi){
		this.props.edit(vn,vi,this.props['data-key']);
	}

	render(){
		const name = this.props.content.name;
		const ingre = this.props.content.ingredients;

		return (
			<div className='recipe'>
				<div className='title'><a href='#' onClick={this.toggle}>{name}</a></div>
				<div>{this.state.showDetail&&<RecipeDetail name={name} ingre={ingre} delete={this.delete} edit={this.edit} />}</div>
			</div>
		);
	}
}

class Add extends React.Component{
	constructor(props){
		super(props);
		this.closeDialog=this.closeDialog.bind(this);
		this.edit = this.edit.bind(this);
		this.change = this.change.bind(this);
		this.add = this.add.bind(this);
		this.state={
			showFlag:false,
			name:'',
			ingres:''	,
			warning:'Please input name and ingredients!'
		}
	}
	closeDialog(){
		/*------------dont update the change--------------*/
		this.setState({
			showFlag:false,
			name:'',
			ingres:''	,
			warning:'Please input name and ingredients!'
		});
	}
	add(){
		this.setState({
			showFlag:true,
			name:'',
			ingres:''	,
			warning:'Please input name and ingredients!'
		});
	}
	change(){
		this.setState({
			name:this.refs.nameInput.value,
			ingres:this.refs.ingreInput.value
		});
	}
	edit(){
		if(	this.refs.nameInput.value==''){
			this.setState({
				warning:'Name should not be empty!'
			});
		}else if(this.refs.ingreInput.value==''){
			this.setState({
				warning:'Ingredients should not be empty!'
			});
		}else{
			this.props.add(this.refs.nameInput.value,this.refs.ingreInput.value);
			this.setState({
			showFlag:false,
			name:'',
			ingres:''	,
			warning:'Please input name and ingredients!'
		});
		}
	}
	render(){
		return (
			<div className='addBtn'>
					<button className='btn btn-primary' onClick={this.add}>Add Recipe</button>
					<ReactModal
 						isOpen={this.state.showFlag}
 						onRequestClose={this.closeDialog}
 						shouldCloseOnOverlayClick={true}
 						style={{
 							overlay:{
 								backgroundColor:'rgba(0,0,0,0.5)',
 							},
 							content:{
 								position:'absolute',
 								height:'300'
 							}
 						}}
           	contentLabel="Add"
           	>
 						<h2 >Add Recipe</h2><p>{this.state.warning}</p>
 						<button className='close' onClick={this.closeDialog}>X</button>
 						<hr />
 						<h3>Recipe</h3>
 						<input type = 'text' ref='nameInput' className='long' value={this.state.name} onChange={this.change} />
 						<h3>Ingredients</h3>
 						<input type='text' ref='ingreInput' className='long' value={this.state.ingres} onChange={this.change} />
 						<button  onClick={this.edit}>Add Recipe</button>
 						<button  onClick={this.closeDialog}>Cancel</button>
 					</ReactModal>
 			</div>
		);
	}
}

class RecipeManage extends React.Component{
	constructor(){
		super();
		let recipes=[];
		if(localStorage.recipes){//get recipes from localStorage
			recipes = JSON.parse(localStorage.recipes);
		}else{//init the recipes
			recipes=[{id:1,name:'Pumpkin Pie',ingredients:['Pumpkin Puree','Sweetened Condensed Milk','Eggs','Pumpkin Pie Spice','Pie Crust']},
										 {id:2,name:'Spaghetti',ingredients:['Noodles','Tomato Sauce','(Optional) Meatballs']}];
			const recipesStr = JSON.stringify(recipes);
			localStorage.setItem('recipes',recipesStr);
		}
		this.delete = this.delete.bind(this);
		this.edit = this.edit.bind(this);
		this.add = this.add.bind(this);
		this.state={
			recipes:recipes
		}
	}
	delete(key){
			let i=0,flag = false,newRecipes = this.state.recipes;
			for(i=0;i<newRecipes.length;i++){
				if(newRecipes[i].id == key){
					newRecipes.splice(i,1);
					flag=true;
					break;
				}
			}
			if(flag){
					const nRecipesStr = JSON.stringify(newRecipes);
					localStorage.setItem('recipes',nRecipesStr);
					this.setState({recipes:newRecipes});
			}
	}
	edit(vn,vi,key){
		const newIngre = vi.split(',');

		let i=0,flag = false,newRecipes = this.state.recipes;
		for(i=0;i<newRecipes.length;i++){
			if(newRecipes[i].id == key){
				//need change here///
				newRecipes[i].name = vn;
				newRecipes[i].ingredients = newIngre;
				flag=true;
				break;
			}
		}
		if(flag){
			 const nRecipesStr = JSON.stringify(newRecipes);
			 localStorage.setItem('recipes',nRecipesStr);
			 this.setState({recipes:newRecipes});
		}
	}
	add(vn,vi){
		//change vi to array
		const newIngre = vi.split(',');
		let newRecipes = this.state.recipes;
		const newId = newRecipes.length + 1;
		const newRecipe = {id:newId,name:vn,ingredients:newIngre};
		newRecipes.push(newRecipe);
		//update local
		const nRecipesStr = JSON.stringify(newRecipes);
		localStorage.setItem('recipes',nRecipesStr);
		this.setState({
			recipes:newRecipes
		});
	}
	render(){
		const rr = this.state.recipes;
		const reci = rr.map((element,index) =>
	    <Recipe edit={this.edit} content={element} data-key={element.id} key={element.id} delete={this.delete} edit={this.edit} />
	  );
		return (
			<div>
				<div id='recipes'>
					{reci}
				</div>
				<Add add={this.add} />
			</div>
		);
	}
}

ReactDOM.render(
<RecipeManage />,
document.getElementById('main'));
