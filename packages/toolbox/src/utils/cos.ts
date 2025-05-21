import COS from "cos-js-sdk-v5";
import { getEnv } from "./env";

const GET = async (arg: any) => {
  return {
    data: {} as any,
  };
};

// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
export const cos = new COS({
  // SecretId: getEnv().NEXT_PUBLIC_COS_SECRET_ID, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  // SecretKey: getEnv().NEXT_PUBLIC_COS_SECRET_KEY, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  getAuthorization: async function (options, callback) {
    const originData = await GET({
      params: {
        path: getEnv().NEXT_PUBLIC_COS_PREFIX,
      },
    });
    const data = originData.data;
    callback({
      TmpSecretId: data?.secret_id ?? "",
      TmpSecretKey: data?.secret_key ?? "",
      SecurityToken: data?.token ?? "",
      // 建议返回服务器时间作为签名的开始时间，避免客户端本地时间偏差过大导致签名错误
      StartTime: data?.start_time ?? Date.now(), // 时间戳，单位秒，如：1580000000
      ExpiredTime: data?.expired_time ?? Date.now(), // 时间戳，单位秒，如：1580000000
      ScopeLimit: false, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
    });
  },
});
//
// cos.headBucket(
//   {
//     Bucket: getEnv().NEXT_PUBLIC_COS_BUCKET,
//     Region: getEnv().NEXT_PUBLIC_COS_REGION /* 存储桶所在地域，必须字段 */,
//   },
//   function (err, data) {
//     if (err) {
//       console.log(err.error);
//     }
//   }
// );
