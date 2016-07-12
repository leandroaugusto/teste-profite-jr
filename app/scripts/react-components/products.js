
var CarouselProducts = React.createClass({
	loadJson: function(){
		var jsonData = new XMLHttpRequest(),
			that = this;

		jsonData.overrideMimeType("application/json");

		this.serverRequest = jsonData.onreadystatechange = function() {
			if (jsonData.readyState == 4 && jsonData.status == 200) {
				that.setState({ data: JSON.parse(jsonData.responseText) });
			}
		}.bind(this);

		jsonData.open("GET", that.props.url, true);
		jsonData.send();
	},
	getInitialState: function(){
		return { data: undefined };
	},
	componentDidMount: function(){
		this.loadJson();
	},
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},
	render: function(){
		var rendered;

		if ( this.state.data != undefined ) {
			rendered = (
			<div className="products-container">
				<ul className="wrapper total-carousel">
					{this.state.data.products.map(function (product) {
						return <Product key={product.name} data={product} />;
					})}
				</ul>
			</div>)
		} else {
			rendered = (<p>Loading</p>)
		}

		return (
			rendered
		);
	}
});

var Product = React.createClass({
	render: function(){
		var obj = this.props.data;
		return (
			<li className="item" data-hover={obj.img_hover} data-zoom={obj.zoom}>
				<img src={'images/sapatos/'+obj.img} alt={obj.name} />
				<p>{obj.name}</p>
				<ul className="stars">
					<li>{'1'}</li>
					<li>{'2'}</li>
					<li>{'3'}</li>
					<li>{'4'}</li>
					<li>{'5'}</li>
				</ul>
				{ obj.for != '' ? <span className="price-for">{'De: R$ '+obj.for}</span> : ''}
				<span className="price">
					{'Por: R$ '}<span>{obj.price}</span>
				</span>
				<span className="times">
					{'ou '}<b>{'até '+obj.times+'X '}</b>{'de '}<b>{'R$ '+obj.value_times}</b>
				</span>
				<div className="action">
					<a href={obj.link} className="button-buy">comprar</a>
					<span className="save-value">{'Economize: R$ '+obj.save_value}</span>
				</div>
			</li>
		);
	}
})

var myElement = <CarouselProducts url="data/data.json" />

ReactDOM.render(
	myElement,
	document.getElementById('application-products')
);
