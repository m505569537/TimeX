<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,body { margin: 0; padding: 0; height: 100%; }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  resize: both
}
ul {
  padding: 0;
  margin:0;
}
li {
  list-style: none
}

.clearfix::after {
  content: '';
  display: block;
  clear: both
}
</style>
