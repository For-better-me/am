<template>
	<view class="order_value">
		<view class="value_con">
			<view class="flex pad-tb-30">
				<image src="../../static/img/avatar.jpg" mode="aspectFill" class="poster"></image>
				<view class="f-28 color-1 mar-l-20 mar-t-10">天津SAI美容美体会所-女士全身精油香薰SPA</view>
			</view>
			<view class="pad-tb-30 border_top">
				<view class="flex-lr flex-center pad-lr-60">
					<view class="flex-center">
						<image src="../../static/img/value_good.png" class="icon_value"></image>
						<view class="mar-l-10 f-26 color-9">好评</view>
					</view>
					<view class="flex-center">
						<image src="../../static/img/value_m.png" class="icon_value"></image>
						<view class="mar-l-10 f-26 color-9">好评</view>
					</view>
					<view class="flex-center">
						<image src="../../static/img/value_m2.png" class="icon_value"></image>
						<view class="mar-l-10 f-26 color-9">好评</view>
					</view>
				</view>
			</view>
			<view class="">
				<textarea value="" placeholder="请您对本次服务做出评价" class="textarea" />
			</view>
		</view>
		<view class="value_shop pad-30 bg-fff mar-t-15">
			<view class="flex-center">
				<view class="line"></view>
				<view class="f-30 color-3 mar-l-20">店铺评分</view>
			</view>
			<view class="flex-center mar-t-30">
				<text class="f-28 color-3 mar-r-30">真实描述</text>
				<view class="flex-center">
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
				</view>
			</view>
			<view class="flex-center mar-t-30">
				<text class="f-28 color-3 mar-r-30">服务技能</text>
				<view class="flex-center">
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
				</view>
			</view>
			<view class="flex-center mar-t-30">
				<text class="f-28 color-3 mar-r-30">服务态度</text>
				<view class="flex-center">
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
					<image src="../../static/img/icon_star.png" class="icon_star"></image>
				</view>
			</view>
			
		</view>
		<view class="mar-t-15 pad-30 bg-fff">
			<view class="flex-center row_end">
				<image src="../../static/img/icon_checked.png" class="icon_check"></image>
				<view class="f-26 color-3 mar-l-10">匿名评价</view>
			</view>
			<button type="default" class="btn_style mar-t-120">提交评价</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.mar-t-120{
		margin-top: 120upx;
	}
	.line{
		width: 4upx;
		height: 29upx;
		background: #FF4343;
	}
	.value_shop{
		.icon_star{
			display: block;
			width: 35upx;
			height: 33upx;
			margin-left: 30upx;
		}
	}
	.row_end{
		justify-content: flex-end;
	}
	.value_con{
		padding: 0  40upx 30upx;
		background: #fff;
		.poster{
			width: 138upx;
			height: 138upx;
			border-radius: 4upx;
			flex-shrink: 0;
		}
		.icon_value{
			width: 34upx;
			height: 34upx;
		}
		.textarea{
			width:100%;
			height: 250upx;
			background: #F8F8F8;
			border-radius: 10upx;
			padding: 25upx 30upx;
			box-sizing: border-box;
			font-size: 24upx;
		}
	}
</style>
