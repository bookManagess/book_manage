<template>
  <div>
    <div class="content_1">
      <img src="../../assets/image/home/sword1.png" alt="sss" class="content_son" />
    </div>
    <div class="content_2">
      <img src="../../assets/image/home/medicine.jpg" alt="sss" class="content_son" />
    </div>
  </div>
</template>

<style scoped>
.content_1 {
  position: relative;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.content_2 {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.content_son {
}
</style>
