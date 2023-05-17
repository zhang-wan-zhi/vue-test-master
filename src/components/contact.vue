<template>
  <div class="contact">
    <div class="contact-friend">
      <el-button type="primary" plain @click="showContact">聊天</el-button>
    </div>
    <div class="contact-dialog-main" v-show="dialogVisible">
      <el-aside width="200px">
        <div style="height: 60px">
          <div class="myinfo">
            <el-avatar :src="userInfo.avatar"></el-avatar>
            <span>{{ userInfo.name }}</span>
          </div>
        </div>
        <div style="height: 50px">
          <el-input v-model="keyword" placeholder="搜索好友">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-row style="height: 390px">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :show-header="false"
          >
            <el-table-column label="日期">
              <template slot-scope="scope">
                <div class="user-item" @click="handleFriendList(scope.row)">
                  <!-- <el-avatar :src="scope.row.imgPath"></el-avatar> -->
                  <div class="user-item-name">{{ scope.row.name }}</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>{{ selectFriend.name }}</el-header>
        <el-main id="scoolID">
          <div class="chat-list">
            <div
              class="chat-list-item"
              v-for="(item, index) in chatList"
              :key="index"
              :style="{
                alignSelf: item.type === 'other' ? '' : 'end',
                background: item.type === 'other' ? '#fff' : '#0ed13f'
              }"
            >
              {{ item.message }}
            </div>
          </div>
        </el-main>
        <el-footer>
          <el-input
            :disabled="this.selectFriend.name ? false : true"
            placeholder="请输入内容"
            v-model="input"
            @keyup.enter.native="send"
          >
          </el-input>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getID } from "@/utils/auth";
export default {
  name: "contact",
  data() {
    return {
      dialogVisible: false,
      input: "",
      keyword: "",
      userInfo: {},
      tableData: [],
      websocket: null,
      selectFriend: {},
      chatList: []
    };
  },
  methods: {
    showContact() {
      this.init();
      this.getFriendList();
      this.dialogVisible = !this.dialogVisible;
    },
    send() {
      /* 发送消息 */

      const model = {
        message: this.input,
        fromId: getID(),
        toId: this.selectFriend.id
      };
      console.log("model", model);
      this.websocket.send(JSON.stringify(model));
      this.chatList.push({
        message: this.input,
        type: "me"
      });
      this.$nextTick(() => {
        var ele = document.getElementById("scoolID");
        //判断元素是否出现了滚动条
        if (ele.scrollHeight > ele.clientHeight) {
          //设置滚动条到最底部
          ele.scrollTop = ele.scrollHeight;
        }
      });
      /* 清空输入框 */
      this.input = "";
    },
    init() {
      console.log(this.$store.state.user);
      const _this = this;
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        this.websocket = new WebSocket(
          // 需要修改
          "ws://172.16.65.245:80/websocket/" + getID()
        );
      } else {
        alert("当前浏览器 Not support websocket");
      }
      //连接成功建立回调方法
      this.websocket.onopen = function() {
        console.log("WebSocket连接成功");
      };
      this.websocket.onclose = function(e) {
        console.log(
          "websocket 断开",
          e.code + " " + e.reason + " " + e.wasClean
        );
      };
      this.websocket.onmessage = function(event) {
        console.log(
          "eventevent",
          JSON.parse(event.data),
          _this.selectFriend.id
        );
        const data = JSON.parse(event.data);
        data.type = "other";
        if (_this.selectFriend.id === data.fromId) {
          _this.chatList.push(data);
        }
      };
    },
    // 获取好友列表
    getFriendList() {
      this.$axios.post("/api/chat/admin-list").then(res => {
        console.log("res", res);
        this.tableData = res.data;
      });
    },
    // 选择好友
    handleFriendList(data) {
      this.selectFriend = data;
      // this.getFriendList();
      this.getChatHistoryList();
    },
    // 获取聊天历史
    getChatHistoryList() {
      const data = {
        fromId: getID(),
        toId: this.selectFriend.id
      };
      this.$axios.post("/api/chat/history", data).then(res => {
        const ls = res.data.map(item => {
          if (item.fromId === getID()) {
            return {
              ...item,
              type: "me",
              message: item.content
            };
          } else {
            return {
              ...item,
              type: "other",
              message: item.content
            };
          }
        });
        this.chatList = ls;
      });
    }
  },
  beforeDestroy() {
    this.websocket.close();
  }
};
</script>

<style lang="less">
.contact {
  .contact-friend {
    position: fixed;
    right: 50px;
    bottom: 100px;
  }
  .contact-dialog-main {
    display: flex;
    position: fixed;
    top: 2vh;
    left: 50%;
    // 居中
    transform: translate(-50%);
    width: 80%;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    height: calc(100vh - 50px);
    background-color: #d3dce6;
    color: #333;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    overflow: hidden;
    overflow-y: scroll;
    height: 200px;
  }
  .myinfo {
    text-align: left;
    vertical-align: middle;
    margin-top: 10px;
    margin-left: 10px;
  }
  .myinfo span {
    text-align: left;
    vertical-align: middle;
    margin-left: 10px;
  }
  .user-item {
    display: flex;
    align-items: center;
  }
  .user-item-name {
    margin-left: 10px;
  }
  .user-item {
    cursor: pointer;
  }
  .chat-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: start;
  }
  .chat-list-item {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    /* position: absolute; */
  }
}
</style>
