package svc

import (
	"fmt"
	"github.com/go-resty/resty/v2"
	"task-api/internal/types"
)
var httpClient *resty.Client

type BaseResp struct {
	ErrorCode int    `json:"error_code"`
	ErrorMsg  string `json:"error_message"`
}

func init() {
	httpClient = resty.New()
}

// https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/rest-text-to-speech?tabs=nonstreaming
func SendText2SpeechRequest(req *types.TextToSpeechRequest) (data []byte, err error) {
	client := httpClient.R()
	respData := &BaseResp{}
	//reqData, _ := json.Marshal(req)
	client.SetBody(`<speak version='1.0' xml:lang='zh-CN'>
		<voice
			xml:lang='zh-CN'
			xml:gender='Male'
    		name='zh-CN-YunxiNeural'
		>
        	`+req.Text+`
</voice></speak>`)
	client.SetHeaders(map[string]string{
		"X-Microsoft-OutputFormat": "riff-24khz-16bit-mono-pcm",
		"Content-Type": "application/ssml+xml",
		"Host": SpeechHost,
		//"Authorization": "Bearer "+SpeechKey,
		"Ocp-Apim-Subscription-Key": SpeechKey,
		"Accept": "*/*",
		"Accept-Encoding": "gzip, deflate, br",
	})
	resp, err := client.SetResult(respData).Post(SpeechEndPoint+"/cognitiveservices/v1")
	if resp.IsError() {
		return nil, fmt.Errorf("post request failed %s")
	}
	if err != nil {
		return nil, fmt.Errorf("unmarshal response failed: %v", err)
	}
	if respData.ErrorCode != 0 {
		return nil, fmt.Errorf("response error: %v", respData.ErrorMsg)
	}
	return resp.Body(), nil
}