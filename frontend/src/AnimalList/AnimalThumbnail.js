import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import './AnimalThumbnail.css';
import { Button, Card } from 'antd';

const AnimalThumbnail = (props) => {
    const { Meta } = Card;
    const [name, setName] = useState(props.content.name);
    const [price, setPrice] = useState(props.content.price);

    useEffect(() => {
        setName(props.content.name);
        setPrice(props.content.price);
    }, [props.content]);

    return (
        <Card className="animal-thumbnail" hoverable cover={<img alt={name + " image"} src={props.content.image} />} onClick={() => props.setDisplay(props.index)}>
            <Meta
                title={name}
                description={'$' + price}
            />
            <br />
            <Button type="primary" >View Info</Button>
        </Card>
    );
}

export default AnimalThumbnail;
