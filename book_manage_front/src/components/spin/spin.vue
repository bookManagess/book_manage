<template>
  <!-- 本组件负责加载时的动画处理 -->
  <!-- 可传参数 visible:是否可见(默认false),ballColor1(默认red),ballColor2(默认green):球颜色
   text(默认加载中...):描述文字 textColor(默认black):文字颜色 -->
  <html lang="en" :style="cssStyle">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div class="container">
        <div v-if="visible" class="loader"></div>
        <div v-if="visible" class="text">{{ text }}</div>
        <div class="rootContent">
          <slot></slot>
        </div>
      </div>
    </body>
  </html>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    ballColor1: {
      type: String,
      default: "red",
    },
    ballColor2: {
      type: String,
      default: "green",
    },
    text: {
      type: String,
      default: "加载中...",
    },
    textColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {};
  },
  computed: {
    cssStyle() {
      if (this.visible)
        return {
          "--ballColor1": this.ballColor1,
          "--ballColor2": this.ballColor2,
          "--opacity": 0.5,
          "--textColor": this.textColor,
        };
      else
        return {
          "--ballColor1": this.ballColor1,
          "--ballColor2": this.ballColor2,
          "--opacity": 1,
          "--textColor": this.textColor,
        };
    },
  },
};
</script>

<style scoped>
body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 50vh;
  z-index: 1;
}

.loader {
  position: absolute;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}

.loader::before,
.loader::after {
  content: "";
  position: absolute;
  background-color: red;
  border-radius: 50%;
  width: 24px;
  height: 24px;
}

.loader::before {
  background-color: var(--ballColor1);
  top: 0;
  animation: scale 1s infinite ease-in-out alternate;
}

.loader::after {
  background-color: var(--ballColor2);
  bottom: 0;
  animation: scale 1s 1s infinite ease-in-out alternate;
}
/*加载文字 */
.text {
  position: absolute;
  transform: translateY(60px);
  color: var(--textColor);
  font-size: 20px;
}
/* 待加载内容 */
.rootContent {
  position: relative;
  z-index: -1;
  opacity: var(--opacity);
}
@keyframes spin {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
