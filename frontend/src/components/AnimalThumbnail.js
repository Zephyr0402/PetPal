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
        const testImage = "/test_images/cat.png";
        return (
            <Card className="AnimalCard" hoverable cover={<img alt="example" style={{ height: "100%", objectFit: 'cover', width: 100 }} src={testImage} />}>
                <Meta
                    title={this.state.animalName}
                    description={this.state.animalDescription}
                />
                <br/>
                <Button type="primary">View Info</Button>
            </Card>
        )
    }
}

export default AnimalThumbnail;