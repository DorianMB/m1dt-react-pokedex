import React, {Component} from 'react';
import Axios from "axios";
import Loader from "./Loader";
import "../styles/types.css"

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: "",
            img: "",
            weight: "",
            size: "",
            ability1: "",
            ability2: "",
            speed: "",
            specialdef: "",
            specialatt: "",
            def: "",
            attack: "",
            hp: "",
            type: ""
        };
    }

    async componentDidMount() {
        try {
            const res = await Axios.get(`https://a4l3z9des2.execute-api.eu-west-3.amazonaws.com/dev/pokemon/${this.props.match.params.pokemon}`);
            const data = res.data;
            this.setState({
                isLoaded: true,
                name: data.name,
                img: data.sprites.front_default,
                weight: data.weight,
                size: data.height,
                ability1: data.abilities[0].ability.name,
                ability2: data.abilities[1].ability.name,
                speed: data.stats[0].base_stat,
                specialdef: data.stats[1].base_stat,
                specialatt: data.stats[2].base_stat,
                def: data.stats[3].base_stat,
                attack: data.stats[4].base_stat,
                hp: data.stats[5].base_stat,
                type: data.types.filter((f) => f.slot === 1)[0].type.name

            })
        } catch (e) {
            this.setState({
                isLoaded: true,
                error: e
            })
        }
    }

    render(){
        const {error, isLoaded, name, img, weight, size, ability1, ability2, speed, specialdef, specialatt, def, attack, hp, type} = this.state;
        if(error) {
            return <div>Error {error.message}</div>;
        } else if (!isLoaded) {
            return <Loader/>;
        } else {
            return (
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/list">Pokemons</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{name}</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="offset-md-3 col-md-6 offset-lg-3 col-lg-6 text-center">
                            <div className={type}>
                                <h2>{name}</h2>
                                <img src={img} alt={name}/>
                                <p>Poids : {weight}</p>
                                <p>Taille : {size}</p>
                                <p>Capacité 1 : {ability1}</p>
                                <p>Capacité 2 : {ability2}</p>
                                <p>Vitesse : {speed}</p>
                                <p>Défense spéciale : {specialdef}</p>
                                <p>Attaque spéciale : {specialatt}</p>
                                <p>Défense  : {def}</p>
                                <p>Attaque : {attack}</p>
                                <p>PV : {hp}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Pokemon;
