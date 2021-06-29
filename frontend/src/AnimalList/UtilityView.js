import React, { useState, useEffect } from 'react';
import { Input, Space, Button, AutoComplete, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AnimalList from './AnimalList';
import { PriceFilter, KindFilter } from './Filters';
import './UtilityView.css';
import { fetchAnimalList } from '../Services/fetchData';

export const data = [
    {
        id: 0,
        name: 'Jerry',
        kind: 'cat',
        image: '/animalImages/cat.png',
        price: 4
    },
    {
        id: 1,
        name: 'Yuki',
        kind: 'dog',
        image: '/animalImages/dog.png',
        price: 2
    },
    {
        id: 2,
        name: 'Milly',
        kind: 'bird',
        image: '/animalImages/parrot.png',
        price: 3
    },
    {
        id: 3,
        name: 'Ruby',
        kind: 'fish',
        image: '/animalImages/fish.png',
        price: 1
    },

];

export var sortedData = data;

const UtilityView = (props) => {
    const [filter, setFilter] = useState(-1);
    const [animalInfos, setAnimalInfos] = useState(props.animalInfos);

    useEffect(() => {
        setAnimalInfos(props.animalInfos);
    }, [props.animalInfos])

    const ascPrice = (x, y) => {
        return (x["price"] > y["price"]) ? 1 : -1;
    }

    const sort = (JSONarray) => {
        return JSON.parse(JSON.stringify(JSONarray)).sort(ascPrice);
    }

    const onSearch = (e) => {
        console.log(animalInfos);
        var filter = e.target.value.toUpperCase();
        console.log("filter:", filter);
        var thumbnails = document.getElementsByClassName('animal-list-item')
        if (animalInfos === undefined) {
            return;
        }
        console.log(thumbnails);
        for (let thumbnail of thumbnails) {

            if (animalInfos[thumbnail.id].name.toUpperCase().indexOf(filter) == -1 && filter != "") {
                thumbnail.style.display = 'none';
            }
            else {
                thumbnail.style.display = 'block';
            }
        }
    }

    const onFilterClick = (e) => {
        sortedData = sort(data);
        if ((filter === 0 && e.target.innerText == "Kind") || (filter === 1 && e.target.innerText == "Price")) {
            setFilter(-1);
            return;
        }
        switch (e.target.innerText) {
            case "Kind":
                setFilter(0);
                break;
            case "Price":
                setFilter(1);
                break;
        }
    }

    return (
        <div className="animal-list" style={{ height: '100%' }}>
            <Space direction="vertical" style={{ width: "100%", height: "100%", overflow: 'scroll', padding: 8 }}>
                <Input
                    placeholder=" Search animal names, descriptions here..."
                    allowClear
                    onKeyUp={onSearch.bind(this)}
                    style={{ marginLeft: "4px", width: '96%', height: '30px', padding: 0 }}
                    suffix={<SearchOutlined style={{ marginRight: "5px" }} />}
                />
                <div className="filterView">
                    <b style={{ margin: '2px', fontSize: '16px' }}>Filter:</b>
                    <Button className="filter-type" shape="round" onClick={onFilterClick.bind(this)}>Kind</Button>
                    <Button className="filter-type" shape="round" onClick={onFilterClick.bind(this)}>Price</Button>
                </div>
                {
                    filter === 0 ?
                        <KindFilter data={data} />
                        : (
                            filter === 1 ?
                                <PriceFilter /> : ""
                        )
                }
                <AnimalList style={{ width: 'inherit' }} animalInfos={animalInfos} setDisplay={props.setDisplay}></AnimalList>
            </Space>
        </div>
    );
}

// class UtilityView extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             filter: -1,//-1 means no change, i>=0 means filter[i] is on
//             animalInfos: data,
//         }
//         console.log(this.state.animalInfos);
//         this.getAnimalInfos();
//     }

//     ascPrice = (x,y) => {
//         return (x["price"] > y["price"]) ? 1 : -1;
//     }

//     sort = (JSONarray) => {
//         return JSON.parse(JSON.stringify(JSONarray)).sort(this.ascPrice);
//     }

//     onSearch(e) {
//         console.log(this.state.animalInfos);
//         var filter = e.target.value.toUpperCase();
//         console.log("filter:", filter);
//         var thumbnails = document.getElementsByClassName('animal-list-item')
//         if (this.state.animalInfos === undefined) {
//             return;
//         }
//         console.log(thumbnails);
//         for (let thumbnail of thumbnails) {

//             if (this.state.animalInfos[thumbnail.id].name.toUpperCase().indexOf(filter) == -1 && filter != ""){
//                 thumbnail.style.display = 'none';
//             }
//             else{
//                 thumbnail.style.display = 'block';
//             }
//         }
//     }

//     onFilterClick(e){
//         sortedData = this.sort(data);
//         if((this.state.filter === 0 && e.target.innerText == "Kind") || (this.state.filter === 1 && e.target.innerText == "Price")){
//             this.setState({
//                 filter:-1
//             })
//             return;
//         }
//         switch(e.target.innerText){
//             case "Kind":
//                 this.setState({
//                     filter: 0
//                 })
//                 break;
//             case "Price":
//                 this.setState({
//                     filter: 1
//                 })
//                 break; 
//         }
//     }

//     getAnimalInfos() {
//         const backEndURL = "http://127.0.0.1:9999/animalinfo";
//         axios.get(backEndURL)
//             .then((res) => {
//                 console.log(res.data.animalInfos);
//                 this.setState({ animalInfos: res.data.animalInfos });
//                 this.data = res.data.animalInfos;
//                 console.log(this.state.animalInfos);
//             });
//     }

//     render() {
//         return (
//             <div className = "animal-list" style = {{height:'100%'}}>
//                 <Space direction="vertical" style={{ width: "100%", height:"100%", overflow:'scroll', padding: 8}}>
//                     <Input 
//                         placeholder=" Search animal names, descriptions here..." 
//                         allowClear 
//                         onKeyUp={this.onSearch.bind(this)} 
//                         style={{ marginLeft: "4px", width: '96%', height: '30px', padding: 0}}
//                         suffix = {<SearchOutlined style = {{marginRight:"5px"}}/>}
//                     />
//                     <div className="filterView">
//                         <b style={{ margin: '2px', fontSize: '16px'}}>Filter:</b>
//                         <Button className = "filter-type" shape="round" onClick = {this.onFilterClick.bind(this)}>Kind</Button>
//                         <Button className = "filter-type" shape="round" onClick = {this.onFilterClick.bind(this)}>Price</Button>
//                     </div>
//                     {
//                         this.state.filter === 0 ?
//                             <KindFilter data = {data}/>
//                         : (
//                             this.state.filter === 1 ? 
//                                 <PriceFilter/> : ""
//                         )
//                     }
//                     <AnimalList style={{ width: 'inherit' }} data = {this.state.animalInfos} setDisplay = {this.props.setDisplay}></AnimalList>
//                 </Space>
//             </div>
//         )
//     }

// }

export default UtilityView;