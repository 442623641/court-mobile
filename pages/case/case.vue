<template>
	<view class="card">
		<view class="margin-bottom-10" v-html="item.text" />
		<van-steps active-color='#38f' :steps="item.steps" :active="item.state" class="block" />
	</view>
	<form @submit="save">

		<van-cell-group inset :border='false'>
			<van-cell title="当前状态" :border='eDays<=15'>
				<text :class='`state-current state-${item.step}`' />
			</van-cell>
			<template v-if="(eDays||eDays===0)&&eDays<=15">
				<van-cell title="是否需要退费" :border='needRefund'>
					<van-switch size='20px' :checked="needRefund" @change='needRefund=$event.detail' />
				</van-cell>
				<template v-if="needRefund">
					<van-field :value='item.refund' @change='item.refund=$event.detail' right-icon='bill-o' label='退费金额'
						type='digit' input-align="right" placeholder='输入退费金额' />
					<van-cell title="是否已退费" :border='!isRefund'>
						<van-switch size='20px' :checked="isRefund" @change='isRefund=$event.detail' />
					</van-cell>
					<van-cell title="退费剩余天数" :border='false' v-if="!isRefund">
						<template v-if='eDays<0'>已超期<text
								style="margin-inline: 6px;color: crimson;">{{eDays * -1}}</text>天
						</template>
						<template v-else>{{eDays}}天</template>
					</van-cell>
				</template>
			</template>
		</van-cell-group>

		<view style="padding:5px" />
		<van-cell-group inset :border='false'>
			<van-cell title="承办人" :value='item.processer' />
			<van-cell title="承办部门" :value='item.department' />
			<van-cell :border='false' title="书记员" :value="item.clerker" />
		</van-cell-group>
		<div class="login-button" v-if="(eDays||eDays===0)&&eDays<=15">
			<van-button form-type='submit' :disabled="item.refund<=0" :loading='loading' block type="info"
				loading-type="circular">保 存</van-button>
		</div>
	</form>
</template>

<script lang="ts">
	import api from '../../api';
	import { diffDays } from '../../utils/common';
	import { Tools } from '../../utils/tools';

	export default {
		data() {
			return {
				loading: false,
				needRefund: false,
				isRefund: false,
				item: <any>{},
				eDays: null
			};
		},
		onLoad({
			item
		}) {

			this.item = JSON.parse(item)
			console.log(this.item)

			// refund：0:不需要退费null:未编辑；>0:需要退费,退费金额；isrefund：是否已退费
			this.needRefund = !!this.item.refund;
			this.isRefund = !!this.item.isRefund;
			const split = `<span style='margin-inline:8px;transform:scale(.3);opacity:.15'>|</span>`
			this.item.text = `<div>${this.item.litigant?.replace(';', split).replace('；', split)}</div>`
			if (this.item.activeCourtDate) {
				this.eDays = 15 - diffDays(this.item.activeCourtDate);
			}
			this.item.refund = this.item.refund || undefined;
			console.log(this.eDays)
			wx.setNavigationBarTitle({ title: this.item.no });
		},
		methods: {
			save() {
				const p : any = { id: this.item.id }
				if (this.needRefund) {
					p.refund = Number(this.item.refund);
					p.isRefund = Number(this.isRefund);
				} else {
					p.refund = 0;
				}
				this.loading = true;
				api.setRefund(p).then((res) => {
					Tools.toast('保存成功', true);
					this.getOpenerEventChannel().emit('updateCase', res);
					setTimeout(() => wx.navigateBack({}), 2300)
				}).catch(({ toasted }) => toasted || Tools.toast(-1)).finally(() => this.loading = false)
			}
		}
	}
</script>

<style lang="scss">
	@import "/components/case-card/state.scss";

	.state-current {
		color: var(--background);
	}

	.van-cell__value {
		--cell-value-color: #666;
	}

	van-switch {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.van-field__icon-container .van-icon {
		&:before {
			content: '元';
			font-size: 14px;
		}
	}
</style>