<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 09:16:24
 * @LastEditors: ydfk
 * @LastEditTime: 2024-02-22 16:32:58
-->
<template>
  <div class="bg-neutral-50 h-screen login-card">
    <div class="sign-card bg-white w-[660px] h-[330px] rounded-[12px] p-5">
      <div class="logo text-2xl font-bold">
        <img class="logo-img" src="../../assets/images/logo.png" />
        <span class="sysName">{{ SYSTEM_NAME }}</span>
      </div>
      <div>
        <a-form class="w-full" ref="formRef" :model="user">
          <a-form-item name="userName" :rules="[{ required: true, message: '用户名不能为空' }]">
            <a-input placeholder="请输入用户名" v-model:value="user.userName">
              <template #prefix> <UserOutlined class="site-form-item-icon" /> </template
            ></a-input>
          </a-form-item>
          <a-form-item name="password" :rules="[{ required: true, message: '密码不能为空' }]">
            <a-input-password placeholder="请输入密码" v-model:value="user.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-form>
        <div><a-button :loading="submitLoading" block type="primary" @click="onLogin">登录</a-button></div>
      </div>
    </div>
    <div class="copyRight flex-center">
      <div> @{{ yearStr }} 青矩技术股份有限公司 版权所有 {{ VERSION }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { message } from "ant-design-vue";
  import type { FormInstance } from "ant-design-vue";
  import { useAppStore } from "@/stores/modules/app";
  import { VERSION } from "@/commons/const";

  const submitLoading = ref(false);
  const user = reactive({
    userName: "admin",
    password: "1",
  });
  const SYSTEM_NAME = import.meta.env.VITE_GLOB_APP_TITLE || "vue-starter";

  const formRef = ref<FormInstance>();

  const yearStr = computed(() => new Date().getFullYear());

  const onLogin = async () => {
    const values = await formRef.value?.validateFields();
    if (values) {
      useAppStore().loading = true;
      submitLoading.value = true;
    }
  };

  const onMainPage = () => {
    message.success("登录成功");
  };
</script>
<style scoped lang="scss">
  .sign-card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }

  .login-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url("../../assets/images/login_bg.png");
    background-size: 100% 100%;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .logo-img {
    width: 90px !important;
  }

  .sysName {
    margin-left: 10px;
  }

  .copyRight {
    flex: 0 1 80px;
    margin-top: 50px;
  }
</style>
