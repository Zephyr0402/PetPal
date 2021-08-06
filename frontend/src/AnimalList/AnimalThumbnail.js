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
        <Card className="animal-thumbnail" hoverable cover={<img alt="example" style={{ height: "100%", objectFit: 'cover', width: 300 }} src={props.content.image} />} onClick={() => props.setDisplay(props.index)}>
            <Meta
                title={name}
                description={'$' + props.content.price}
            />
            <br />
            <Button type="primary" >View Info</Button>
        </Card>
    );
}

export default AnimalThumbnail;
