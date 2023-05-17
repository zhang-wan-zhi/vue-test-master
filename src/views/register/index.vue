<template>
  <div>
    <div class="container"></div>
    <div class="login-block">
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="register-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="name">
          <el-input
            ref="name"
            v-model="registerForm.name"
            placeholder="姓名"
            name="name"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="account">
          <el-input
            ref="account"
            v-model="registerForm.account"
            placeholder="学号"
            name="account"
            type="text"
            tabindex="2"
          />
        </el-form-item>

        <el-form-item prop="sex">
          <el-radio v-model="registerForm.sex" label="hypk01" border
            >男</el-radio
          >
          <el-radio v-model="registerForm.sex" label="hypk02" border
            >女</el-radio
          >
        </el-form-item>

        <el-form-item prop="age">
          <el-input
            ref="age"
            v-model="registerForm.age"
            placeholder="年龄"
            name="age"
            type="number"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="telephone">
          <el-input
            ref="telephone"
            v-model="registerForm.telephone"
            placeholder="联系方式"
            name="telephone"
            type="text"
            tabindex="4"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="major">
          <el-input
            ref="major"
            v-model="registerForm.major"
            placeholder="专业"
            name="major"
            type="text"
            tabindex="5"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            placeholder="密码"
            name="password"
            tabindex="6"
            auto-complete="on"
            @keyup.enter.native="handleregister"
          />
        </el-form-item>
        <el-form-item prop="repetition">
          <el-input
            :key="passwordType"
            ref="repetition"
            v-model="registerForm.repetition"
            placeholder="确认密码"
            name="repetition"
            tabindex="7"
            auto-complete="on"
            @keyup.enter.native="handleregister"
          />
        </el-form-item>

        <el-button
          type="primary"
          style="width: 100%; margin-left: 0px; margin-bottom: 25px"
          @click.native.prevent="goBack"
          >返回</el-button
        >

        <el-button
          type="primary"
          style="width: 100%; margin-left: 0px"
          @click.native.prevent="handleregister"
          :loading="loading"
          >注册</el-button
        >

        <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import jparticle from "../../js/jparticle.js";
import { register } from "@/api/user.js";
export default {
  name: "login",
  data() {
    return {
      registerForm: {
        name: "",
        password: "",
        repetition: "",
        account: "",
        sex: "",
        age: null,
        telephone: "",
        major: ""
      },
      registerRules: {
        name: [{ required: true, trigger: "blur", message: "姓名不能为空" }],
        password: [{ required: true, trigger: "blur" }],
        repetition: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            trigger: "blur",
            message: "学号不能为空"
          }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      message: ""
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    handleregister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          register(this.registerForm)
            .then(res => {
              console.log(res);
              this.$message({
                message: "注册成功",
                type: "success",
                duration: 1000
              });
              this.$router.push({ path: "/login" });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBack() {
      this.$router.push({ path: "/login" });
    },
    // 头像demo
    onload: function() {
      $(document).ready(function() {
        $(".pwd-eye").hide();
        $(".pwd-eye").click(function() {
          var flag = $(this).attr("data-flag");
          $(this).css(
            "background-image",
            'url("img/password-' + flag + '.png")'
          );
          $(this).attr("data-flag", flag == "show" ? "hide" : "show");
          $('input[name="password"]').attr(
            "type",
            flag == "show" ? "password" : "text"
          );
          if (flag != "show" && $('input[name="password"]').val() != "") {
            $(".left-arm").addClass("show");
            $(".mouth").addClass("show");
            $(".right-arm").addClass("show");
          } else {
            $(".left-arm").removeClass("show");
            $(".mouth").removeClass("show");
            $(".right-arm").removeClass("show");
          }
        });
        $('input[name="username"]').focus(function() {
          $(".login-animate").addClass("username-animate");
          $(".login-animate").removeClass("password-animate");
          var length = $(this).val().length;
          getposition(length);
        });
        $('input[name="username"]').bind("input", function() {
          var length = $(this).val().length;
          getposition(length);
        });
        function getposition(length) {
          var face = parseFloat((1.5 / 60) * length);
          var nose = parseFloat((1 / 90) * length);
          var left_eye = parseFloat((1.5 / 60) * length);
          var right_eye = parseFloat((2 / 60) * length);
          var left_ear = parseFloat((1 / 36) * length);
          var right_ear = parseFloat((1 / 36) * length);
          $(".face").css("left", 0.4 + (face > 1.5 ? 1.5 : face) + "em");
          $(".nose").css("left", 2.5 + (nose > 1 ? 1 : nose) + "em");
          $(".left-eye").css(
            "left",
            1.2 + (left_eye > 1.5 ? 1.5 : left_eye) + "em"
          );
          $(".right-eye").css(
            "left",
            4.5 + (right_eye > 2 ? 2 : right_eye) + "em"
          );
          $(".left-ear").css("left", 1 - (left_ear > 1 ? 1 : left_ear) + "em");
          $(".right-ear").css(
            "left",
            4.5 - (right_ear > 1 ? 1 : right_ear) + "em"
          );
          if (length >= 6) {
            $(".left-eye").addClass("doe");
            $(".right-eye").addClass("doe");
            $(".mouth").addClass("doe");
          } else {
            $(".left-eye").removeClass("doe");
            $(".right-eye").removeClass("doe");
            $(".mouth").removeClass("doe");
          }
        }
        $('input[name="username"]').blur(function() {
          $(".login-animate").removeClass("username-animate");
          $(".login-animate").removeClass("password-animate");
          $(".face").attr("style", "");
          $(".nose").attr("style", "");
          $(".left-eye").attr("style", "");
          $(".right-eye").attr("style", "");
          $(".left-ear").attr("style", "");
          $(".right-ear").attr("style", "");
        });
        $('input[name="password"]').focus(function() {
          $(".pwd-eye").show();
          $(".login-animate").removeClass("username-animate");
          $(".login-animate").addClass("password-animate");
        });
        $('input[name="password"]').blur(function() {
          $(".pwd-eye").hide();
          $(".login-animate").removeClass("username-animate");
          $(".login-animate").removeClass("password-animate");
        });
      });
    },
    // 用户提交
    handleregister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          register(this.registerForm)
            .then(res => {
              console.log(res);
              this.$message({
                message: "注册成功",
                type: "success",
                duration: 1000
              });
              this.$router.push({ path: "/login" });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 弹框提示
    open2() {
      this.$message({
        message: "登录成功",
        type: "success"
      });
    },
    open3() {
      this.$message({
        message: this.message,
        type: "warning"
      });
    },
    // canva背景
    canvasbackground: function() {
      var windowheight = $(window).height();
      $(".container").height(windowheight);
      $(".container").jParticle({
        background: "rgba(0,0,0,.6)", //背景颜色
        color: "#999", //粒子和连线的颜色
        particlesNumber: 100, //粒子数量
        //disableLinks:true,//禁止粒子间连线
        //disableMouse:true,//禁止粒子间连线(鼠标)
        particle: {
          minSize: 1, //最小粒子
          maxSize: 3, //最大粒子
          speed: 30 //粒子的动画速度
        }
      });
    }
  },
  created: function() {},
  mounted() {
    this.onload();
    this.canvasbackground();
  }
};
</script>
<style lang="" scoped>
body {
  background: #00c0ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-input {
  width: 200px;
}
.el-input__inner {
  border: 1px solid #eee;
}
.login-block {
  position: absolute;
  top: 30%;
  left: 50%;
  margin-left: -150px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  background: #3dceba;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
.login-animate,
.password-animate {
  width: 10em;
  height: 10em;
  border-radius: 5em;
  background: #cefefb;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
}
.login-animate div,
.password-animate div {
  transition: all 0.5s;
  -o-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
.login-animate .body {
  background-image: url(../../img/body.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 7.05em;
  height: 6.56em;
  position: absolute;
  bottom: -4em;
  left: 1.6em;
  z-index: 0;
}
.login-animate .head {
  position: relative;
  background-image: url(../../img/face.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 7.5em;
  height: 7.69em;
  position: absolute;
  bottom: 1em;
  left: calc(50% - 3.75em);
  z-index: 1;
}
.login-animate .left-ear {
  background-image: url(../../img/left-ear.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 5em;
  height: 2.3867em;
  position: absolute;
  bottom: 5.8em;
  left: 1em;
}
.login-animate .right-ear {
  background-image: url(../../img/right-ear.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 5em;
  height: 2.3867em;
  position: absolute;
  bottom: 5.8em;
  left: 4em;
}
.login-animate .left-eye {
  background-image: url(../../img/eye.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 0.75em;
  height: 1.056em;
  position: absolute;
  bottom: 4.1em;
  z-index: 2;
  left: 1.6em;
}
.login-animate .right-eye {
  background-image: url(../../img/eye.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 0.75em;
  height: 1.056em;
  position: absolute;
  bottom: 4.1em;
  z-index: 2;
  left: 5.2em;
}
.login-animate .face {
  background-image: url(../../img/nose.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 5.9em;
  height: 5.75em;
  top: 1.6em;
  left: 0.8em;
  position: absolute;
}
.login-animate .nose {
  background-image: url(../../img/muzzle.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 1em;
  height: 0.4em;
  position: absolute;
  bottom: 2.6em;
  left: 2.5em;
}
.login-animate .mouth {
  background-image: url(../../img/mouth-smile.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 2.95em;
  height: 1em;
  position: absolute;
  bottom: 1em;
  left: 1.55em;
}
.login-animate .left-arm {
  background-image: url(../../img/left-arm.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 3em;
  height: 7em;
  position: absolute;
  bottom: -7.5em;
  left: 1em;
  z-index: 2;
  transition: bottom 0.5s;
}
.login-animate .right-arm {
  background-image: url(../../img/right-arm.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 3em;
  height: 7em;
  position: absolute;
  bottom: -7.5em;
  left: 6em;
  z-index: 2;
  transition: bottom 0.5s;
}
.password-animate .mouth.show {
  width: 1em;
  left: calc(50% - 0.5em);
  background-image: url(../../img/mouth-circle.png);
}
.password-animate .left-arm.show,
.password-animate .right-arm.show {
  bottom: -1.7em !important;
}
.password-animate .left-arm,
.password-animate .right-arm {
  bottom: -0.5em;
}
.username-animate .left-ear {
  left: 1.5em;
}
.username-animate .right-ear {
  left: 7.5em;
}
.username-animate .left-eye {
  left: 0.5em;
  bottom: 3.8em;
}
.username-animate .left-eye.doe,
.username-animate .right-eye.doe {
  background-image: url(../../img/eye-doe.png);
}

.username-animate .right-eye {
  left: 4em;
  bottom: 3.8em;
}
.username-animate .face {
  left: 0.8em;
}
.username-animate .nose {
  bottom: 2.4em;
  left: 2.5em;
}
.username-animate .mouth {
  bottom: 0.75em;
  background-image: url(../../img/mouth-half.png);
}
.username-animate .mouth.doe {
  background-image: url(../../img/mouth-open.png);
  height: 2em;
  bottom: 0.5em;
}
.login-form {
  width: calc(100% - 5em);
  padding: 0 2.5em;
}
.username,
.password {
  position: relative;
  width: 100%;
  margin: 20px 0;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
.username > input,
.password > input {
  width: calc(100% - 20px);
  padding: 0 10px;
  height: 2.5em;
  border: 0;
  border-radius: 5px;
}
.password > input {
  width: calc(100% - 3.3em);
  padding: 0 2.3em 0 1em;
}
input::-webkit-input-placeholder {
  color: #999;
}
.pwd-eye {
  width: 1.2em;
  height: 1.2em;
  position: absolute;
  top: calc(50% - 0.6em);
  right: 0.5em;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.sub {
  width: 200px;
  height: 35px;
  background-color: #cefefb;
  border-radius: 3px;
  line-height: 35px;
  color: #3dceba;
  cursor: pointer;
}

body {
  width: 100wh;
  height: 90vh;
  color: #fff;
  background: linear-gradient(
    -45deg,
    rgba(9, 69, 138, 0.2),
    rgba(68, 155, 255, 0.7),
    rgba(117, 113, 251, 0.7),
    rgba(68, 155, 255, 0.7),
    rgba(9, 69, 138, 0.2)
  );
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;
}
@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.container {
  width: 100%;
  height: 500px;
}
</style>
