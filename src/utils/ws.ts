let ws = require("nodejs-websocket");
process.stdin.setEncoding("utf8");
let userObj = {};
let wsServer = ws
    .createServer(function (conn: any) {
        conn.on("text", function (str: string) {
            let newStr = eval("(" + str + ")");

            const { memberId, targetId, content } = newStr;
            console.log("收到的信息为:" + content);
            console.log("用户id:" + memberId);
            userObj[memberId] = {
                coon: conn,
                isOnline: true,
            };

            if (content !== "已经建立连接") {
                //如果接收方在线
                if (userObj[targetId]) {
                    userObj[targetId].coon.sendText(memberId + ":" + content);
                }
                conn.sendText(memberId + ":" + content);
            }

            //像前端页面发送推送
            process.stdout.write("请输入发送的值：");
            process.stdin.on("data", function (chunk) {
                conn.sendText(chunk);
            });
        });

        conn.on("close", function (code: any, reason: any) {
            console.log("关闭连接");
        });
        conn.on("error", function (code: any, reason: any) {
            console.log("异常关闭");
        });
    })
export default wsServer