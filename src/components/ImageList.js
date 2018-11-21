import { Popconfirm, Button } from 'antd';
import { List, Card } from 'antd';
import productImg from '../assets/sample.jpeg';
const ImageList = ({ handleDetail, imgs }) => {
    let data = [];

    for (let i = 10; i < 36; i++) {
        data.push({
            title: 'ID 20181129-1-' + i,
        });
    }

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
            <List.Item>
                <Card title={item.title} extra={<div><a href="#">查看详情</a></div>}>
                    <img className="productImg" src={productImg} alt=""/>
                </Card>
            </List.Item>
            )}
        />
    );
};

export default ImageList;