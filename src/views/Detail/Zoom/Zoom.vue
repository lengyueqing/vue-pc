<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="handleMove" ref="event"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: {
    imgUrl: String,
    bigImgUrl: String,
  },
  methods: {
    handleMove() {
      const { offsetX, offsetY } = event;
      /*  console.log(offsetX, offsetY); */
      const maskwidth = this.maskwidth;
      //计算当前Mask要指定left和top
      let left = 0;
      let top = 0;
      left = offsetX - maskwidth / 2;
      top = offsetY - maskwidth / 2;
      //left必须[0，maskwidth]
      if (left < 0) {
        left = 0;
      } else if (left > maskwidth) {
        left = maskwidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > maskwidth) {
        top = maskwidth;
      }
      const maskDiv = this.$refs.mask;
      maskDiv.style.left = left + "px";
      maskDiv.style.top = top + "px";

      const bigImg = this.$refs.bigImg;
      bigImg.style.left = -2 * left + "px";
      bigImg.style.top = -2 * top + "px";
    },
  },
  mounted() {
    this.maskwidth = this.$refs.event.clientWidth / 2;
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 17, 255, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>