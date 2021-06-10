import React from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import AnimalThumbnail from './AnimalThumbnail';

const data = [
    {
        name: 'Jerry',
        image: '/test_images/cat.png',
        age: 1,
    },
    {
        name: 'Yuki',
        image: '/test_images/dog.png',
    },
    {
        name: 'Milly',
        image: '/test_images/parrot.png',
    },
    {
        name: 'Ruby',
        image: '/test_images/fish.png',
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
                            <AnimalThumbnail content={ item }/>
                        </List.Item>
                    )}
                />
            </div>
            
        )
    }
}
export default AnimalList;