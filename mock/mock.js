export default {
  // 登录
  // {"user":"a","pwd":"a"}
  'POST /api/login': (req, res) => {
    setTimeout(() => {
      res.send(
        // response
        {
          msg: "ok",
          token: "xxxxx",
          profile: {
            name: "xxx",
            group: "管理员",
            lastLoginTime: "1543807055923", //时间戳
          }
        }
      );
    }, 1000);
  },
  // 登出
  // {"user":"a", token:"xxxxx"}
  'POST /api/logout': (req, res) => {
    res.send(
      // response
      {
        msg: "ok",
      }
    )
  },

  // 历史记录
  // {token:"xxxxx", "day":"20181102", "status":["unmark", "marked"],roll:["20181129-1", "20181129-2"]}
  'POST /api/history': (req, res) => {
    setTimeout(() => {
      res.send(
        // response
        {
          msg: "ok",
          history: [
            {
              imgID: "20181129-1-1",
              status: "unmark",
              imgURL: "http://10.10.0.1/target/xxx.jpg"
            },
            {
              imgID: "20181129-1-2",
              status: "unmark",
              imgURL: "http://10.10.0.1/target/xxx.jpg"
            },
          ]
        }
      );
    }, 1000);
  },

  // 获取卷列表
  // {token:"xxxxx"}
  'POST /api/rolls': (req, res) => {
    setTimeout(() => {
      res.send(
        // response
        {
          msg: "ok",
          rolls: ["20181129-1", "20181129-2"]
        }
      );
    }, 1000);
  },

  // 获取img详情
  // {token:"xxxxx",imgID:"20181129-1-2"}
  // markType说明: 边损，边裂，毛刺，塔型、松卷，面包卷
  // markType取值: edge-loss, edge-crack, burr, tower-type, loose-roll, roll
  // markPosition: 数组长度必须为偶数，两项为一个点。约定按顺序链接。
  //               只有一个点时，为单点。两个点为短线。三个点以上，最后一个点和第一个点闭合，为多边形。
  'POST /api/detail': (req, res) => {
    setTimeout(() => {
      res.send(
        // response
        {
          msg: "ok",
          imgID: "20181129-1-2",
          imgURL: "https://img.zcool.cn/community/0100e655445e5b0000019ae9770313.jpg@2o.jpg",
          imgSizeWidth: "1920",
          imgSizeHeight: "1080",
          status: "unmark",
          markDetail: [
            {
              markID: "1",
              markType: "tower-type",
              markPosition: [0, 0, 100, 0, 100, 100, 50, 150, 10, 100]
            },
            {
              markID: "2",
              markType: "edge-loss",
              markPosition: [0, 0, 100, 0, 100, 100, 50, 150, 10, 100]
            }
          ]
        }
      );
    }, 1000);
  },

  // 获取实时图像img详情
  // {token:"xxxxx"}
  'POST /api/real-time-image': (req, res) => {
    setTimeout(() => {
      // 随机数据
      const list = [];
      for (let i = 1; i < 5; i++) {
        const types = ["edge-loss", "edge-crack", "burr", "tower-type", "loose-roll", "roll"]
        list.push({
          "markType": types[Math.floor(Math.random() * 6)],
          "markPosition": [
            Math.floor(Math.random() * 1200),
            Math.floor(Math.random() * 700),
            Math.floor(Math.random() * 1200),
            Math.floor(Math.random() * 700),
            Math.floor(Math.random() * 1200),
            Math.floor(Math.random() * 700),
            Math.floor(Math.random() * 1200),
            Math.floor(Math.random() * 700),
          ]
        });
      }
      list.push(
        {
          markID: "1",
          markType: "tower-type",
          markPosition: [0, 0, 100, 0, 100, 100, 50, 150, 10, 100]
        })
      list.push(
        {
          markID: "2",
          markType: "edge-loss",
          markPosition: [220, 220, 320, 220, 320, 320, 270, 370, 230, 320]
        })
      list.push(
        {
          markID: "3",
          markType: "burr",
          markPosition: [400, 300]
        })
      list.push(
        {
          markID: "4",
          markType: "edge-loss",
          markPosition: [520, 520, 420, 420]
        })
      res.send(
        // response
        {
          msg: "ok",
          imgID: "20181129-1-2",
          imgURL: "https://img.zcool.cn/community/0100e655445e5b0000019ae9770313.jpg@2o.jpg",
          imgSizeWidth: "1920",
          imgSizeHeight: "1080",
          status: "unmark",
          markDetail: list
        }
      );
    }, 1000);
  },

  // 修改密码
  // {token:"xxxxx", old: "xxx", new: "xxx"}
  'POST /api/setpassword': (req, res) => {
    res.send(
      // response
      {
        msg: "ok"
      }
    );
  }
};
