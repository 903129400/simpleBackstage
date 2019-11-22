import React from 'react';
import { Table, Button, Dropdown, Menu, Input, Select } from 'antd';
import styles from './index.css';
import router from 'umi/router';
const { Option } = Select;
class Operation extends React.Component {
	render() {
		const menu = (
			<Menu>
				<Menu.Item>删除</Menu.Item>
			</Menu>
		);

		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>
					教室名称：
					<Input placeholder="关键字搜索" style={{ width: '200px', marginRight: '10px' }} />
					教室地点：
					<Input placeholder="关键字搜索" style={{ width: '200px', marginRight: '10px' }} />
					使用情况：
					<Select defaultValue="lucy" style={{ width: '100px', marginRight: '10px' }} onChange={() => {}}>
						<Option value="jack">全部</Option>
						<Option value="lucy">有空位</Option>
						<Option value="Yiminghe">无空位</Option>
					</Select>
					<Button icon="search" type="primary" ghost>
						查询
					</Button>
				</span>
				<span style={{ marginTop: '10px' }}>
					<Button
						type="primary"
						ghost
						style={{ marginRight: '10px' }}
						onClick={() => {
							router.push({
								pathname: '/business/create/index'
							});
						}}
					>
						新增
					</Button>

					<Dropdown overlay={menu}>
						<Button>批量操作</Button>
					</Dropdown>
				</span>
			</div>
		);
	}
}
class List extends React.Component {
	render() {
		const columns = [
			{
				title: '教室名称',
				dataIndex: 'name',
				render: (text) => text
			},
			{
				title: '教室地点',
				className: 'column-money',
				dataIndex: 'place'
			},
			{
				title: '开放时间',

				render: (record) => record.startTime + '~' + record.endTime
			},
			{
				title: '使用数量',

				render: (record) => record.occupy + '/' + record.seat
			},
			{
				title: '操作',
				key: 'action',
				render: () => (
					<span>
						<Button type="primary" ghost style={{ marginRight: '10px' }}>
							修改
						</Button>
						<Button type="primary" ghost style={{ marginRight: '10px' }}>
							查看
						</Button>
						<Button type="danger" ghost>
							删除
						</Button>
					</span>
				)
			}
		];
		const data = [
			{
				key: '1',
				name: '自习室1',
				place: '人文楼-5302',
				startTime: '8:00',
				endTime: '18:00',
				occupy: 10,
				seat: 20
			},
			{
				key: '2',
				name: '自习室2',
				place: '人文楼-5303',
				startTime: '9:00',
				endTime: '17:00',
				occupy: 10,
				seat: 30
			},
			{
				key: '3',
				name: '自习室3',
				place: '人文楼-5304',
				startTime: '9:00',
				endTime: '17:00',
				occupy: 8,
				seat: 25
			}
		];
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			},
			getCheckboxProps: (record) => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name
			})
		};
		return (
			<div>
				<Table
					rowSelection={rowSelection}
					columns={columns}
					dataSource={data}
					bordered
					title={() => {
						return <Operation />;
					}}
					footer={() => ''}
				/>
			</div>
		);
	}
}
export default List;
