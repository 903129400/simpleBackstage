import React from 'react';
import { PageHeader, Card, Input, InputNumber } from 'antd';
import Design from '../parts/designSeat/index';
const routes = [
	{
		path: '/',
		breadcrumbName: '工作台'
	},
	{
		path: '/business/list/index',
		breadcrumbName: '教室列表'
	},
	{
		path: 'create',
		breadcrumbName: '创建教室'
	}
];
class List extends React.Component {
	render() {
		return (
			<div>
				<PageHeader
					title="创建教室"
					breadcrumb={{ routes }}
					style={{ borderBottom: '1px solid #e8e8e8', marginBottom: '10px' }}
				/>

				<Design />
			</div>
		);
	}
}
export default List;
