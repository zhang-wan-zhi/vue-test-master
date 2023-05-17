<template>
  <div class="aboutcon">
    <div class="newimg1">从这里试着开始沟通</div>
    <div class="abcont1">
      <div class="abcont1-con wow animated fadeInUp">
        <div class="abcont1-2 clearfix">
          <img @click="visible = true" src="../../img/chat.png" alt="" />
          <!-- <div class="abcont1-2img"></div> -->
        </div>
      </div>
    </div>
    <contact v-bind:visible="visible"></contact>
    <foot></foot>
  </div>
</template>
<script>
import contact from "../../components/contact.vue";
import h2Title from "../../components/h2Title";
import foot from "../../components/foot";
export default {
  data: function() {
    return {
      list: "",
      description: "",
      logoimg: "",
      visible: false
    };
  },
  components: {
    h2Title,
    foot,
    contact
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
      const res = await this.$axios.post("");
    }
  }
};
</script>
<style lang="less">
.mb5 {
  margin-bottom: 5px;
}
.abimg1 {
  overflow: hidden;
  img {
    background-position: center;
  }
}
.abcont1 {
  width: 1200px;
  border: solid 1px #cccccc;
  margin: -95px auto 0;
  position: relative;
  padding: 15px 25px;
  font-size: 24px;
  .abcont1-con {
    border: solid 1px #cccccc;
    background-color: #fff;
    padding-top: 35px;
    .abcont1-2 {
      margin-top: 40px;
      padding-bottom: 35px;
      cursor: pointer;
      .abcont1-2img {
        height: 318px;
        margin-left: 37px;
        margin-right: 42px;
        border-radius: 50px;
        background-color: #2172ca;
        border: 3px solid #dccd14;
      }
      img {
        width: 200px;
        height: 200px;
        margin-top: 30px;
        margin-top: 60px;
        margin-left: -5px;
      }
    }
  }
}
.abcont2l,
.abcont2c,
.abcont2r {
  text-align: center;
}
.abcont2 {
  padding-top: 30px !important;
}
.ab-tit1 {
  color: #666666;
  text-transform: uppercase;
  padding-bottom: 5px;
  font-size: 24px;
}
.ab-tit2 {
  font-weight: bold;
  font-size: 24px;
  position: relative;
  &::before,
  &::after {
    position: absolute;
    height: 1px;
    background-color: currentColor;
    content: "";
  }
}
.abcont1-3 {
  display: inline-block;
  width: 665px;
  line-height: 54px;
  padding-right: 35px;
  text-align: left;
}
.abp-sty1 {
  margin-top: 30px !important;
  margin-bottom: 30px !important;
  height: 2px;
  background-color: #cccccc;
  position: relative;
  &::before {
    position: absolute;
    width: 230px;
    left: calc(50% - 115px);
    height: 4px;
    background-color: #294cff;
    border-radius: 2px;
    content: "";
    top: -1px;
  }
}
.abicon1 {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 50px;
    height: 2px;
    background-color: #666666;
    left: calc(50% - 25px);
    top: 45px;
  }
}
.abp-sty2 {
  color: #999;
  font-size: 16px;
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 30px;
}
.abcont2-1 {
  display: flex;
  flex-direction: row;
  font-size: 16px;
  color: #fff;
  margin-top: 45px;
}
.abcont2c {
  width: 580px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.abcimg2,
.abcimg3,
.abcimg4,
.abcimg5,
.abcimg6 {
  border-radius: 40px;
}
.abcimg2,
.abcimg4,
.abcont2l,
.abcont2c {
  margin-right: 15px;
}
.abcimg2,
.abcimg3 {
  margin-bottom: 15px;
}
.abcimg1 {
  width: 356px;
  height: 296px;
  background-color: #ff7269;
  border-radius: 60px;
  .img {
    width: 84px;
    height: 82px;
    background-position: 0px 0px;
    margin-top: 85px;
    margin-bottom: 20px;
  }
}
.abcimg2 {
  width: 340px;
  height: 140px;
  background-color: #edc44e;
  .img {
    width: 70px;
    height: 50px;
    background-position: -90px 0px;
    margin-top: 28px;
    margin-bottom: 10px;
  }
}
.abcimg3 {
  width: 220px;
  height: 140px;
  background-color: #6ed5a0;
  .img {
    width: 50px;
    height: 50px;
    background-position: -159px 0px;
    margin-top: 28px;
    margin-bottom: 10px;
  }
}
.abcimg4 {
  width: 220px;
  height: 140px;
  background-color: #19adeb;
  .img {
    width: 50px;
    height: 48px;
    background-position: -210px 0px;
    margin-top: 28px;
    margin-bottom: 8px;
  }
}
.abcimg5 {
  width: 340px;
  height: 140px;
  background-color: #dc9f5c;
  .img {
    width: 46px;
    height: 50px;
    background-position: -272px 0px;
    margin-top: 28px;
    margin-bottom: 15px;
  }
}
.abcimg6 {
  width: 222px;
  height: 296px;
  background-color: #5cdcda;
  .img {
    width: 70px;
    height: 70px;
    display: inline-block;
    background-position: -328px 0px;
    margin-top: 90px;
    margin-bottom: 20px;
  }
}
.iconimg1 {
  display: inline-block;
  background-image: url(../../img/iconimg1.png);
  background-repeat: no-repeat;
}
.abcont3 {
  color: #fff;
  background: url(../../img/abimg2.jpg) no-repeat center;
  margin-top: 50px;
  padding-top: 50px;
}
.abcont2 .h2-tit1,
.abcont1 .h2-tit1 {
  color: #666;
}
.abcont3-1 {
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  padding-bottom: 60px;
  padding-top: 30px;
}
.fz48 {
  font-size: 48px;
}
.fz28 {
  font-size: 28px;
}
.psty2 {
  font-size: 16px;
}
.abcont4-con {
  img {
    margin-right: -25px;
    position: relative;
    z-index: 2;
  }
}
.abcont4-cont {
  border-radius: 40px;
  opacity: 0.9;
}
.abcont4-cont {
  background-image: linear-gradient(180deg, #fea29c 0%, #fe5d8c 100%);
  box-shadow: 1px 2px 9px 1px rgba(36, 125, 255, 0.34);
  font-size: 16px;
  .abcont4-cont1 {
    background-color: #ffffff;
    box-shadow: 1px 2px 9px 1px rgba(36, 125, 255, 0.34);
    border-radius: 40px;
    margin: 20px 40px;
    height: calc(100% - 40px);
    padding-left: 20px;
    padding-right: 20px;
  }
}
.ab-tit5 {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  padding-top: 35px;
  span {
    position: relative;
    padding-bottom: 15px;
    display: inline-block;
  }
  span::before {
    position: absolute;
    width: 60px;
    height: 1px;
    background-color: currentColor;
    margin-left: calc(50% - 30px);
    bottom: 0px;
    content: "";
  }
}
.ab-tit6 {
  padding-top: 20px;
  padding-bottom: 15px;
}
.abcont4-con2 {
  .abcont4-cont {
    background-image: linear-gradient(0deg, #04a8ff 0%, #27d6c7 100%);
    box-shadow: 1px 2px 9px 1px rgba(25, 173, 235, 0.34);
  }
  img {
    margin-left: -25px;
    margin-top: -50px;
  }
  .abcont4-cont {
    width: 300px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
.abcont4-con3 {
  .abcont4-cont {
    background-image: linear-gradient(180deg, #9edaff 0%, #8598fe 100%);
    box-shadow: 1px 2px 9px 1px rgba(134, 154, 254, 0.34);
  }
  img {
    margin-left: -25px;
  }
  .abcont4-cont {
    width: 300px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
.abcont4-con2 {
  margin-right: 40px;
}
.abcont4-con3 {
  margin-right: 20px;
}
.abcont4 {
  margin-top: 80px !important;
}
.abcont4-con {
  margin-top: 80px;
  margin-bottom: 80px;
  img {
    margin-top: -40px;
  }
}
.abcont5 {
  background: url(../../img/abimg6.jpg) no-repeat center;
  color: #fff;
  padding-top: 60px;
  padding-bottom: 55px;
  font-size: 16px;
  .h1Title {
    margin-bottom: 35px;
  }
}
.abcont5-con,
.abcont4-con3,
.abcont4-con2,
.abcont4-con {
  display: flex;
  flex-flow: row;
}
.abcont5-con2 {
  margin-left: 40px;
}
.abcont5-con1 {
  margin-right: 40px;
}
.abcont5-con {
  p {
    text-transform: uppercase;
    line-height: 1.8;
    text-align: left;
  }
}
.psty3 {
  padding-bottom: 15px;
}
.abcont5-con2 {
  padding-top: 30px;
}
.newimg1 {
  overflow: hidden;
  height: 278px;
  line-height: 180px;
  background: #397af6;
  padding: 20px 200px;
  color: #fff;
  text-align: center;
  font-weight: 800;
  font-size: 30px;
}
</style>
