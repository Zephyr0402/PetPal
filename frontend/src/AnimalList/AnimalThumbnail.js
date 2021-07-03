import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import './AnimalThumbnail.css';
import { Button, Card } from 'antd';

const AnimalThumbnail = (props) => {
    const { Meta } = Card;
    const [name, setName] = useState(props.content.name);

    useEffect(() => {
        setName(props.content.name);
    }, [props.name]);

    return (
        <Card className="animal-thumbnail" hoverable cover={<img alt="example" style={{ height: "100%", objectFit: 'cover', width: 300 }} src={props.content.image} />} onClick={() => props.setDisplay(props.content.id)}>
            <Meta
                title={name}
                description={props.content.description}
            />
            <br />
            <Button type="primary" >View Info</Button>
        </Card>
    );
}

// class AnimalThumbnail extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             animalName: "Animal Name",
//             animalDescription: "Animal Description",
//         };
//     }

//     // Feed animal info
//     changeState(animalName, animalDescription) {
//         return;
//     }

//     render() {
//         const { Meta } = Card;
//         return (
//             <Card className="animal-thumbnail" hoverable cover={<img alt="example" style={{ height: "100%", objectFit: 'cover', width: 300}} src={this.props.content.image} />} onClick = {() => this.props.setDisplay(this.props.content.id)}>
//                 <Meta
//                     title={this.props.content.name}
//                     description={this.props.content.description}
//                 />
//                 <br/>
//                 <Button type="primary" >View Info</Button>
//             </Card>
//         )
//     }
// }

export default AnimalThumbnail;
