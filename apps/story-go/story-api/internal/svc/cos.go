package svc

import (
	"context"
	"github.com/tencentyun/cos-go-sdk-v5"
	"github.com/tencentyun/qcloud-cos-sts-sdk/go"
	"net/http"
	url2 "net/url"
	"time"
)

var (
	appid = "1258550984"
	bucket="audio-1258550984"
	region="ap-beijing"
	secretId="AKIDhFavKrJk7PcilmoEUejZBSkqlbP7g2FH"
	secretKey="weGpNtNDvRr7BAxbBnmqoxGbHp1AAAA0"
)

func GetStsCredentials(key string) (credentials *sts.Credentials, err error) {
	//appid := "1258550984"
	//bucket := "audio-1258550984"
	//region := "ap-beijing"
	//mysqlConfig := config.GetCosConfig()
	//mysqlConfig := config.GetMysqlConfig()
	c := sts.NewClient(
		// 通过环境变量获取密钥, os.Getenv 方法表示获取环境变量
		secretId,  // 用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
		secretKey, // 用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
		nil,
		// sts.Host("sts.internal.tencentcloudapi.com"), // 设置域名, 默认域名sts.tencentcloudapi.com
		// sts.Scheme("http"),      // 设置协议, 默认为https，公有云sts获取临时密钥不允许走http，特殊场景才需要设置http
	)
	// 策略概述 https://cloud.tencent.com/document/product/436/18023
	opt := &sts.CredentialOptions{
		DurationSeconds: int64(time.Hour.Seconds()),
		Region:          region,
		Policy: &sts.CredentialPolicy{
			//{
			//	"Statement": [
			//{
			//	"Action": [
			//	"name/cos:*"
			//],
			//	"Effect": "Allow",
			//	"Principal": {
			//	"qcs": [
			//	"qcs::cam::anyone:anyone"
			//]
			//},
			//	"Resource": [
			//
			//],
			//}
			//}
			Statement: []sts.CredentialPolicyStatement{
				{
					Action: []string{
						"name/cos:*",
					},
					Effect: "allow",
					Resource: []string{
						//这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
						//存储桶的命名格式为 BucketName-APPID，此处填写的 bucket 必须为此格式
						// qcs::cos:ap-guangzhou:uid/1250000000:examplebucket-1250000000/folder/exampleobject
						"qcs::cos:"+region+":uid/"+appid+":"+bucket+"/audio/" + key,
						//"qcs::cos:" + region + ":uid/" + appid + ":" + bucket + "*", // "/audio/" + key,
					},
					// 开始构建生效条件 condition
					// 关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
					//Condition: map[string]map[string]interface{}{
					//	"ip_equal": map[string]interface{}{
					//		"qcs:ip": []string{
					//			"0.0.0.0/0",
					//			"10.217.182.3/24",
					//			"111.21.33.72/24",
					//		},
					//		//"qcs:ip": "127.0.0.0/24",
					//	},
					//},
				},
			},
		},
	}
	res, err := c.GetCredential(opt)
	if err != nil {
		return nil, err
	}
	// fmt.Printf("%+v\n", res)
	// fmt.Printf("%+v\n", res.Credentials)
	return res.Credentials, nil
}

func GetObjectUrl(key string) (url *string, err error) {
	// 存储桶名称，由 bucketname-appid 组成，appid 必须填入，可以在 COS 控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
	// 替换为用户的 region，存储桶 region 可以在 COS 控制台“存储桶概览”查看 https://console.cloud.tencent.com/ ，关于地域的详情见 https://cloud.tencent.com/document/product/436/6224 。
	u, _ := url2.Parse("https://"+bucket+".cos."+region+".myqcloud.com")
	b := &cos.BaseURL{BucketURL: u}
	//bucket := "audio-1258550984"
	//region := "ap-beijing"
	client := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID: secretId,  // 用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参见 https://cloud.tencent.com/document/product/598/37140
			SecretKey: secretKey,  // 用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参见 https://cloud.tencent.com/document/product/598/37140
		},
	})
	name := key
	ctx := context.Background()
	// 1. 通过普通方式下载对象
	resp, err := client.Object.Get(ctx, name, nil)
	if err != nil {
		panic(err)
	}
	resp.Body.Close()
	// 获取预签名 URL
	presignedURL, err := client.Object.GetPresignedURL(ctx, http.MethodGet, name, secretId, secretKey, time.Hour, nil)
	if err != nil {
		return nil, err
	}
	// 2. 通过预签名 URL下载对象
	//resp2, err := http.Get()
	//if err != nil {
	//	panic(err)
	//}
	//bs2, _ := ioutil.ReadAll(resp2.Body)
	//resp2.Body.Close()
	//if bytes.Compare(bs2, bs) != 0 {
	//	panic(errors.New("content is not consistent"))
	//}
	urlStr := presignedURL.String()
	return &urlStr, nil
}
