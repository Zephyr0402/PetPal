import 'antd/dist/antd.css';
import React from 'react';
import './AnimalThumbnail.css';
import { Button, Card } from 'antd';

class AnimalThumbnail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            animalName: "Animal Name",
            animalDescription: "Animal Description",
        };
    }

    // Feed animal info
    changeState(animalName, animalDescription) {
        return;
    }

    render() {
        const { Meta } = Card;
        return (
            <Card className="animal-thumbnail" hoverable cover={<img alt="example" style={{ height: "100%", objectFit: 'cover', width: 130 }} src={this.props.content.image} />}>
                <Meta
                    title={this.props.content.name}
                    description={this.state.animalDescription}
                />
                <br/>
                <Button type="primary">View Info</Button>
            </Card>
        )
    }
}

export default AnimalThumbnail;