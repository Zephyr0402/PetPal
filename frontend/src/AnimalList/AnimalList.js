import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { List } from 'antd';
import AnimalThumbnail from './AnimalThumbnail';

const data = [
    {
        id : 0,
        name: 'Jerry',
        image: '/animalImages/cat.png',
    },
    {
        id : 1,
        name: 'Yuki',
        image: '/animalImages/dog.png',
    },
    {
        id : 2,
        name: 'Milly',
        image: '/animalImages/parrot.png',
    },
    {
        id : 3,
        name: 'Ruby',
        image: '/animalImages/fish.png',
    },
    
];

class AnimalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, animalInfos: data };
        this.animalInfos = null;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.getAnimalInfos();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight - 83 });
    }

    getAnimalInfos() {
        const backEndURL = "http://127.0.0.1:3001/animalinfo";
        axios.get(backEndURL)
            .then((res) => {
                console.log(res.data.animalInfos);
                this.setState({animalInfos: res.data.animalInfos});
            });
    }

    render() {
        return (
            <div>
                <List style={{ width: "100%", height: this.state.height}}
                    itemLayout="horizontal"
                    dataSource={this.state.animalInfos}
                    renderItem={item => (
                        <List.Item className = 'animal-list-item' id = {item.name} style={{ width: "100%", padding: 8}}>
                            <AnimalThumbnail content={ item } setDisplay = {this.props.setDisplay}/>
                        </List.Item>
                    )}
                />
            </div>
            
        )
    }
}
export default AnimalList;