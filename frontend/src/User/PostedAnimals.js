import { Avatar, Card, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './UserInfoPage.css'

const { Meta } = Card;

const animalInfo = [
    {
        name: "Jerry",
        imgUrl: "https://images.ctfassets.net/440y9b545yd9/1JvmpdK1yFMQRVAFpoCBOR/d0eafe6ec0baa484f04248258ab21c90/BabyKitten850.jpg",
        description: "A stray kitten found near UBC library",
    },
    {
        name: "Yuki",
        imgUrl: "https://cdn.kinsights.com/cache/8d/0b/8d0baed0ab4e51252a247a3aff378f30.jpg",
        description: "A stray dog found near UBC library",
    },
    {
        name: "Ruby",
        imgUrl: "https://i.guim.co.uk/img/media/9c03bd43c119834ece958f3c370dec83146fe04a/0_200_6000_3602/master/6000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=de1abf11d1a7a961d5fea63f5a8bee55",
        description: "Looking for a new host for my goldfish",
    },
    {
        name: "Tom",
        imgUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/6F9D/production/_94237582_kitten.jpg",
        description: "A stray kitten found near UBC library",
    },
    {
        name: "Milly",
        imgUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/202984001",
        description: "Looking for a new host for my bird",
    },
    {
        name: "BB",
        imgUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
        description: "Looking for a new host for my puppy",
    },
];

const cardDisplay = animalInfo.map((card) =>
    <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
        <Card
        hoverable
        style={{ height: "95%", objectFit: 'cover', width: 200}}
        cover={<img alt={card.name} src={card.imgUrl} width="200" height="150"/>}
        >
        <Meta title={card.name} description={card.description} />
        </Card>
    </Col>
)

function PostedAnimals(){
    return (
        <div style = {{height:'100%', overflow :'auto'}}>
        <br />
        <Row gutter={16}>
            {cardDisplay}
        </Row>
        </div>
    );
}
export default PostedAnimals;