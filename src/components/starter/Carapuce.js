import React, {Component} from 'react';
import Axios from "axios";
import Loader from "../Loader";
import "../../styles/types.css"
import {Link} from "react-router-dom";

class Carapuce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: "",
            img: "",
            type: ""
        };
    }

    async componentDidMount() {
        try {
            const res = await Axios.get(`https://a4l3z9des2.execute-api.eu-west-3.amazonaws.com/dev/pokemon/squirtle`);
            const data = res.data;
            this.setState({
                isLoaded: true,
                name: data.name,
                img: data.sprites.front_default,
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
        const {error, isLoaded, name, img, type} = this.state;
        if(error) {
            return <div>Error {error.message}</div>;
        } else if (!isLoaded) {
            return <Loader/>;
        } else {
            return (
                <div className="text-center">
                    <Link to={`/${this.state.name}`}>
                        <div className={type}>
                            <h2>{name}</h2>
                            <img src={img} alt={name}/>
                        </div>
                    </Link>
                </div>
            )
        }
    }
}

export default Carapuce;
