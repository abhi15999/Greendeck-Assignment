import React, { Component } from 'react'
import Products from './Products'

export default class frontPage extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, products: [] }
    }

    componentDidMount() {
        fetch('http://localhost:5000/')
            .then(res => res.json())
            // .then(data=>console.log(data))
            .then(data => this.setState({ loading: true, products: data }))
    }

    render() {
        const { loading, products } = this.state;

        if (!loading) {
            return (
                <div>
                    <p>Loading....</p>
                </div>
            );
        }

        else {
            return (
                <div>
                    <div>
                        {products.map(product => <div><Products name={product.name} /></div>)}
                    </div>
                </div>
            );
        }
    }
}
