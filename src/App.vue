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

  min-width: 280px;
  min-height: 100vh;
  margin: 0;
  padding: 1em;

  background: rgb(254,192,226);
  background: linear-gradient(90deg, rgb(240, 162, 227) 0%, rgb(236, 167, 250) 35%, rgb(213, 183, 247) 100%);
}

.btn {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  outline: none;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}

</style>
