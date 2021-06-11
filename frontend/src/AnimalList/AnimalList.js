import React from 'react';
import 'antd/dist/antd.css';
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
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight - 83 });
    }

    render() {
        return (
            <div>
                <List style={{ width: "100%", height: this.state.height}}
                    itemLayout="horizontal"
                    dataSource={data}
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