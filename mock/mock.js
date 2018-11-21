export default {
  // 登录
  // {"user":"a","pwd":"a"}
  'POST /api/login': (req, res) => {
    setTimeout(() => {
      res.send(
        // response
        { msg: "ok", token:"xxxxx" }
      );
    }, 1000);
  },

  // 历史记录
  // {token:"xxxxx",token:"xxxxx", "day":"20181102","status":["unmark", "marked"],roll:["20181129-1", "20181129-2"]}
  'POST /api/history': (req, res) => {
    setTimeout(() => {
      res.send(
        // response
        {
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
          rolls: ["20181129-1", "20181129-2"]
        }
      );
    }, 1000);
  },

  // 获取img详情
  // {token:"xxxxx",imgID:"20181129-1-2"}
  'POST /api/detail': (req, res) => {
    setTimeout(() => {
      res.send(
        // response
        {
          imgID: "20181129-1-2",
          imgURL: "http://10.10.0.1/target/xxx.jpg",
          imgSizeWidth: "1920",
          imgSizeHeight: "1080",
          status: "unmark",
          markDetail: [
            {
              markID: "1",
              markType: "failed",
              markPosition: { x: "200", y: "300" }
            },
            {
              markID: "2",
              markType: "hole",
              markPosition: { x: "300", y: "500" }
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
      res.send(
        // response
        {
          imgID: "20181129-1-2",
          imgURL: "http://10.10.0.1:8080/target/xxx.jpg",
          imgSizeWidth: "1920",
          imgSizeHeight: "1080",
          status: "unmark",
          markDetail: [
            {
              markID: "1",
              markType: "failed",
              markPosition: { x: "200", y: "300" }
            },
            {
              markID: "2",
              markType: "hole",
              markPosition: { x: "300", y: "500" }
            }
          ]
        }
      );
    }, 1000);
  },

};