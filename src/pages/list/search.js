import { Form, Row, Col, Select, Button, DatePicker } from 'antd';

import styles from './index.css';
const FormItem = Form.Item;
const Option = Select.Option;
class Component extends React.Component {

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }
    handleReset = () => {
        this.props.form.resetFields();
    }
    getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        // 日期
        children.push(
            <Col span={8} key={1}>
                <FormItem label="日期" className={styles["ant-form-item"]}>
                    {getFieldDecorator(`date`, {
                        rules: [{
                            type: 'object',
                            message: '请输入查询日期',
                        }],
                    })(
                        <DatePicker style={{ width: 300 }} />
                    )}
                </FormItem>
            </Col>
        );

        // 标记状态
        children.push(
            <Col span={8} key={2}>
                <FormItem label="标记状态" className={styles["ant-form-item"]}>
                    {getFieldDecorator(`status`, {
                        rules: [{
                            required: true, message: '请输入标记状态', type: 'array'
                        }],
                        initialValue: ['1', '2'],

                    })(
                        <Select
                            mode="multiple"
                            style={{ width: 300 }}
                        >
                            <Option key={1}>无标记</Option>
                            <Option key={2}>有标记</Option>
                        </Select>,
                    )}
                </FormItem>
            </Col>
        );

        // 卷数
        const opts = []
        for (let i = 10; i < 36; i++) {
            opts.push(<Option key={i}>20181112-{i}</Option>);
        }
        children.push(
            <Col span={8} key={3}>
                <FormItem label="卷数" className={styles["ant-form-item"]}>
                    {getFieldDecorator(`line`, {
                        rules: [{
                            message: '请输入卷数', type: 'array'
                        }]
                    })(
                        <Select
                            mode="multiple"
                            style={{ width: 300 }}
                        >
                            {opts}
                        </Select>,
                    )}
                </FormItem>
            </Col>
        );

        return children;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.searchWrap}>
                <Form
                    className={styles.form}
                >
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">Search</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
const WrappedAdvancedSearchForm = Form.create()(Component);
export default WrappedAdvancedSearchForm;