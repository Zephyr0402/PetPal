import React, { useEffect, useState } from 'react';
import {Slider, InputNumber, Button} from 'antd';
import { LineOutlined } from '@ant-design/icons';
import './Filter.css'

export const KindFilter = (props) => {
    const data = props.data;

    useEffect(()=>{
        return function cleanup(){
            var thumbnails = document.getElementsByClassName('animal-list-item')

            for(let thumbnail of thumbnails)
                thumbnail.style.display = 'block';
            }
    },[]);

    const onKindChange = (e) => {
        var thumbnails = document.getElementsByClassName('animal-list-item')
        var index = 0;
        for (let thumbnail of thumbnails) {
            if (data[index] === undefined) {
                thumbnail.style.display = 'none';
                continue;
            }
            if (data[index].kind.toUpperCase() === e.target.innerText.toUpperCase())
                thumbnail.style.display = 'block';
            else
                thumbnail.style.display = 'none';
            index++;
        }
    }

    return(
        <div className = "filter-border">
            <div>
                <Button className="kind-filter-option" onClick={onKindChange}>Squirrel</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Bird</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Cat</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Chicken</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Dog</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Duck</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Fish</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Guinea Pig</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Hamster</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Horse</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Mouse/Rat</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Rabbit</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Snake</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Spider</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Turtle</Button>
                <Button className="kind-filter-option" onClick={onKindChange}>Other</Button>
            </div>
        </div>
    )
}

export const PriceFilter = (props) => {
    const [range, setRange] = useState({min:0, max:100});
    const [curRange, setCurRange] = useState({ min: 0, max: 100 });
    const sortedData = props.sortedData;
    const data = props.data;

    useEffect(()=>{
        setRange({
            min: sortedData[0].price,
            max: sortedData[sortedData.length-1].price
        });
        return function cleanup(){
            var thumbnails = document.getElementsByClassName('animal-list-item')

            for(let thumbnail of thumbnails)
                thumbnail.style.display = 'block';
            }
    },[]);

    useEffect(()=>{
        setCurRange({
            min: sortedData[0].price,
            max: sortedData[sortedData.length-1].price
        });
    },[]);

    const onRangeMinInputChange = (value) => {
        onSliderChange([value,curRange.max])
    }

    const onRangeMaxInputChange = (value) => {
        onSliderChange([curRange.min,value])
    }

    const onSliderChange = ([min, max]) => {
        var thumbnails = document.getElementsByClassName('animal-list-item');
        var index = 0;
        for (let thumbnail of thumbnails) {
            if (data[index] === undefined) {
                thumbnail.style.display = 'none';
                continue;
            }
            if(data[index].price >= min && data[index].price <= max)
                thumbnail.style.display = 'block';
            else
                thumbnail.style.display = 'none';
            index++;
        }
        setCurRange({
            min: min,
            max: max
        })
    }

    return(
        <div className = "filter-border">
            <InputNumber
                id = "minPriceInput" 
                min = {range.min} max = {curRange.max} defaultValue = {range.min} value = {curRange.min} 
                bordered = {false} size = 'small' 
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange = {onRangeMinInputChange}/>
            <LineOutlined />
            <LineOutlined />
            <InputNumber 
                style = {{ marginLeft: "8px", width : "70px"}}
                id = "maxPriceInput" 
                min = {curRange.min} max = {range.max} defaultValue = {range.max} value = {curRange.max} 
                bordered={false} size= 'small'
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} 
                onChange = {onRangeMaxInputChange}/>
            <Slider range min = {range.min} max = {range.max} defaultValue={[range.min, range.max]} value = {[curRange.min, curRange.max]} onChange = {onSliderChange}/>
        </div>
    )
}
