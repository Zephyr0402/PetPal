import React from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import AnimalThumbnail from './AnimalThumbnail';

class AnimalList extends React.Component {
    

    render() {
        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
            {
                title: 'Ant Design Title 5',
            },
            {
                title: 'Ant Design Title 6',
            },
            {
                title: 'Ant Design Title 7',
            },
        ];
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item style={{ width: "300px", padding: 0}}>
                            <AnimalThumbnail/>
                        </List.Item>
                    )}
                />
            </div>
            
        )
    }
}

export default AnimalList;