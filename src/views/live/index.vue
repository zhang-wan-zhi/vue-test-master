<template>
  <div class="aboutcon">
    <div class="abimg1-live">专业技能和课题只是都能在这里找到</div>
    <div class="abcont1">
      <div class="abcont1-con wow animated fadeInUp">
        <div class="abcont1-2 clearfix">
          <div class="live-list" v-show="type === 'list'">
            <div
              class="live-item"
              v-for="item in articleList"
              :key="item.id"
              @click="handleItem(item.id)"
            >
              <div class="live-item-left">
                <div>课程名：{{ item.courseName }}</div>
                <div>类别：{{ item.type }}</div>
              </div>
              <div class="live-item-right">
                <div>创建人：{{ item.createUserName }}</div>
                <div>创建时间：{{ item.createTime }}</div>
              </div>
            </div>
          </div>
          <div class="course-details" v-show="type === 'details'">
            <div class="details-btn">
              <el-button type="primary" round @click="type = 'list'"
                >返回</el-button
              >
            </div>
            <div class="course-info">
              <div>课程名：{{ courseDetails.title || "" }}</div>
              <div>课程类型：{{ courseDetails.type || "" }}</div>
              <div>创建人名称：{{ courseDetails.userId || "" }}</div>
              <div>创建时间：{{ courseDetails.createTime || "" }}</div>
            </div>
            <div class="company-title">课程简介</div>
            <div class="company-title-line"></div>
            <div class="company-introduction">
              {{ courseDetails.introduction }}
            </div>
            <div class="company-title">课程小节</div>
            <div class="company-title-line"></div>
            <div class="summary-list">
              <el-link
                type="primary"
                v-for="item in courseSummaryList"
                :key="item.id"
                class="summary"
                @click="handleSummary(item)"
              >
                {{ `${item.serial}、${item.title}` }}
              </el-link>
            </div>
          </div>
          <div class="summary-details" v-if="type === 'summary'">
            <div class="details-btn">
              <el-button type="primary" round @click="type = 'details'"
                >返回</el-button
              >
            </div>
            <div class="company-title">
              {{ `第${courseSummaryDetails.serial}节` }}
            </div>
            <div class="company-title-line"></div>
            <div class="company-introduction">
              {{ courseSummaryDetails.title }}
            </div>
            <!-- 需要修改 -->
            <video
              :src="
                `http://172.16.65.245:80/media/${courseSummaryDetails.mediaPath}`
              "
              controls
              width="100%"
              height="100%"
              class="video"
            ></video>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import h2Title from "../../components/h2Title";
import foot from "../../components/foot";
export default {
  data: function() {
    return {
      list: "",
      description: "",
      logoimg: "",
      articleList: [],
      courseDetails: {},
      type: "list",
      courseSummaryList: [],
      courseSummaryDetails: {}
    };
  },
  components: {
    h2Title,
    foot
  },
  mounted() {
    if (this.$route.query.linkId) {
      this.type = "details";
      this.getCourseDetails(this.$route.query.linkId);
    }
    this.getArticleList();
  },
  methods: {
    handleItem(id) {
      this.getCourseDetails(id);
      this.getCourseSummarys(id);
    },
    async getArticleList() {
      const res = await this.$axios.post("/api/course/list", {});
      if (res.code === "200") {
        this.articleList = res.data.records;
      }
    },
    // 获取课程详情
    async getCourseDetails(id) {
      const res = await this.$axios.post("/api/course/info", { id });
      if (res.code === "200") {
        this.courseDetails = res.data;
        this.type = "details";
      }
    },
    // 获取课程小结
    async getCourseSummarys(courseId) {
      const res = await this.$axios.post("/api/media/list", { courseId });
      if (res.code === "200") {
        this.courseSummaryList = res.data.records;
        // this.type = "details";
      }
    },
    // 去小结详情
    handleSummary(item) {
      this.courseSummaryDetails = item;
      this.type = "summary";
    }
  }
};
</script>
<style lang="less">
.mb5 {
  margin-bottom: 5px;
}
.abimg1-live {
  overflow: hidden;
  height: 238px;
  line-height: 180px;
  background: #397af6;
  padding: 20px 200px;
  color: #fff;
  text-align: center;
  font-weight: 800;
  font-size: 30px;
}
.abcont1 {
  width: 1200px;
  border: solid 1px #cccccc;
  margin: -95px auto 0;
  position: relative;
  padding: 15px 25px;
  font-size: 24px;
  margin-bottom: 50px;
  .abcont1-con {
    border: solid 1px #cccccc;
    background-color: #fff;
    padding-top: 35px;
    .abcont1-2 {
      margin-top: 40px;
      padding: 50px 100px;
      .live-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 20px;
        box-shadow: 0px 0px 18px 0px rgba(36, 111, 255, 0.25);
        background-color: #fff;
        margin-bottom: 60px;
        padding: 40px;
        cursor: pointer;
        div {
          text-align: left;
        }
      }
      img {
        width: 200px;
        height: 200px;
        margin-top: 30px;
        margin-top: 60px;
        margin-left: -5px;
      }
      .course-info {
        margin-bottom: 50px;
        margin-top: 20px;
        div {
          text-align: left;
        }
      }
      .company-title {
        text-align: left;
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
        text-align: left;
        font-size: 20px;
        margin-bottom: 50px;
      }
      .summary-list {
        display: flex;
        flex-direction: column;
        align-items: start;
        text-align: left;
        .summary {
          font-size: 20px;
          margin-bottom: 20px;
        }
      }
      .summary-details {
        .video {
          border: 1px solid #000;
        }
      }
    }
  }
}
.details-btn {
  text-align: right;
}
</style>
