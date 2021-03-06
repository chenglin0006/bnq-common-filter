/*
 *联动
*/
import React, { Component } from 'react';
import { Select, Form } from 'antd';
import PropTypes from 'prop-types';

const Option = Select.Option;
const FormItem = Form.Item;

class Cascader extends Component {
    constructor(props) {
        super(props);

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(option, value){
        if(option.url && option.relativeFields && option.fetchFields) {
            //重置联动中影响到的文本域，通过relativeFields来获取影响到的fileds
            option.relativeFields.map((i) => {
                let o = {};
                o[i] = '';
                this.props.form.setFieldsValue(o);
            });

            //通过fetchFields获取Fetch参数，在onSelect事件中，this.props.form获取到的当前事件值不是最新的值，因此需要通过value获取
            let fieldsValue = this.props.form.getFieldsValue(option.fetchFields);
            option.fetchFields.map((i) => {
                if(i === option.id) {
                    fieldsValue[i] = value;
                }
            });

            fieldsValue && this.props.handleChange && this.props.handleChange(fieldsValue, option);
        }


    }

    render() {
        //由于在父组件components/new中传入了form,实现父子公用一个form
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                {this.props.data && this.props.data.map((option, i) => {
                    let decorator = {
                        rules: [{
                            required: option.isRequired, message: '不能为空！'
                        }],
                        initialValue: option.initialValue
                    }
                    return (
                        <FormItem label={option.name} key={i}>
                            {getFieldDecorator(`${option.id}`, decorator
                            )(
                                <Select onSelect={(value) => this._handleChange(option, value)}>
                                    {option.data && option.data.map((item, key) => <Option key={key} value={item.id}>{item.name || item.shopName}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                    )
                })}
            </div>
        );
    }
}


Cascader.propTypes = {
    form: PropTypes.object,
}

export default Cascader;

