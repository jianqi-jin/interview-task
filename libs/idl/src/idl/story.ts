import webapi from "./gocliRequest"
import * as components from "./storyComponents"
export * from "./storyComponents"

/**
 * @description 
 * @param params
 */
export function greet(params: components.RequestParams, name: string) {
	return webapi.get<components.Response>(`/api/v1/from/${name}`, params)
}

/**
 * @description 
 * @param params
 */
export function stories(params: components.StoriesRequestParams) {
	return webapi.get<components.StoriesResponse>(`/api/v1/stories`, params)
}

/**
 * @description 
 * @param req
 */
export function createStory(req: components.StoryRequest) {
	return webapi.post<components.StoryResponse>(`/api/v1/stories`, req)
}

/**
 * @description 
 * @param req
 */
export function deleteStory(req: components.StoryRequest) {
	return webapi.delete<components.StoryResponse>(`/api/v1/stories`, req)
}

/**
 * @description 
 * @param req
 */
export function updateStory(req: components.StoryRequest) {
	return webapi.put<components.StoryResponse>(`/api/v1/stories`, req)
}

/**
 * @description 
 * @param params
 */
export function story(params: components.StoryDetailRequestParams) {
	return webapi.get<components.StoryResponse>(`/api/v1/story`, params)
}

/**
 * @description 
 * @param params
 */
export function cosCredentials(params: components.CosCredentialsRequestParams) {
	return webapi.get<components.CosCredentialsResponse>(`/api/v1/cos_credentials`, params)
}

/**
 * @description 
 * @param req
 */
export function textToSpeech(req: components.TextToSpeechRequest) {
	return webapi.post<Blob>(`/api/v1/text2speech`, req)
}
