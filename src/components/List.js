import React, {Component} from 'react';
import Item from "./Item";
import Loader from "./Loader";
import Filter from "./Filter";
import Axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            poke: [],
            pokesearch: [],
            value: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            const res = await Axios.get('https://a4l3z9des2.execute-api.eu-west-3.amazonaws.com/dev/pokemon?limit=150');
            const data = res.data['results'];
            this.setState({
                isLoaded: true,
                poke: data,
                pokesearch: data
            })
        } catch (e) {
            this.setState({
                isLoaded: true,
                error: e
            })
        }
    }

    handleChange(e) {
        this.setState({
            value: e.currentTarget.value,
            poke: this.state.pokesearch.filter(pokesearch =>
                pokesearch.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            ),
        });
    }

    render() {
        const {error, isLoaded, poke} = this.state;
        if(error) {
            return <div>Error {error.message}</div>;
        } else if (!isLoaded) {
            return <Loader/>;
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 text-center">
                        <Filter value={this.state.value} handleChange={this.handleChange}/>
                        </div>
                        {poke.map(function (pokemon, i) {
                            return (
                                <Item key={pokemon.name} {...pokemon} url={pokemon.url} />
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
}

export default List
