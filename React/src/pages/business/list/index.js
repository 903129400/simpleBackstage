import React from 'react';
import { PageHeader } from 'antd';
import styles from './index.css';
import Table from '../parts/roomTable/index';
const routes = [
	{
		path: '',
		breadcrumbName: '工作台'
	},
	{
		path: '/business/list/index',
		breadcrumbName: '教室列表'
	}
];
class List extends React.Component {
	render() {
		return (
			<div>
				<PageHeader
					title="教室列表"
					breadcrumb={{ routes }}
					style={{ borderBottom: '1px solid #e8e8e8', marginBottom: '10px' }}
				/>

				<div style={{ width: '98%' }}>
					{' '}
					<Table />
				</div>
			</div>
		);
	}
}
export default List;
