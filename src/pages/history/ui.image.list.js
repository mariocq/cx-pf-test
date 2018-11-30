import { Card, List } from 'antd';
const ImageList = ({ handleDetail, imgs }) => {
  const data = imgs;
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card title={item.imgID} extra={<div><a href="#">查看详情</a></div>}>
            <img className="productImg" src={item.imgURL} alt={item.status} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ImageList;
