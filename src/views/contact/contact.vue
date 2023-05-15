<template>
  <div class="contact">
    <div class="conimg1"><img src="../../img/coimg1.jpg" /></div>
    <div class="contact-con con">
      <!-- <keep-alive>
        <component :is="change"></component>
      </keep-alive> -->
      <div class="content fx">
        <div class="quest-list">
          <div class="quest" v-for="item in quesList" :key="item.id">
            <div class="title">{{ item.title }}</div>
            <div class="single" v-if="item.type === 'singe'">
              <el-radio
                v-model="radio"
                :label="item2"
                border
                v-for="item2 in item.optionList"
                :key="item2"
                >{{ item2 }}</el-radio
              >
            </div>
            <div class="multiple" v-if="item.type === 'multiple'">
              <el-checkbox-group v-model="checkboxGroup1">
                <el-checkbox-button
                  v-for="item3 in item.optionList"
                  :label="item3"
                  :key="item3"
                  >{{ item3 }}</el-checkbox-button
                >
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import foot from "../../components/foot";
import { WOW } from "wowjs";
export default {
  data: function() {
    return {
      change: "contact",
      array1: ["联系我们", "提交需求"],
      indexSpan: "1",
      quesList: [],
      radio: ""
    };
  },
  components: {
    foot
  },
  methods: {
    getQuesList() {
      this.$axios.post("/api/questionnaire/all").then(res => {
        console.log("res", res);
        if (res.code === "200") {
          const ls = res.data.map(item => {
            return {
              ...item,
              optionList: item.optionList.split(",")
            };
          });
          this.quesList = res.data;
        }
      });
    }
  },
  mounted() {
    new WOW().init();
    this.getQuesList();
  }
};
</script>

<style lang="less">
.conimg1 {
  overflow: hidden;
  img {
    background-position: center;
  }
}
.contact-con {
  box-shadow: 0px 0px 18px 0px rgba(36, 111, 255, 0.25);
  border-radius: 20px;
  margin-top: -75px !important;
  background-color: #fff;
  margin-bottom: 60px;
  position: relative;
}

.contact-con .content {
  padding: 40px;
}
.title {
  text-align: left;
  font-size: 20px;
  font-weight: 600;
}
.single {
  padding: 10px;
  display: flex;
  font-size: 20px;
}
</style>
