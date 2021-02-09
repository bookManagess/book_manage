<template>
  <a-carousel arrows class="home_container" autoplay>
    <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px; zindex: 1">
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>

    <section class="switer-item">
      <div class="item-image">
        <img src="../../assets/image/home/science.jpg" alt="picture_1" />
      </div>
      <div class="swiper-text">
        <div class="swiper-title">科幻</div>
        <div class="swiper-content">
          你只知道我让你知道的,你只了解我想让你了解的,而那并不是我
        </div>
      </div>
    </section>

    <section class="switer-item">
      <div class="item-image">
        <img src="../../assets/image/home/art.jpg" alt="picture_2" />
      </div>
      <div class="swiper-text">
        <div class="swiper-title">文学</div>
        <div class="swiper-content">世事洞明皆学问,人情练达即文章</div>
      </div>
    </section>

    <section class="switer-item">
      <div class="item-image">
        <img src="../../assets/image/home/humanity.jpg" alt="picture_3" />
      </div>
      <div class="swiper-text">
        <div class="swiper-title">推理</div>
        <div class="swiper-content">真相只有一个</div>
      </div>
    </section>

    <section class="switer-item">
      <div class="item-image">
        <img src="../../assets/image/home/medicine.jpg" alt="picture_4" />
      </div>
      <div class="swiper-text">
        <div class="swiper-title">武侠</div>
        <div class="swiper-content">多情剑客无情剑，情到深处是无情</div>
      </div>
    </section>
  </a-carousel>
</template>
<script>
export default {
  name: "display",
};
</script>
<style scoped>
.switer-item {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.item-image {
  position: relative;
  z-index: -1;
}
.item-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-text {
  position: absolute;
  top: 0px;
  margin-left: 450px;
  color: rgb(255, 255, 255);
  background-color: transparent;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
}
.swiper-title {
  font-size: 2rem;
  font-family: "Bookman Old Style";
  font-weight: bolder;
  margin-bottom: 20px;
}
.swiper-content {
  font-size: 1.2rem;
}
.item-image::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
/* For demo */
.ant-carousel >>> .slick-slide {
  /* 轮播图大小 */
  text-align: center;
  width: 200px;
  height: 750px;
  line-height: 160px;
  /* background: #364d79; */
  /* 内容会被删减，还有scroll内容会被修改，但是加滚动框 */
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 50px;
  color: rgb(224, 44, 44);
  background-color: rgba(31, 45, 61, 0.11);
  /* opacity: 0.3; */
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  /* 透明度 */
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
