<!--
 * @Description: Copyright (c) ydfk. All rights reserved
 * @Author: ydfk
 * @Date: 2021-08-26 09:16:24
 * @LastEditors: ydfk
 * @LastEditTime: 2022-02-08 15:57:19
-->
<template>
  <div class="login">
    <div class="flex justify-center">这是登录</div>
    <p>{{ user }}</p>
    <a-button type="primary" @click="onMainPage">主页</a-button>
  </div>
</template>

<script lang="ts">
  import { loginApi } from "@/apis/login";
  import { message } from "ant-design-vue";
  //import { defineComponent, onMounted, ref } from "vue";
  import { useRouter } from "vue-router";

  export default defineComponent({
    setup() {
      const router = useRouter();
      const user = ref({});

      onMounted(async () => {
        user.value = await loginApi("u", "p");
      });

      return {
        user: user,
        onMainPage: () => {
          message.info("登录成功");
          router.push({ name: "dashboard" });
        },
      };
    },
  });
</script>
