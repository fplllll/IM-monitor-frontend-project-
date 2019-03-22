<template>
  <div id="appLoading">
    <img src="http://www.sucaijishi.com/uploadfile/2014/0524/20140524124233131.gif" alt="loading" >
  </div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .appLoading { width: 100%; height: 100%; }
  .appLoading img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    -webkit-transform: translateY(-50%)  translateX(-50%);
    transform: translateY(-50%)  translateX(-50%);
  }
</style>
