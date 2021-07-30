import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import AnimalThumbnail from './AnimalThumbnail';

const AnimalList = (props) => {
    const [animalInfos, setAnimalInfos] = useState(props.animalInfos);
    
    useEffect(() => {
        setAnimalInfos(props.animalInfos);
    }, [props.animalInfos]);

    return (
        <div>
            <List style={{ width: "100%"}}
                itemLayout="horizontal"
                dataSource={animalInfos}
                renderItem={(item, index) => (
                    <List.Item className='animal-list-item' id={item.id} style={{ width: "100%" }}>
                        <AnimalThumbnail content={item} index={index} setDisplay={props.setDisplay} />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default AnimalList;