<template>
  <div>
    <div class="footer">
      <div class="con">
        <div class="txt">
          <ul class="list"></ul>
          <p class="beian">
            VALVTON © 2023-生涯规划发展平台
          </p>
          <div class="rx">生涯规划发展平台 - 000 - 0000</div>
        </div>
        <div class="ewm">
          <!-- <img :src="wximg" alt="" /> -->
          <!-- <p>微信公众号</p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "foot",
  data() {
    return {
      wximg: "",
      beian_num: ""
    };
  },
  methods: {
    getwximg() {}
  },
  mounted() {
    this.getwximg();
  }
};
</script>
<style lang="less" scoped>
.footer {
  width: 100%;
  height: 200px;
  background-color: #2c2d35;
  display: flex;
  .txt {
    width: 730px;
    display: flex;
    flex-direction: column;
    color: #fff;
    text-align: left;
    font-size: 16px;
    margin-top: 40px;
    float: left;
    .beian {
      margin-top: 30px;
    }
    .rx {
      margin-top: 30px;
      color: #647aff;
    }
    .list {
      color: #fff;
      li {
        position: relative;
        &:after {
          content: "";
          width: 2px;
          height: 15px;
          background-color: #fff;
          position: absolute;
          top: 4px;
          right: -15px;
        }
        &:nth-child(5):after {
          width: 0px;
        }
        float: left;
        margin-right: 30px;
        a {
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  .ewm {
    margin-top: 40px;
    img {
      width: 65px;
    }
    p {
      font-size: 16px;
      color: #fff;
      margin-top: 15px;
    }
  }
}
</style>
