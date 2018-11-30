import { Card, List } from 'antd';
class ImageList extends React.Component {
  render(){
    const data = this.props.imgs;
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card title={item.imgID} extra={<div><a href="javascript:;" onClick={()=>this.props.handleDetail(item.imgID)}>查看详情</a></div>}>
              <img className="productImg" src={item.imgURL} alt={item.status} />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

export default ImageList;
