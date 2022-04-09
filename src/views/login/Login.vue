<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 09:16:24
 * @LastEditors: ydfk
 * @LastEditTime: 2022-04-09 18:30:14
-->
<template>
  <div class="login">
    <div class="flex justify-center">这是登录</div>
    <p>{{ user }}</p>
    <a-button type="primary" @click="onMainPage">主页</a-button>
  </div>
</template>

<script setup lang="ts">
  import { loginApi } from "@/apis/login";
  import { message } from "ant-design-vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const user = ref({});

  onMounted(async () => {
    user.value = await loginApi("u", "p");
  });

  const onMainPage = () => {
    message.info("登录成功");
    router.push({ name: "dashboard" });
  };
</script>
