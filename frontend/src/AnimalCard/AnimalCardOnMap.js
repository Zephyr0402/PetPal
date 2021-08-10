import React, { useState,useEffect } from 'react';
import './AnimalCard.css';
import {Card, Button} from 'antd';

const { Meta } = Card;
const AnimalCardOnMap = (props) => {
    const thisCard = props.animalCardInfo;

    return (
        <Card
            className="animalCardOnMap"
            cover={
                <img
                    alt={thisCard.name + " image"}
                    src={thisCard.image}
                />
            }
            onClick={() => console.log("click thumbnail")}
        >
            <Meta title={thisCard.name} description={thisCard.description} />
            <h2>{thisCard.price}</h2>
            <Button onClick={() => console.log("close thumbnail")}>Close</Button>
        </Card>
    )
};

export default AnimalCardOnMap;
