<template>
  <div class="contact">
    <div class="conimg1">
      <!-- <div class="conimg1-title">
        大学生职业生涯规划调查问卷
      </div> -->
      <div>
        亲爱的同学：您好！我们是社会调查员。针对当前日益严峻的就业形势，为了进一步了解职业生涯规划对大学生学习积极性的影响，以帮助大学生对自己进行科学的职业评估与自我评估，进一步明确自己的定位目标，更加清晰自己的职业生涯规划目标，为以后的就业做准备，特进行此调查。此次调查会严格对您的隐私进行保护。请您根据自身的实际情况和真实想法回答问题，在每个问题所给出的几个答案中选择一个或多个合适的答案。最后，再次衷心感谢您对本次调查的大力支持，谢谢合作!
      </div>
    </div>
    <div class="contact-con con">
      <!-- <keep-alive>
        <component :is="change"></component>
      </keep-alive> -->
      <div class="content">
        <div class="quest-list">
          <div class="quest" v-for="(item, index) in quesList" :key="item.id">
            <div class="title">
              <span :style="{ color: 'red' }">*</span>
              <span>{{ item.title }}</span>
              <span v-if="item.type === 'multiple'">（多选）</span>
            </div>
            <div class="single" v-if="item.type === 'single'">
              <el-radio
                v-model="answerList[index]"
                :label="item2"
                border
                v-for="item2 in item.optionList"
                :key="item2"
                >{{ item2 }}</el-radio
              >
            </div>
            <div class="multiple" v-if="item.type === 'multiple'">
              <el-checkbox-group
                class="multiple-group"
                v-model="answerList[index]"
              >
                <el-checkbox
                  class="multiple-item"
                  v-for="item3 in item.optionList"
                  :label="item3"
                  :key="item3"
                  border
                  >{{ item3 }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="answer-list">
          <div class="quest" v-for="item in showAnswerList" :key="item.serial">
            <div class="title">
              <span>{{ item.question }}</span>
            </div>
            <div class="answers">
              <div
                class="answer"
                v-for="(item2, index) in item.answer"
                :key="index"
              >
                {{ item2 }}
              </div>
            </div>
          </div>
        </div>
        <el-button type="primary" @click="sumbitAnswer" v-if="!hasAnswer"
          >提交</el-button
        >
        <el-button type="danger" @click="deleteAnswer" v-if="hasAnswer"
          >删除</el-button
        >
        <div v-if="hasAnswer">
          <el-descriptions
            v-for="(item, index) in guideList"
            :key="index"
            :column="3"
            style="margin-top: 20px"
            border
          >
            <el-descriptions-item label="指导人">{{
              item.userName
            }}</el-descriptions-item>
            <el-descriptions-item label="指导时间">{{
              item.createTime
            }}</el-descriptions-item>
            <el-descriptions-item label="连接类型"
              ><div v-if="item.type === '0'">文本</div>
              <router-link
                v-if="item.type === '1'"
                :to="{
                  path: '/article',
                  query: { linkId: item.linkId, type: 1 }
                }"
                >文章
              </router-link>
              <router-link
                v-if="item.type === '2'"
                :to="{ path: '/live', query: { linkId: item.linkId } }"
                >课程</router-link
              ><router-link
                v-if="item.type === '3'"
                :to="{
                  path: '/article',
                  query: { linkId: item.linkId, type: 0 }
                }"
                >游戏</router-link
              >
            </el-descriptions-item>
            <el-descriptions-item label="指导意见">{{
              item.content
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import foot from "../../components/foot";
import { getID, setAnswer } from "@/utils/auth";
export default {
  data: function() {
    return {
      change: "contact",
      array1: ["联系我们", "提交需求"],
      indexSpan: "1",
      quesList: [],
      answerList: [],
      radio: "",
      hasAnswer: false,
      showAnswerList: [],
      guideList: []
    };
  },
  components: {
    foot
  },
  methods: {
    async getQuesList() {
      // 检查用户档案是不是存在-1不存在需要填写，0存在但是没审核记录，1有审核记录

      const _this = this;
      const res = await this.$axios.post("/api/record/check", { id: getID() });
      if (res.code !== "200") return;
      // 没有填写过答案的情况
      if (res.data === -1) {
        console.log("resdata", res.data);
        const qslRes = await this.$axios.post("/api/record/all");
        if (qslRes.code !== "200") return;
        const ls = qslRes.data.map((item, index) => {
          // 答案容器设置
          if (item.type === "multiple") {
            _this.answerList[index] = [];
          }
          return {
            ...item,
            optionList: item.optionList.split(",")
          };
        });
        console.log("lssss", ls);
        _this.quesList = ls;
      } else {
        setAnswer(true);
        const dnRes = await this.$axios.post("/api/record/student-record", {
          id: getID()
        });
        if (dnRes.code !== "200") return;
        console.log("dnRes", dnRes);
        const salList = dnRes.data.answerAndQues.map(item => {
          return {
            ...item,
            answer: item.answer.split(",")
          };
        });
        console.log("salList", salList);
        this.showAnswerList = salList;
        this.guideList = dnRes.data.guideEntity;
        this.hasAnswer = true;
      }
    },
    // 提交答案
    async sumbitAnswer() {
      // 判断answerList是否有空值
      let i = 0;
      this.answerList.forEach((item, index) => {
        if (Array.isArray(item)) {
          if (item.length > 0) {
            i++;
          }
        } else {
          i++;
        }
        // return item !== "";
      });

      if (i < this.quesList.length) {
        this.$message({
          message: "有未选择答案的题目",
          type: "error"
        });
        return;
      }
      const strARR = this.answerList.map(item => {
        if (item instanceof Array) {
          return item.join(",");
        } else {
          return item;
        }
      });
      const str = strARR.join("@");
      const res = await this.$axios.post("/api/questionnaire/fill", {
        userId: getID(),
        answers: str
      });
      if (res.code === "200") {
        setAnswer(true);
        // 刷新页面
        this.$router.go(0);
      }
      console.log("res", res);
      // const answerStr = this.answerList
    },
    // 删除答案
    async deleteAnswer() {
      this.$confirm("是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/api/record/reset", {
            id: getID()
          });
          if (res.code === "200") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });

            setAnswer(false);
            this.$router.go(0);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    goToD(type) {
      console.log("11111", type);
      if (type === "1") {
        this.$router;
      }
    }
  },
  mounted() {
    this.getQuesList();
  }
};
</script>

<style lang="less">
.conimg1 {
  overflow: hidden;
  height: 238px;
  background: #397af6;
  padding: 50px 200px 0;
  color: #fff;
  text-align: left;
  .conimg1-title {
    text-align: center;
    font-size: 20px;
  }
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
  padding: 20px;
  display: flex;
  font-size: 20px;
}
.multiple {
  padding: 10px 20px 20px;
}
.multiple-group {
  white-space: pre-wrap;
  text-align: left;
}
.multiple-item {
  margin-top: 20px;
  margin-left: 0 !important;
}
.answers {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
.answer {
  font-size: 20px;
  margin-right: 60px;
}
</style>
