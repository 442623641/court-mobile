<script>
	import api from '/api.js'
	export default {
		globalData: {
			baseUrl: 'http://101.35.156.42:8090/api/',
			userInfo: {},
			navbar: {},
			token:''
		},
		onLaunch: function() {
			console.log('App Launch')
			const that = this;
			// 获取系统信息
			const systemInfo = wx.getSystemInfoSync();
			// 胶囊按钮位置信息
			const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			// 导航栏高度 = 状态栏高度 + 44
			that.globalData.navbar = {
				height: `${systemInfo.statusBarHeight + 44}px`,
				paddingRight: `${systemInfo.screenWidth - menuButtonInfo.left + 7}px`,
				paddingTop: `${menuButtonInfo.top}px`,
				paddingBottom: `${menuButtonInfo.top - systemInfo.statusBarHeight}px`,
				paddingLeft: '16px'
			}
			// that.globalData.navbar.navbarHeight = systemInfo.statusBarHeight + 44;
			// that.globalData.navbar.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
			// that.globalData.navbar.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
			// that.globalData.navbar.menuHeight = menuButtonInfo.height;

			const userInfo = wx.getStorageSync('userInfo')
			if (userInfo && userInfo.openid) {
				that.globalData.userInfo=userInfo
				wx.switchTab({
					url: 'pages/index/index'
				})
			} else {
				api.login()
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/wxcomponents/vant/common/index.wxss";

	page {
		--background: #F8F8F8;
		--background-rgb: 248, 248, 248;
		background: var(--background);
		--skeleton-color: #f2f3f5 !important;
		--steps-background-color: var(--background);
	}

	.nav-bar {
		position: fixed;
		width: 100%;
		top: 0;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
.block{
	display: block;
}
	.card {
		background: #ffffff;
		padding: 16px;
		margin-inline: 16px;
		margin-top: 12px;
		margin-bottom: 12px;
		border-radius: 8px;
		transition: transform 500ms cubic-bezier(0.12, 0.72, 0.29, 1) 0s;
		font-size: 0.875rem;
		/* box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 16px; */
	}

	.note {
		color: #666;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
.van-step--horizontal {
		padding-bottom: 0 !important;

		.van-step__circle-container {
			background-color: var(--steps-background-color) !important;
			bottom: unset !important;
			top: 50%;
			transform: translate3d(0%, -50%, 0) !important;
		}

		.van-step__title {
			height: 50px;
			display: inline-flex !important;
			flex-direction: column;
			justify-content: space-between;
		}

		&:not(:last-child):not(:first-child) {
			.van-step__title {
				text-align: center;
			}

			.van-step__circle-container {
				transform: translate3d(-50%, -50%, 0) !important;

			}
		}
		.van-step__line {
			top: 50%;
			transform: translate3d(0, -50%, 0) !important;
		}
	}
	.list {
		&::before {
			content: '';
			height: 1px;
			display: block;
		}

		margin-bottom: 32px;
	}

	.margin-v-10 {
		margin: 10px 0;
	}

	.margin-v-12 {
		margin: 12px 0;
	}

	.margin-v-16 {
		margin: 16px 0;
	}

	.margin-top-8 {
		margin-top: 8px;
	}

	.margin-top-10 {
		margin-top: 10px;
	}

	.margin-top-12 {
		margin-top: 12px;
	}

	.margin-top-16 {
		margin-top: 16px;
	}

	.margin-bottom-8 {
		margin-bottom: 8px;
	}

	.margin-bottom-10 {
		margin-bottom: 10px;
	}

	.margin-bottom-12 {
		margin-bottom: 12px;
	}

	.margin-bottom-16 {
		margin-bottom: 16px;
	}

	.skeleton-animated,
	.loading {
		animation: shimmer 1.2s ease-in-out infinite;

		--tag-danger-color: var(--skeleton-color);
		--tag-success-color: var(--skeleton-color);
		--tag-warning-color: var(--skeleton-color);
		--tag-danger-color: var(--skeleton-color);
		--tag-primary-color: var(--skeleton-color);
		--tag-plain-background-color: var(--skeleton-color);
		--step-circle-color: var(--skeleton-color);
		--tag-text-color: transparent !important;

		.skeleton-item {
			border-radius: 5px;
			color: transparent !important;
			background-color: var(--skeleton-color);
		}

		@keyframes shimmer {
			50% {
				opacity: 0.6;
			}
		}
	}
</style>