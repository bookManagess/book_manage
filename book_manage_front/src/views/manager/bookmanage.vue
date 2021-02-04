<template>
    <div class="container">
    <div class="nav">
      <bookNav></bookNav>
    </div>
    <div class="contents">
     <div class="bookSearch" >
     <br/>
      <bookSearch></bookSearch>
      <br/>
    </div>
    <div class="content">
      <bookContent></bookContent>
    </div>
    </div>
  </div>
</template>

<script>
import bookNav from "../components/book/bookNav"
import bookSearch from "../components/book/bookSearch"
import bookContent from "../components/book/bookContent"
export default {
  name:'book',
  components:{bookNav,bookContent,bookSearch}
}
</script>

<style>
.containter{
  height: 100%;
  width: 100%;
}
.nav{
  float: left;
  height: 100%;
  width: 20%;
}
.contents{
  float: left;
  height: 100%;
  width: 70%;
}
</style>