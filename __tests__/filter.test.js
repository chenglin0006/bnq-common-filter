import {shallow,mount} from 'enzyme';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from '../src/index'
import renderer from "react-test-renderer";
Enzyme.configure({ adapter: new Adapter() });

import {Form} from "antd/lib/index";
const WrappedAdvancedFilter = Form.create()(Filter);
const props = {
    // Jest 提供的mock 函数
    filterData:[{
        id: 'activityCode',
        name: '活动编码',
        inputChangeName:'titleChangeFun'
    },{
        id: 'searchParam',
        name: '查询条件',
    }],
    handleReset: jest.fn( (e) => {
        console.log('reset','=============')
    }),
    handleSearch:jest.fn( (e) => {
        console.log('search','=============')
    }),
    handleBack:jest.fn( (e) => {
        console.log('back','=============')
    }),
}

describe('filter', () => {
    it('simulates click events', () => {
        const component = renderer.create(
            <WrappedAdvancedFilter {...props}/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const wrapper = mount( <WrappedAdvancedFilter {...props}/>);
        wrapper.find('button.reset').simulate('click');

        wrapper.find('button.search').simulate('submit');

        wrapper.find('button.back').simulate('click');
    });
});
