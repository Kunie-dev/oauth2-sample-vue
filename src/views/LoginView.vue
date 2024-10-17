<script setup lang="ts">
async function onClick() {
  const url = `${import.meta.env.VITE_APP_AUTHORIZATION_SERVER_HOST}/oauth2/authorize`;
  const response_type = "code";
  const client_id = import.meta.env.VITE_APP_OAUTH2_CLIENT_ADMIN_GC_CLIENT_ID;
  const scope = encodeURI("openid profile");
  const state = generateRandomCode();
  const redirect_uri = encodeURI(
    import.meta.env.VITE_APP_OAUTH2_CLIENT_ADMIN_GC_REDIRECT_URI,
  );

  const code_verifier = generateRandomCode();
  const code_challenge = await generateCodeChallenge(code_verifier);

  sessionStorage.setItem("code_verifier", code_verifier);
  sessionStorage.setItem("state", state);

  window.location.href = `${url}?response_type=${response_type}&client_id=${client_id}&scope=${scope}&state=${state}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&code_challenge_method=S256`;
}

function generateRandomCode() {
  const length = 128; // 43 ~ 128자 사이로 임의의 길이 설정
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let codeVerifier = "";
  for (let i = 0; i < length; i++) {
    codeVerifier += possible.charAt(
      Math.floor(Math.random() * possible.length),
    );
  }
  return codeVerifier;
}

async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data); // SHA-256 해시 적용

  // Base64 URL 인코딩 (패딩 제거 및 특수 문자 변환)
  return base64UrlEncode(hashBuffer);
}

function base64UrlEncode(buffer: ArrayBuffer) {
  const byteArray = Array.from(new Uint8Array(buffer));
  const base64 = btoa(String.fromCharCode.apply(null, byteArray));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
</script>

<template>
  <div>
    <button type="button" @click="onClick">로그인</button>
  </div>
</template>

<style scoped></style>
