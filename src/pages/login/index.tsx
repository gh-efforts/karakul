import React from "react";
import Link from "next/link";
import getConfig from "next/config";
export default function Login() {
  const {
    publicRuntimeConfig: { ENDPOINT },
  } = getConfig();
  const backendUrl = ENDPOINT;
  return (
    <div>
      <Link href={`${backendUrl}/connect/feishu`}>
        <span>飞书登录</span>
      </Link>
    </div>
  );
}
