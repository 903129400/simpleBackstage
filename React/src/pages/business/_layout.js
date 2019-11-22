import styles from './_layout.css';
import { PageHeader, Button, Menu, Icon } from 'antd';
import React from 'react';
const { SubMenu } = Menu;
class Layout extends React.Component {
	rootSubmenuKeys = [ 'sub1', 'sub2', 'sub4' ];
	state = {
		openKeys: [ 'sub1' ]
	};

	onOpenChange = (openKeys) => {
		const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			this.setState({
				openKeys: latestOpenKey ? [ latestOpenKey ] : []
			});
		}
	};
	render() {
		return (
			<div
				style={{
					backgroundColor: '#F5F5F5'
				}}
			>
				<header>
					<PageHeader
						ghost={false}
						onBack={() => window.history.back()}
						title="管理后台"
						subTitle="用于各种小应用后台管理"
						extra={[
							<Button key="1" type="primary">
								登出
							</Button>
						]}
					/>
				</header>
				<main className={styles.main}>
					<aside className={styles.aside}>
						<Menu
							onClick={this.handleClick}
							style={{ width: 256 }}
							defaultSelectedKeys={[ '1' ]}
							defaultOpenKeys={[ 'sub1' ]}
							mode="inline"
						>
							<SubMenu
								key="sub1"
								title={
									<span>
										<Icon type="mail" />
										<span>图书馆占座程序</span>
									</span>
								}
							>
								<Menu.Item key="1">教室列表</Menu.Item>
								<Menu.Item key="2">数据展示</Menu.Item>
							</SubMenu>
							<SubMenu
								key="sub2"
								title={
									<span>
										<Icon type="appstore" />
										<span>敬请期待</span>
									</span>
								}
							>
								<Menu.Item key="3">Option 3</Menu.Item>
								<Menu.Item key="4">Option 4</Menu.Item>
							</SubMenu>
						</Menu>
					</aside>

					<section className={styles.section}>{this.props.children}</section>
				</main>
				<footer className={styles.footer}>footer</footer>
			</div>
		);
	}
}

export default Layout;
