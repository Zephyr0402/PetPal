import React, { useState, useEffect } from 'react';
import { Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AnimalList from './AnimalList';
import { PriceFilter, KindFilter } from './Filters';
import './UtilityView.css';

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
        var filter = e.target.value.toUpperCase();
        var thumbnails = document.getElementsByClassName('animal-list-item')
        if (animalInfos === undefined) {
            return;
        }
        let counter = -1;
        for (let thumbnail of thumbnails) {
            counter++;
            if (animalInfos[counter] === undefined) {
                continue;
            }
            if (animalInfos[counter].name.toUpperCase().indexOf(filter) === -1 && filter !== "") {
                thumbnail.style.display = 'none';
            }
            else {
                thumbnail.style.display = 'block';
            }
        }
    }

    const onFilterClick = (e) => {
        if ((filter === 0 && e.target.innerText === "Kind") || (filter === 1 && e.target.innerText === "Price")) {
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
            default:
                break;
        }
    }

    return (
        <div className="animal-list" style={{ height: '100%' }}>
            <Space direction="vertical" style={{ width: "100%", height: "100%", overflow: 'auto', padding: 8 }}>
                <Input
                    placeholder=" Search animal names, descriptions here..."
                    allowClear
                    onKeyUp={onSearch.bind(this)}
                    style={{ marginLeft: "1%", width :"98%", height: '120%'}}
                    suffix={<SearchOutlined style={{ marginRight: "5px" }} />}
                />
                <div className="filterView" style = {{marginTop : '1%'}}>
                    <b style={{ margin: '2px', fontSize: '14px' }}>Filters:</b>
                    <Button className="filter-type" shape="round" onClick={onFilterClick.bind(this)}>Kind</Button>
                    <Button className="filter-type" shape="round" onClick={onFilterClick.bind(this)}>Price</Button>
                </div>
                {
                    filter === 0 ?
                        <KindFilter data={animalInfos} />
                        : (
                            filter === 1 ?
                                <PriceFilter sortedData={sort(animalInfos)} data={animalInfos}/> : ""
                        )
                }
                <AnimalList style={{ width: 'inherit' }} animalInfos={animalInfos} setDisplay={props.setDisplay}></AnimalList>
            </Space>
        </div>
    );
};

export default UtilityView;
