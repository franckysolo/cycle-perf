<template>
  <div class="row mt-32">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <div class="panel panel-default">
    		<div class="panel-heading">
    			<h2 class="panel-title">
    				Nouvelle session
    			</h2>
    		</div>
    		<div class="panel-body">
          <form-session ref="formSession"></form-session>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <forecast></forecast>
    </div>
  </div>
</template>

<script>
import Forecast from '@/components/Forecast'
import FormSession from '@/components/FormSession'
export default {
  name: 'Register',
  components: {
    Forecast,
    FormSession
  }
}
</script>

<style lang="css">
</style>
