<template>
  <div id="app">

    <router-view />

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5em;

  margin: 0;
}

.btn {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  outline: none;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}

</style>
