import './App.css';
import Container from './Container';
import Counter from './Counter';

function App() {
	const counterProps = {
		a : 1,
		b : 2,
		c : 3,
		d : 4,
		e : 5
	}
	return (
		<Container>
			<div className="App">
				<Counter {...counterProps} />
			</div>
		</Container>
	);
}

export default App;
