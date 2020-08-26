import React, { useEffect } from "react";
import Link from "next/link";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { isArray, isObject } from "util";
export default function Login() {
  const {
    publicRuntimeConfig: { ENDPOINT },
  } = getConfig();
  const backendUrl = ENDPOINT;
  const router = useRouter();
  useEffect(() => {
    console.log(router);
    const callback = router.asPath.split("?");
    fetch(`${backendUrl}/auth/feishu/callback?${callback[1]}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem("jwt", res.jwt);
        localStorage.setItem("user", res.user);

        setTimeout(() => router.push("/"), 3000); // Redirect to homepage after 3 sec
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);
  return (
    <div>
      <Link href={`${backendUrl}/connect/feishu`}>
        <span>飞书登录</span>
      </Link>
    </div>
  );
}
