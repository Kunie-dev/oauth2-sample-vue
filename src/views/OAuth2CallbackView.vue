<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  clientId: string;
  state?: string;
  code?: string;
  error?: string;
  errorDescription?: string;
  errorUri?: string;
}

const {
  clientId: client_id,
  state,
  code,
  error,
  errorDescription,
  errorUri,
} = defineProps<Props>();

const accessToken = ref<string | null>(null);
const refreshToken = ref<string | null>(null);

onMounted(async () => {
  if (error) {
    sessionStorage.removeItem("code_verifier");
    sessionStorage.removeItem("state");
    window.alert(`Error(${error}): ${errorDescription} (${errorUri})`);
    return;
  }

  const code_verifier = sessionStorage.getItem("code_verifier");
  const _state = sessionStorage.getItem("state");

  if (!code_verifier || !_state) {
    throw new Error("'code_verifier' 또는 'state' 를 찾을 수 없음.");
  }

  if (!code) {
    throw new Error("'code' 를 찾을 수 없음.");
  }

  if (state !== _state) {
    throw new Error("'state' 가 일치하지 않음.");
  }

  const redirect_uri = encodeURI(
    import.meta.env.VITE_APP_OAUTH2_CLIENT_ADMIN_GC_REDIRECT_URI,
  );

  const url = `${import.meta.env.VITE_APP_API_HOST}/oauth2/token`;
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri,
    client_id: "oidc-client",
    code_verifier,
  });

  const {
    access_token,
    refresh_token,
    expires_in,
    id_token,
    scope,
    token_type,
  } = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  }).then((response) => response.json());

  console.log(
    access_token,
    refresh_token,
    expires_in,
    id_token,
    scope,
    token_type,
  );

  accessToken.value = access_token;
  refreshToken.value = refresh_token;
});
</script>

<template>
  <div>
    accessToken: {{ accessToken }} <br />
    refreshToken: {{ refreshToken }} <br />
  </div>
</template>

<style scoped></style>
