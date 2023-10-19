import webapi from "./gocliRequest"
import * as components from "./taskComponents"
export * from "./taskComponents"

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
export function tasks(params: components.TasksRequestParams) {
	return webapi.get<components.TasksResponse>(`/api/v1/tasks`, params)
}

/**
 * @description 
 * @param req
 */
export function createTask(req: components.TaskRequest) {
	return webapi.post<components.TaskResponse>(`/api/v1/task`, req)
}

/**
 * @description 
 * @param req
 */
export function deleteTask(req: components.TaskRequest) {
	return webapi.delete<components.TaskResponse>(`/api/v1/task`, req)
}

/**
 * @description 
 * @param req
 */
export function updateTask(req: components.TaskRequest) {
	return webapi.put<components.TaskResponse>(`/api/v1/task`, req)
}

/**
 * @description 
 * @param params
 */
export function task(params: components.TaskDetailRequestParams) {
	return webapi.get<components.TaskResponse>(`/api/v1/task`, params)
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
