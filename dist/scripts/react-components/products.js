
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2R1Y3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InByb2R1Y3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbnZhciBDYXJvdXNlbFByb2R1Y3RzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGxvYWRKc29uOiBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGpzb25EYXRhID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksXHJcblx0XHRcdHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdGpzb25EYXRhLm92ZXJyaWRlTWltZVR5cGUoXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHRcdHRoaXMuc2VydmVyUmVxdWVzdCA9IGpzb25EYXRhLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoanNvbkRhdGEucmVhZHlTdGF0ZSA9PSA0ICYmIGpzb25EYXRhLnN0YXR1cyA9PSAyMDApIHtcclxuXHRcdFx0XHR0aGF0LnNldFN0YXRlKHsgZGF0YTogSlNPTi5wYXJzZShqc29uRGF0YS5yZXNwb25zZVRleHQpIH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9LmJpbmQodGhpcyk7XHJcblxyXG5cdFx0anNvbkRhdGEub3BlbihcIkdFVFwiLCB0aGF0LnByb3BzLnVybCwgdHJ1ZSk7XHJcblx0XHRqc29uRGF0YS5zZW5kKCk7XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4geyBkYXRhOiB1bmRlZmluZWQgfTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkSnNvbigpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgcmVuZGVyZWQ7XHJcblxyXG5cdFx0aWYgKCB0aGlzLnN0YXRlLmRhdGEgIT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRyZW5kZXJlZCA9IChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwcm9kdWN0cy1jb250YWluZXJcIj5cclxuXHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwid3JhcHBlciB0b3RhbC1jYXJvdXNlbFwiPlxyXG5cdFx0XHRcdFx0e3RoaXMuc3RhdGUuZGF0YS5wcm9kdWN0cy5tYXAoZnVuY3Rpb24gKHByb2R1Y3QpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDxQcm9kdWN0IGtleT17cHJvZHVjdC5uYW1lfSBkYXRhPXtwcm9kdWN0fSAvPjtcclxuXHRcdFx0XHRcdH0pfVxyXG5cdFx0XHRcdDwvdWw+XHJcblx0XHRcdDwvZGl2PilcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbmRlcmVkID0gKDxwPkxvYWRpbmc8L3A+KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdHJlbmRlcmVkXHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcblxyXG52YXIgUHJvZHVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgb2JqID0gdGhpcy5wcm9wcy5kYXRhO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGxpIGNsYXNzTmFtZT1cIml0ZW1cIiBkYXRhLWhvdmVyPXtvYmouaW1nX2hvdmVyfSBkYXRhLXpvb209e29iai56b29tfT5cclxuXHRcdFx0XHQ8aW1nIHNyYz17J2ltYWdlcy9zYXBhdG9zLycrb2JqLmltZ30gYWx0PXtvYmoubmFtZX0gLz5cclxuXHRcdFx0XHQ8cD57b2JqLm5hbWV9PC9wPlxyXG5cdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJzdGFyc1wiPlxyXG5cdFx0XHRcdFx0PGxpPnsnMSd9PC9saT5cclxuXHRcdFx0XHRcdDxsaT57JzInfTwvbGk+XHJcblx0XHRcdFx0XHQ8bGk+eyczJ308L2xpPlxyXG5cdFx0XHRcdFx0PGxpPnsnNCd9PC9saT5cclxuXHRcdFx0XHRcdDxsaT57JzUnfTwvbGk+XHJcblx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHR7IG9iai5mb3IgIT0gJycgPyA8c3BhbiBjbGFzc05hbWU9XCJwcmljZS1mb3JcIj57J0RlOiBSJCAnK29iai5mb3J9PC9zcGFuPiA6ICcnfVxyXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInByaWNlXCI+XHJcblx0XHRcdFx0XHR7J1BvcjogUiQgJ308c3Bhbj57b2JqLnByaWNlfTwvc3Bhbj5cclxuXHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwidGltZXNcIj5cclxuXHRcdFx0XHRcdHsnb3UgJ308Yj57J2F0w6kgJytvYmoudGltZXMrJ1ggJ308L2I+eydkZSAnfTxiPnsnUiQgJytvYmoudmFsdWVfdGltZXN9PC9iPlxyXG5cdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFjdGlvblwiPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj17b2JqLmxpbmt9IGNsYXNzTmFtZT1cImJ1dHRvbi1idXlcIj5jb21wcmFyPC9hPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic2F2ZS12YWx1ZVwiPnsnRWNvbm9taXplOiBSJCAnK29iai5zYXZlX3ZhbHVlfTwvc3Bhbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9saT5cclxuXHRcdCk7XHJcblx0fVxyXG59KVxyXG5cclxudmFyIG15RWxlbWVudCA9IDxDYXJvdXNlbFByb2R1Y3RzIHVybD1cImRhdGEvZGF0YS5qc29uXCIgLz5cclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuXHRteUVsZW1lbnQsXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcGxpY2F0aW9uLXByb2R1Y3RzJylcclxuKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
