import { RcFile } from "antd/es/upload";
import { storiesApi } from "idl";
import SparkMD5 from 'spark-md5';
var COS = require('cos-js-sdk-v5');

let taskId = '';
export const upload = async ({
  key,
  file,
  onProgress
}: { key: string; file: RcFile; onProgress: any; }) => {
  try {
    var cos = new COS({
      // getAuthorization 必选参数
      getAuthorization: async (options: any, callback: any) => {
        const credentials = await storiesApi.cosCredentials({ key });
        const data = credentials.data;
        callback({
          TmpSecretId: data.TmpSecretId,
          TmpSecretKey: data.TmpSecretKey,
          SecurityToken: data.Token,
          // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          StartTime: Math.floor(new Date().getTime() / 1e3),
          ExpiredTime: Math.floor(new Date().getTime() / 1e3 + 60 * 60),
        });
      }
    });
    // 上传文件
    return new Promise((resolve, reject) => {
      cos.uploadFile({
        Bucket: 'audio-1258550984',
        Region: 'ap-beijing',
        Key: `/audio/${key}`,
        Body: file,
        SliceSize: 1024 * 1024, // 大于1mb才进行分块上传
        onTaskReady: function (tid: string) {
          taskId = tid;
        },
        onProgress: function ({ percent }: { percent: number }) {
          console.log('jjq debug percent', percent);
          onProgress?.({ percent: percent * 100 });
        },
      },
      function (err: any, data: any) {
        console.log(err, data);
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    // 可使用队列暂停、重启任务
    // cos.pauseTask(taskId);
  } catch (e) {
    throw e;
  }
};

export const getFileMd5 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    var blobSlice = File.prototype.slice,
      chunkSize = 2097152,                             // Read in chunks of 2MB
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();
    fileReader.onload = function (e) {
        console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        spark.append(e?.target?.result as ArrayBuffer);                   // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
            loadNext();
        } else {
            console.log('finished loading');
            resolve(spark.end());
        }
    };

    fileReader.onerror = function () {
        console.warn('oops, something went wrong.');
        reject();
    };

    function loadNext() {
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  });
};
