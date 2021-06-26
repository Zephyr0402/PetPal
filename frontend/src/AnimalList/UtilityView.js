import React from 'react';
import { Input, Space, Button, AutoComplete, Select} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AnimalList from './AnimalList';
import { PriceFilter, KindFilter} from './Filters';
import './UtilityView.css';

export const data = [
    {
        id : 0,
        name: 'Jerry',
        kind: 'cat',
        image: '/animalImages/cat.png',
        price: 4
    },
    {
        id : 1,
        name: 'Yuki',
        kind: 'dog',
        image: '/animalImages/dog.png',
        price: 2
    },
    {
        id : 2,
        name: 'Milly',
        kind: 'bird',
        image: '/animalImages/parrot.png',
        price: 3
    },
    {
        id : 3,
        name: 'Ruby',
        kind: 'fish',
        image: '/animalImages/fish.png',
        price: 1
    },
    
];

export var sortedData = data;

class UtilityView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: -1//-1 means no change, i>=0 means filter[i] is on
        }
    }

    ascPrice = (x,y) => {
        return (x["price"] > y["price"]) ? 1 : -1;
    }

    sort = (JSONarray) => {
        return JSON.parse(JSON.stringify(JSONarray)).sort(this.ascPrice);
    }

    onSearch(e){
        var filter = e.target.value.toUpperCase();
        var thumbnails = document.getElementsByClassName('animal-list-item')
        for(let thumbnail of thumbnails){
            if(data[thumbnail.id].name.toUpperCase().indexOf(filter) == -1){
                thumbnail.style.display = 'none';
            }
            else{
                thumbnail.style.display = 'block';
            }
        }
    }

    onFilterClick(e){
        sortedData = this.sort(data);
        if((this.state.filter === 0 && e.target.innerText == "Kind") || (this.state.filter === 1 && e.target.innerText == "Price")){
            this.setState({
                filter:-1
            })
            return;
        }
        switch(e.target.innerText){
            case "Kind":
                this.setState({
                    filter: 0
                })
                break;
            case "Price":
                this.setState({
                    filter: 1
                })
                break; 
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
                        <Button className = "filter-type" shape="round" onClick = {this.onFilterClick.bind(this)}>Kind</Button>
                        <Button className = "filter-type" shape="round" onClick = {this.onFilterClick.bind(this)}>Price</Button>
                    </div>
                    {
                        this.state.filter === 0 ?
                            <KindFilter data = {data}/>
                        : (
                            this.state.filter === 1 ? 
                                <PriceFilter/> : ""
                        )
                    }
                    <AnimalList style={{ width: 'inherit' }} data = {data} setDisplay = {this.props.setDisplay}></AnimalList>
                </Space>
            </div>
        )
    }

}

export default UtilityView;