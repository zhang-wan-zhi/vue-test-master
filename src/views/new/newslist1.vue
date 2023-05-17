<template>
  <div class="newslist">
    <div class="newimg2">这里有丰富的文章和有趣的游戏</div>
    <div class="btsty">
      <div class="content fx">
        <div class="left_box wow animated fadeInLeft">
          <ul>
            <li
              v-for="(value, index) in newsdata"
              v-bind:class="{ active: index == indexSpan }"
              v-on:click="changeSpan(index)"
              :key="index"
            >
              <a>
                <span>{{ value.name }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="right_box wow animated fadeInRight">
          <div class="newinfs">
            <div class="live-list" v-show="!isDetails">
              <div
                v-for="item in newsinff"
                :key="item.id"
                @click="handleItem(item.id)"
              >
                <div v-if="indexSpan === 0" class="live-item">
                  <div class="live-item-left">
                    <div>游戏名：{{ item.name }}</div>
                    <div>类别：{{ item.type }}</div>
                  </div>
                  <div class="live-item-right">
                    <div>创建时间：{{ item.createTime }}</div>
                    <div>点击量：{{ item.clickNum }}</div>
                  </div>
                </div>
                <div v-else class="live-item">
                  <div class="live-item-left">
                    <div>文章标题：{{ item.title }}</div>
                    <div>文章类型：{{ item.type }}</div>
                  </div>
                  <div class="live-item-right">
                    <div>创建时间：{{ item.createTime }}</div>
                    <div>创建人姓名：{{ item.userName }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="details-main" v-show="isDetails">
              <div class="details-back">
                <el-button type="primary" round @click="isDetails = false"
                  >返回</el-button
                >
              </div>
              <div class="details-tile" v-if="indexSpan === 0">
                {{ detailsData.name }}
              </div>
              <div class="details-tile" v-else>
                {{ detailsData.title }}
              </div>
              <div class="details-info">
                <div v-if="indexSpan === 1">
                  {{ detailsData.userName }}
                </div>
                <div v-if="indexSpan === 0">
                  <el-link type="primary" :href="detailsData.url">{{
                    detailsData.url
                  }}</el-link>
                </div>
                <div v-else>
                  {{ detailsData.type }}
                </div>

                <div>{{ detailsData.createTime }}</div>
                <div
                  class="ql-editor"
                  v-html="detailsData.introduction || detailsData.content"
                ></div>
              </div>
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
export default {
  data: function() {
    return {
      newsinff: [],
      pagination: {
        page: 1,
        limit: 4,
        category_id: ""
      },
      listnum: "",
      isDetails: false,
      detailsData: {},
      url: "/api/game/list",
      newsdata: [
        { name: "游戏", link: "/newslist1" },
        { name: "生活文章", link: "/newslist2" }
      ],
      indexSpan: 0
    };
  },
  methods: {
    getNews: function() {
      const _this = this;
      this.$axios.post(this.url, {}).then(res => {
        console.log("res", res.data.records);
        this.newsinff = res.data.records;
      });
    },
    changeSpan(index) {
      this.indexSpan = index;
    },
    handleItem(id) {
      const url =
        this.indexSpan === 0 ? "/api/game/info" : "/api//article/info";
      this.$axios.post(url, { id }).then(res => {
        console.log("res", res.data.records);
        this.detailsData = res.data;
        this.isDetails = true;
      });
    },
    changesize: function(val) {
      this.pagination.page = val;
      this.getNews();
    },
    pushrouter: function(value) {
      const query = { id: value };
      this.$router.push({ path: "/newslist1/newinfos", query });
    }
  },
  mounted() {
    this.getNews();
    console.log("this.$route.query.linkId", this.$route.query.type);
    if (this.$route.query.linkId) {
      if (this.$route.query.type === "0") {
        this.indexSpan = 0;
      } else {
        this.indexSpan = 1;
      }
      this.isDetails = true;

      this.handleItem(this.$route.query.linkId);
    }
  },
  computed: {
    newlenght() {
      return this.newsinff.length > 0;
    }
  },
  components: { foot },
  watch: {
    indexSpan(o, n) {
      console.log("indexSpan", n);
      if (n === 0) {
        this.url = "/api/article/list";
        this.getNews();
      } else {
        this.url = "/api/game/list";
        this.getNews();
      }
      //   this.getNews();
    }
  }
};
</script>
<style lang="less" scoped>
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
.details-main {
  .details-tile {
    font-size: 30px;
    font-weight: 600;
  }
  .details-back {
    display: flex;
    justify-content: end;
  }
}
.newslist {
  background-color: #fff;
}
.newimg2 {
  overflow: hidden;
  height: 180px;
  line-height: 180px;
  background: #397af6;
  padding: 20px 200px;
  color: #fff;
  text-align: center;
  font-weight: 800;
  font-size: 30px;
}
.newslist .content {
  width: 1200px;
  margin: 0 auto;
  background-color: #f2f2f2;
}
.left_box {
  width: 285px;
  background-color: #fff;
  border-right: 15px solid #f2f2f2;
  padding-top: 20px;
  position: relative;
  li {
    line-height: 65px;
    margin-top: 5px;
    a {
      color: #666;
      display: block;
      height: inherit;
      padding: 11px 20px 11px 35px;
      position: relative;
      margin-right: -15px;
      cursor: pointer;
      span {
        box-shadow: -4px 4px 9px 0px rgba(153, 153, 153, 0.17);
        display: block;
        border-radius: 10px;
      }
    }
    a:hover {
      color: #1c9fd6;
    }
    a::before {
      position: absolute;
      left: 48px;
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      bottom: 25px;
    }
  }
  li.active a {
    background: url(../../img/newimg2.png) no-repeat;
  }
}
.left_box li:nth-child(1) ::before {
  background-image: linear-gradient(0deg, #3c82f4 0%, #aed5ff 100%);
}
.left_box li:nth-child(2) ::before {
  background-image: linear-gradient(0deg, #18b07f 0%, #83e9ba 100%);
}
.left_box li:nth-child(3) ::before {
  background-image: linear-gradient(0deg, #f77440 0%, #fec882 100%);
}
.left_box li:nth-child(4) ::before {
  background-image: linear-gradient(0deg, #fb6362 0%, #ffacac 100%);
}
.right_box {
  margin-left: 2px;
  min-height: 900px;
  background-color: #fff;
  width: 900px;
  padding: 35px;
}
.btsty {
  border-bottom: 18px solid #f2f2f2;
}
.el-pagination {
  margin-top: 40px;
}
.new_date {
  color: #fff;
  margin-right: 20px;
}
.new_day {
  font-size: 40px;
  font-weight: bold;
  background-color: #007fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
.new_year {
  background-color: #00a2ff;
  font-size: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  line-height: 1.6;
}
.new_img img {
  width: 225px;
  height: 140px;
}
.new_titile {
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 5px;
}
.new_text {
  text-indent: 20px;
  text-align: left;
  font-size: 12px;
  a {
    color: #666;
  }
}
.new_cont {
  margin-left: 20px;
  width: 490px;
  a {
    color: #000;
  }
  a:hover {
    color: #409eff;
  }
}
.new_a {
  text-align: left;
  margin-top: 10px;
  color: #666;
  font-size: 8px;
}
.new_see {
  text-align: right;
  margin-top: -16px;
  color: #ff6d26;
  font-size: 8px;
}
.new_see img {
  margin-right: 5px;
  vertical-align: -0.4ex;
}
.new_inf {
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 30px;
}
.new_inf::before {
  position: absolute;
  content: "";
  bottom: 0px;
  height: 2px;
  width: 740px;
  left: 60px;
  background-color: #ffffff;
  box-shadow: -4px 4px 9px 0px rgba(51, 51, 51, 0.22);
  border-radius: 50%;
}
.new_page li {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
