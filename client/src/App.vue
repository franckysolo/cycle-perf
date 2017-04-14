<template>
  <div id="app" class="container-fluid">
    <div class="row">
  		<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
  			<p class="logo">
  				<img alt="Logo" src="./assets/img/picto-velo.png"  class="img-responsive">
  			</p>
  		</div>
  		<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
  			<h1 class="h4">Personnal Cycle Performance Session</h1>
  		</div>
  	</div>
    <tabs></tabs>
    <div class="footer text-right">
        <small>Made by franckysolo-productions &copy;</small>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
export default {
  name: 'app',
  components: {
    Tabs
  }
}
</script>

<style lang="less">
 @import 'assets/less/main.less';
</style>
