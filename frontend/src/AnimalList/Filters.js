import React, { useEffect, useState } from 'react';
import {Slider, InputNumber, Button} from 'antd';
import { data, sortedData } from './UtilityView';
import { LineOutlined } from '@ant-design/icons';
import './Filter.css'

export const KindFilter = (props) => {
    const [kind, setKind] = useState("none");

    useEffect(()=>{
        return function cleanup(){
            var thumbnails = document.getElementsByClassName('animal-list-item')

            for(let thumbnail of thumbnails)
                thumbnail.style.display = 'block';
            }
    },[]);

    const onKindChange = (e) => {
        var thumbnails = document.getElementsByClassName('animal-list-item')
        for(let thumbnail of thumbnails){
            if(data[thumbnail.id].kind.toUpperCase() === e.target.innerText.toUpperCase())
                thumbnail.style.display = 'block';
            else 
                thumbnail.style.display = 'none';
        }
    }

    return(
        <div className = "filter-border">
            Kind:<br/>
            <div>
                <Button className = "kind-filter-option" shape="round" onClick = {onKindChange}>Cat</Button>
                <Button className = "kind-filter-option" shape="round" onClick = {onKindChange}>Dog</Button>
                <Button className = "kind-filter-option" shape="round" onClick = {onKindChange}>Bird</Button>
                <Button className = "kind-filter-option" shape="round" onClick = {onKindChange}>Fish</Button>
            </div>
        </div>
    )
}

export const PriceFilter = (props) => {
    const [range, setRange] = useState({min:0, max:100});
    const [curRange, setCurRange] = useState({min:0,max:100});

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
        var thumbnails = document.getElementsByClassName('animal-list-item')

        for(let thumbnail of thumbnails){
            if(data[thumbnail.id].price >= min && data[thumbnail.id].price <= max)
                thumbnail.style.display = 'block';
            else 
                thumbnail.style.display = 'none';
        }
        setCurRange({
            min: min,
            max: max
        })
    }

    return(
        <div className = "filter-border">
            Price Range:<br/>
            <InputNumber 
                id = "minPriceInput" 
                min = {range.min} max = {curRange.max} defaultValue = {range.min} value = {curRange.min} 
                bordered = {false} size = 'large' 
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange = {onRangeMinInputChange}/>
            <LineOutlined />
            <InputNumber 
                id = "maxPriceInput" 
                min = {curRange.min} max = {range.max} defaultValue = {range.max} value = {curRange.max} 
                bordered = {false} size = 'large'
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} 
                onChange = {onRangeMaxInputChange}/>
            <Slider range min = {range.min} max = {range.max} defaultValue={[range.min, range.max]} value = {[curRange.min, curRange.max]} onChange = {onSliderChange}/>
        </div>
    )
}