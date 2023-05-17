<template>
  <div>
    <!--banner -->
    <div class="case_bg"></div>
    <div class="con case_tabs">
      <ul class="list wow animated fadeInDown" v-show="!isShow">
        <div class="job-list">
          <div class="job-item" v-for="item in jobList" :key="item.id">
            <div class="job-item-left">
              <div class="job-item-left-name" @click="handleMajorName(item)">
                {{ item.name }}
              </div>
              <div class="job-item-left-job">薪资：{{ item.salary }}</div>
              <div>经验：{{ item.experience }}</div>
              <div>学位：{{ item.degree }}</div>
              <div>专业：{{ item.major }}</div>
            </div>
            <div class="job-item-right">
              <div class="job-item-right-name"></div>
              <div>公司名称：{{ item.companyName }}</div>
              <div>联系方式：{{ item.telephone }}</div>
              <div>地址：{{ item.address }}</div>
            </div>
          </div>
        </div>
        <div class="major-list">
          <div class="major-list-title">专业分类</div>
          <div
            class="major-list-item"
            v-for="item in majorList"
            :key="item"
            @click="handleMajor(item)"
            :style="{ color: selectMajor === item ? '#247dff' : '' }"
          >
            <div>{{ item }}</div>
            <div>></div>
          </div>
        </div>
      </ul>
      <div class="details wow animated fadeInDown" v-if="isShow">
        <div class="details-btn">
          <el-button type="primary" round @click="goBack">返回</el-button>
        </div>
        <div class="company-info">
          <div>公司名称：{{ companyDetail.companyInfo.name || "" }}</div>
          <div>公司地址：{{ companyDetail.companyInfo.address || "" }}</div>
          <div>联系方式：{{ companyDetail.companyInfo.telephone || "" }}</div>
        </div>
        <div class="company-title">公司简介</div>
        <div class="company-title-line"></div>
        <div class="company-introduction">
          {{ companyDetail.companyInfo.introduction }}
        </div>
        <div class="company-title">岗位要求</div>
        <div class="company-title-line"></div>
        <div class="company-introduction">
          {{ companyDetail.requirement }}
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import foot from "../../components/foot";
export default {
  data() {
    return {
      shows: 1,
      jobList: [],
      majorList: [
        "全部",
        "计算机科学与技术",
        "软件工程",
        "工商管理",
        "会计学",
        "英语",
        "机械设计制造及其自动化",
        "自动化",
        "通信工程",
        "电子信息工程",
        "财务管理"
      ],
      selectMajor: "全部",
      isShow: false,
      companyDetail: {}
    };
  },
  components: {
    foot
  },
  methods: {
    // 获取岗位列表
    async getJobList() {
      const res = await this.$axios.post("/api/job/list", {
        major: this.selectMajor === "全部" ? "" : this.selectMajor
      });
      if (res.code === "200") {
        this.jobList = res.data.records;
        console.log(this.jobList);
      }
    },
    handleMajor(item) {
      this.selectMajor = item;

      this.getJobList();
    },
    // 点击查看岗位详情
    async handleMajorName(item) {
      console.log(item);
      const res = await this.$axios.post("/api/job/info", { id: item.id });
      if (res.code === "200") {
        this.companyDetail = res.data;
        this.isShow = true;
      }
    },
    // 放回列表
    goBack() {
      this.isShow = false;
    }
  },
  mounted() {
    this.getJobList();
  }
};
</script>
<style lang="less" scoped>
.icon {
  font-size: 36px;
}
a {
  color: #333;
}
.case_bg {
  height: 238px;
  margin: 0px auto;
  background-image: url(../../img/bg9.png);
  background-repeat: no-repeat;
  background-position: center;
}
.router_box {
  min-height: 1200px;
}
.case_tabs {
  .list {
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 15px 50px rgba(66, 159, 255, 0.1);
    padding: 20px 100px;
    padding-bottom: 40px;
    .job-list {
      width: 60%;
      .job-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        text-align: left;
        font-size: 20px;
        // color: #ccc;
        div {
          margin-bottom: 20px;
        }
        .job-item-left {
          width: 50%;
        }
        .job-item-right {
          width: 50%;
        }
        .job-item-left-name {
          color: #247dff;
          font-size: 30px;
          font-weight: 600;
          cursor: pointer;
        }
        .job-item-right-name {
          height: 45px;
        }
        .job-item-left-job {
          color: #f10a0a;
        }
      }
    }
    .major-list {
      width: 30%;
      .major-list-title {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 30px;
      }
      .major-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        margin-bottom: 10px;
      }
    }
  }
  .details {
    text-align: left;
    box-shadow: 0px 15px 50px rgba(66, 159, 255, 0.1);
    padding: 20px 100px;
    padding-bottom: 40px;
    .company-info {
      font-size: 20px;
      margin-bottom: 50px;
      margin-top: 20px;
    }
    .details-btn {
      text-align: right;
    }
  }
  .company-title {
    font-size: 25px;
    font-weight: 600;
  }
  .company-title-line {
    width: 70px;
    height: 5px;
    background-color: #247dff;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  .company-introduction {
    font-size: 20px;
    margin-bottom: 50px;
  }
}
</style>
