import React from 'react';
import { Input, Space, Button } from 'antd';
import AnimalList from './AnimalList';
import './UtilityView.css';

class UtilityView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { Search } = Input;
        const onSearch = value => console.log(value);
        return (
            <div>
                <Space direction="vertical" style={{ width: "300px", padding: 8 }}>
                    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ marginLeft: "4px", width: '96%', height: '30px', padding: 0}} />
                    <div className="filterView">
                        <b style={{ margin: '2px', fontSize: '16px'}}>Filter</b>
                        <Button style={{ margin: '2px' }} shape="round">Age</Button>
                        <Button style={{ margin: '2px' }} shape="round">City</Button>
                        <Button style={{ margin: '2px' }} shape="round">Kind</Button>
                        
                    </div>
                    <AnimalList style={{ width: 'inherit' }}></AnimalList>
                </Space>
            </div>

        )
    }

}

export default UtilityView;