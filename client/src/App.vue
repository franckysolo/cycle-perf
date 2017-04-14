<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <span class="glyphicon glyphicon-time"></span>
            Personnal Cycle Performance Session
          </a>
        </div>
        <p class="navbar-text navbar-right mr-20">
          <a href="http://www.frankysolo-productions.com/" class="navbar-link">
            by franckysolo-production &copy;
          </a>
        </p>
      </div>
    </nav>
    <div class="container-fluid">
      <tabs></tabs>
      <div class="footer navbar navbar-default navbar-fixed-bottom">
          <p class="navbar-text navbar-right mr-20">
            <small>
              Cycle perf {{ version }} - Made by franckysolo-productions &copy;
            </small>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
export default {
  name: 'app',
  components: {
    Tabs
  },
  data () {
    return {
      version: '1.0.0'
    }
  }
}
</script>

<style lang="less">
 @import 'assets/less/main.less';
</style>
