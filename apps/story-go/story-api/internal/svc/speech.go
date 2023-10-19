package svc

var (
	SpeechKey =  "75652b62087d470783b00213111b9cb9"
	SpeechRegion = "eastus"
	SpeechHost = "westus.tts.speech.microsoft.com"
	SpeechEndPoint = "https://" + SpeechHost
)



// demo from official doc
//func SendSpeech(text string) (data []byte, err error) {
//	url := SpeechEndPoint + "/cognitiveservices/v1"
//	method := "POST"
//
//	payload := strings.NewReader(`<speak version='1.0' xml:lang='zh-CN'>
//		<voice
//			xml:lang='zh-CN'
//			xml:gender='Male'
//    		name='zh-CN-YunxiNeural'
//		>
//        	小兔子
//</voice></speak>`)
//
//	client := &http.Client {
//	}
//	req, err := http.NewRequest(method, url, payload)
//
//	if err != nil {
//		fmt.Println(err)
//		return nil, err
//	}
//	req.Header.Add("X-Microsoft-OutputFormat", "riff-24khz-16bit-mono-pcm")
//	req.Header.Add("Content-Type", "application/ssml+xml")
//	req.Header.Add("Host", SpeechHost)
//	req.Header.Add("Ocp-Apim-Subscription-Key", SpeechKey)
//
//	res, err := client.Do(req)
//	if err != nil {
//		fmt.Println(err)
//		return nil, err
//	}
//	defer res.Body.Close()
//
//	body, err := ioutil.ReadAll(res.Body)
//	if err != nil {
//		fmt.Println(err)
//		return nil, err
//	}
//	return body, nil
//}