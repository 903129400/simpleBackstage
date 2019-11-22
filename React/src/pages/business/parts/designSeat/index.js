import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Input, InputNumber, Tooltip, Affix } from 'antd';
import styles from './index.css';
class IndeterminateCheckbox extends React.Component {
	componentDidMount() {
		if (this.props.indeterminate === true) {
			this._setIndeterminate(true);
		}
	}

	componentDidUpdate(previousProps) {
		if (previousProps.indeterminate !== this.props.indeterminate) {
			this._setIndeterminate(this.props.indeterminate);
		}
	}

	_setIndeterminate(indeterminate) {
		const node = ReactDOM.findDOMNode(this);
		node.indeterminate = indeterminate;
	}

	render() {
		const { indeterminate, type, ...props } = this.props;
		return <input type="checkbox" {...props} />;
	}
}
class Design extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			openHours: '',
			rowNum: 10,
			columnNum: 10,
			sum: 0,
			classArray: Array(10).fill(0).map(() => {
				return Array(10).fill(false);
			}),
			rows: Array(10).fill(false),
			columns: Array(10).fill(false),
			all: false,
			allSeat: 100
		};
	}
	changeAll = () => {
		if (this.state.all) {
			this.setState({
				classArray: Array(this.state.rowNum).fill(0).map(() => {
					return Array(this.state.columnNum).fill(false);
				}),
				sum: 0,
				all: false,
				rows: Array(this.state.rowNum).fill(false),
				columns: Array(this.state.columnNum).fill(false)
			});
		} else {
			this.setState({
				classArray: Array(this.state.rowNum).fill(0).map(() => {
					return Array(this.state.columnNum).fill(true);
				}),
				sum: this.state.allSeat,
				all: true,
				rows: Array(this.state.rowNum).fill(true),
				columns: Array(this.state.columnNum).fill(true)
			});
		}
		return;
	};

	changeBox = (x, y, type = 0) => {
		let arr = this.state.classArray;
		let num = this.state.sum;
		let all = false;
		let rows = this.state.rows;
		let columns = this.state.columns;
		let arrNum = arr[x][y];
		if (type === 1) arr[x][y] = true;
		else if (type === 2) arr[x][y] = false;
		else arr[x][y] = !arr[x][y];
		if (rows[x] && !arr[x][y]) rows[x] = false;
		else if (!rows[x] && arr[x][y])
			rows[x] = arr[x].every((item) => {
				return item;
			});

		if (columns[y] && !arr[x][y]) columns[y] = false;
		else if (!columns[y] && arr[x][y])
			columns[y] = arr
				.map((items) => {
					return items[y];
				})
				.every((item) => {
					return item;
				});
		if (arrNum && !this.state.classArray[x][y]) num = num - 1;
		else if (!arrNum && this.state.classArray[x][y]) num = num + 1;
		if (num === this.state.allSeat) all = true;

		this.setState({ classArray: arr, sum: num, all, rows, columns });
	};
	changeRow = (x) => {
		let type = 1;
		if (this.state.rows[x]) type = 2;
		let sum = this.state.sum;
		let num = 0;
		if (type === 2)
			this.state.classArray[x].forEach((item) => {
				if (item === true) num--;
			});
		else
			this.state.classArray[x].forEach((item) => {
				if (item === false) num++;
			});

		for (let y = 0; y < this.state.columnNum; y++) {
			this.changeBox(x, y, type);
		}
		this.setState({ sum: sum + num });
	};
	changeColumn = (y) => {
		let type = 1;
		if (this.state.columns[y]) type = 2;

		let sum = this.state.sum;
		let num = 0;
		if (type === 2)
			this.state.classArray
				.map((item) => {
					return item;
				})
				.forEach((item) => {
					if (item[y] === true) num--;
				});
		else
			this.state.classArray
				.map((item) => {
					return item;
				})
				.forEach((item) => {
					if (item[y] === false) num++;
				});

		for (let x = 0; x < this.state.rowNum; x++) {
			this.changeBox(x, y, type);
		}
		this.setState({ sum: sum + num });
	};
	render() {
		console.log(this.line);
		const Seat = () => {
			return (
				<div>
					<p style={{ display: 'flex' }}>
						<div
							style={{
								marginRight: 14,
								width: 25
							}}
						/>
						{this.state.classArray[0].map((items, i) => {
							return (
								<div
									style={{
										marginRight: 10,
										width: 24,
										textAlign: 'center'
									}}
								>
									{i + 1}
								</div>
							);
						})}
						<div
							style={{
								marginRight: 10,
								width: 40
							}}
						>
							选行
						</div>
					</p>
					{this.state.classArray.map((items, i) => {
						let a = items;

						return (
							<p style={{ display: 'flex' }}>
								<div style={{ marginRight: 5, width: 30 }}>{i + 1}</div>

								{a.map((item, j) => {
									return (
										<Tooltip title={'第' + (i + 1) + '行，第' + (j + 1) + '列'}>
											<label className={styles.checkBox}>
												<input
													type="checkbox"
													checked={item}
													onChange={() => this.changeBox(i, j)}
												/>
											</label>
										</Tooltip>
									);
								})}
								<label className={styles.checkBox}>
									<IndeterminateCheckbox
										type="checkbox"
										checked={this.state.rows[i]}
										indeterminate={
											this.state.classArray[i].some((item) => {
												return item;
											}) && !this.state.rows[i]
										}
										onChange={() => this.changeRow(i)}
									/>
								</label>
							</p>
						);
					})}
					<p style={{ display: 'flex' }}>
						<div style={{ marginRight: 5, width: 30 }}> 选列</div>

						{this.state.classArray[0].map((item, j) => {
							return (
								<label className={styles.checkBox}>
									<IndeterminateCheckbox
										type="checkbox"
										indeterminate={
											this.state.classArray
												.map((item) => {
													return item[j];
												})
												.some((item) => {
													return item;
												}) && !this.state.columns[j]
										}
										checked={this.state.columns[j]}
										onChange={() => this.changeColumn(j)}
									/>
								</label>
							);
						})}
						<label className={styles.checkBox}>
							<IndeterminateCheckbox
								type="checkbox"
								indeterminate={this.state.sum !== 0 && this.state.sum !== this.state.allSeat}
								checked={this.state.all}
								onChange={this.changeAll}
							/>
						</label>
					</p>
				</div>
			);
		};

		return (
			<div style={{ display: 'flex' }}>
				<Card
					title="座位设置"
					style={{
						minWidth: 800,
						minHeight: 600
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
							flexDirection: 'column'
						}}
					>
						{Seat()}
					</div>
				</Card>
				<Affix offsetTop={100}>
					<Card title="教室信息" style={{ width: 300, height: 400 }}>
						<p style={{ display: 'flex', alignItems: 'center' }}>
							教室名称：<Input placeholder="请填入内容" style={{ width: '160px', marginRight: '10px' }} />
						</p>
						<p style={{ display: 'flex', alignItems: 'center' }}>
							教室地址：<Input placeholder="请填入内容" style={{ width: '160px', marginRight: '10px' }} />
						</p>
						<p style={{ display: 'flex', alignItems: 'center' }}>
							开放时间：<Input placeholder="请填入内容" style={{ width: '160px', marginRight: '10px' }} />
						</p>
						<p style={{ display: 'flex', alignItems: 'center' }}>
							行数：<InputNumber
								min={1}
								max={30}
								defaultValue={this.state.rowNum}
								checked={this.state.rowNum}
								onChange={(e) => {
									this.setState({
										sum: 0,

										rows: Array(10).fill(false),
										columns: Array(10).fill(false),
										all: false,
										rowNum: e,
										allSeat: e * this.state.columnNum,
										classArray: Array(e).fill(false).map(() => {
											return Array(this.state.columnNum).fill(false);
										})
									});
								}}
							/>
						</p>
						<p style={{ display: 'flex', alignItems: 'center' }}>
							列数：<InputNumber
								min={1}
								max={30}
								defaultValue={this.state.columnNum}
								checked={this.state.columnNum}
								onChange={(e) => {
									this.setState({
										sum: 0,

										rows: Array(10).fill(false),
										columns: Array(10).fill(false),
										all: false,

										columnNum: e,
										allSeat: e * this.state.rowNum,
										classArray: Array(this.state.rowNum).fill(false).map(() => {
											return Array(e).fill(false);
										})
									});
								}}
							/>
						</p>
						<p style={{ display: 'flex', alignItems: 'center' }}>座位数量:{this.state.sum}</p>
					</Card>
				</Affix>
			</div>
		);
	}
}
export default Design;
