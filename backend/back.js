const fs = require('fs');
const http = require('http');
const url = require('url');
const data = fs.readFileSync('bilibili.json', 'utf-8');
const jsonData = JSON.parse(data)
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // 第二个参数为 true，表示解析查询参数
    const queryParams = parsedUrl.query; // 获取查询参数对象
    const count = queryParams['count'] ?? 4;
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" });
    const shuffled = [...jsonData].sort(() => 0.5 - Math.random());
    res.end(JSON.stringify(shuffled.slice(0, count)));
});
server.listen(8088);