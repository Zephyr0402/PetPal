import React from 'react';
import { Input, Space, Button } from 'antd';
import AnimalList from './AnimalList';

class UtilityView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { Search } = Input;
        const onSearch = value => console.log(value);
        return (
            <div>
                <Space direction="vertical">
                    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300 }} />
                    <div>
                        <Button style={{ margin: '2px' }} shape="round">Age</Button>
                        <Button style={{ margin: '2px' }} shape="round">City</Button>
                        <Button style={{ margin: '2px' }} shape="round">Kind</Button>
                    </div>
                    <AnimalList></AnimalList>
                </Space>
            </div>

        )
    }

}

export default UtilityView;