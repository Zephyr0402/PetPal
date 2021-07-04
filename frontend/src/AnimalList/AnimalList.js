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
            <List style={{ width: "100%", height: 0 }}
                itemLayout="horizontal"
                dataSource={animalInfos}
                renderItem={(item, index) => (
                    <List.Item className='animal-list-item' id={item.id} style={{ width: "100%", padding: 8 }}>
                        <AnimalThumbnail content={item} index={index} setDisplay={props.setDisplay} />
                    </List.Item>
                )}
            />
        </div>
    );
}

// class AnimalList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { width: 0, height: 0, animalInfos: this.props.data };
//         this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
//     }

//     componentDidMount() {
//         // this.updateWindowDimensions();
//         // window.addEventListener('resize', this.updateWindowDimensions);
//         this.getAnimalInfos();
//     }

//     componentWillUnmount() {
//         // window.removeEventListener('resize', this.updateWindowDimensions);
//     }

//     updateWindowDimensions() {
//         // this.setState({ width: window.innerWidth, height: window.innerHeight - 83 });
//     }

//     getAnimalInfos() {
//         const backEndURL = "http://127.0.0.1:9999/animalinfo";
//         axios.get(backEndURL)
//             .then((res) => {
//                 console.log(res.data.animalInfos);
//                 this.setState({animalInfos: res.data.animalInfos});
//             });
//     }

//     render() {
//         return (
//             <div>
//                 <List style={{ width: "100%", height: this.state.height}}
//                     itemLayout="horizontal"
//                     dataSource={this.state.animalInfos}
//                     renderItem={item => (
//                         <List.Item className = 'animal-list-item' id = {item.id} style={{ width: "100%", padding: 8}}>
//                             <AnimalThumbnail content={ item } setDisplay = {this.props.setDisplay}/>
//                         </List.Item>
//                     )}
//                 />
//             </div>
            
//         )
//     }
// }
export default AnimalList;