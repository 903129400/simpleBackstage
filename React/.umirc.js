// ref: https://umijs.org/config/
export default {
	treeShaking: true,
	routes: [
		{
			path: '/business',
			component: './business/_layout',
			routes: [
				{ path: '/business/list/index', component: './business/list/index' },
				{ path: '/business/create/index', component: './business/create/index' }
			]
		}
	],
	history: 'hash', // 默认是 browser
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		[
			'umi-plugin-react',
			{
				antd: true,
				dva: true,
				dynamicImport: false,
				title: 'demo',
				dll: false,
				routes: {
					exclude: [ /models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\// ]
				},
				fastClick: true
			}
		]
	]
};
