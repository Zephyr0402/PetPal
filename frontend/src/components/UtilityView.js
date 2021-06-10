import React from 'react';
import { Input, Space, Button, AutoComplete, Select} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AnimalList from './AnimalList';
import './UtilityView.css';

class UtilityView extends React.Component {
    constructor(props) {
        super(props);
    }

    onSearch(e){
        var filter = e.target.value.toUpperCase();
        var thumbnails = document.getElementsByClassName('animal-list-item')
        for(let thumbnail of thumbnails){
            if(thumbnail.id.toUpperCase().indexOf(filter) == -1){
                console.log(thumbnail);
                thumbnail.style.display = 'none';
            }
            else{
                thumbnail.style.display = 'block';
            }
        }
    }

    render() {
        return (
            <div className = "animal-list" style = {{height:'100%'}}>
                <Space direction="vertical" style={{ width: "100%", height:"100%", overflow:'scroll', padding: 8}}>
                    <Input 
                        placeholder=" Search animal names, descriptions here..." 
                        allowClear 
                        onKeyUp={this.onSearch} 
                        style={{ marginLeft: "4px", width: '96%', height: '30px', padding: 0}}
                        suffix = {<SearchOutlined style = {{marginRight:"5px"}}/>}
                    />
                    <div className="filterView">
                        <b style={{ margin: '2px', fontSize: '16px'}}>Filter:</b>
                        <Button className = "filter-type" shape="round">Age</Button>
                        <Button className = "filter-type" shape="round">City</Button>
                        <Button className = "filter-type" shape="round">Kind</Button>
                    </div>
                    <AnimalList style={{ width: 'inherit' }}></AnimalList>
                </Space>
            </div>

        )
    }

}

export default UtilityView;