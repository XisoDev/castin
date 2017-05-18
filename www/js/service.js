app

.factory("Tpl", function(){
    return {

        "live_5_v2_v3" : {
            title : '방송용 1',
            sequence_count : 4,
            is_notice : 'N',
            is_did : 'N'
        },
        "live_6_v2_h1_v3" : {
            title : '방송용 2',
            sequence_count : 4,
            is_notice : 'Y',
            is_did : 'N'
        },
        "live_5_h2_v3" : {
            title : '방송용 3',
            sequence_count : 3,
            is_notice : 'Y',
            is_did : 'N'
        },
        "live_6_v_h2_v3" : {
            title : '방송용 4',
            sequence_count : 5,
            is_notice : 'N',
            is_did : 'N'
        },
        "live_5_v2_v2_v3_2_1" : {
            title : '방송용 5',
            sequence_count : 4,
            is_notice : 'N',
            is_did : 'N'
        },
        "did_r" : {
          title : '가로형 1',
          sequence_count : 2,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_2" : {
          title : '가로형 2',
          sequence_count : 2,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_3" : {
          title : '가로형 3',
          sequence_count : 3,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_2_1" : {
          title : '가로형 4',
          sequence_count : 3,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_2_2" : {
          title : '가로형 5',
          sequence_count : 2,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_2_3" : {
          title : '가로형 6',
          sequence_count : 2,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_2_over_right" : {
          title : '가로형 7',
          sequence_count : 3,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_2_over_left" : {
          title : '가로형 8',
          sequence_count : 3,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_5_v_hvhv" : {
          title : '가로형 9',
          sequence_count : 5,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_6" : {
          title : '가로형 10',
          sequence_count : 6,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_4" : {
          title : '가로형 11',
          sequence_count : 4,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_7" : {
          title : '가로형 12',
          sequence_count : 7,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_12" : {
          title : '가로형 13',
          sequence_count : 12,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_5" : {
          title : '가로형 14',
          sequence_count : 5,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_r_9" : {
          title : '가로형 15',
          sequence_count : 9,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_c_1" : {
          title : '세로형 1',
          sequence_count : 1,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_c_2" : {
          title : '세로형 2',
          sequence_count : 2,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_c_7" : {
          title : '세로형 3',
          sequence_count : 7,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_c_9" : {
          title : '세로형 4',
          sequence_count : 9,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_c_7_2" : {
          title : '세로형 5',
          sequence_count : 7,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_c_7_3" : {
          title : '세로형 6',
          sequence_count : 7,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_c_2_2" : {
          title : '세로형 7',
          sequence_count : 2,
          is_notice : 'N',
          is_did : 'Y'
        },
        "did_c_3" : {
          title : '세로형 8',
          sequence_count : 2,
          is_notice : 'Y',
          is_did : 'Y'
        }
    }
})

.factory('FileObj', function(){
    var self = this;
    self.fileObj = {};

    self.get = function(){
        return self.fileObj;
    };
    self.set = function(obj){
        console.log('fileObj---');
        console.log(obj);
        self.fileObj = obj;
    };

    return self;
})


.factory('Toast', function($cordovaToast){
  return function(text) {
    $cordovaToast.showShortBottom(text);
  }
})


.factory('Agreement', function(XisoApi){
  var service = {};

  service.getAgreement = function(){
    return XisoApi.send('config.getConfig', {name : 'castin_agreement'});
  };
  service.getPrivacy = function(){
    return XisoApi.send('config.getConfig', {name : 'castin_privacy'});
  };

  return service;
})

.factory("Server", function(){
    var self = this;

    self.get = function(){
        // 저장된 server 가 없으면 main server 를 넣는다.
        if(!window.localStorage['server']) {
            self.setMain();
        }

        // console.log('getting server ---');
        // console.log(JSON.parse(window.localStorage['server']));
        return JSON.parse(window.localStorage['server']);
    };

    self.set = function(serverObj){
        // console.log('setting server ---');
        // console.log(serverObj);
        window.localStorage['server'] = JSON.stringify(serverObj);
    };

    self.getMain = function(){
      return 'http://live.softgear.kr';
    };

    self.setMain = function(){
        self.set({url: self.getMain(), is_main: 'Y'});
    };

    return self;
})

.factory("Device", function(){
    var self = this;

    self.get = function(){
        return JSON.parse(window.localStorage['device']);
    };

    self.set = function(deviceObj){
        window.localStorage['device'] = JSON.stringify(deviceObj);
    };

    return self;
})

.factory("FCMToken", function(){
    var self = this;

    self.get = function(){
        return JSON.parse(window.localStorage['fcm_token']);
    };

    self.set = function(fcm_token){
        window.localStorage['fcm_token'] = JSON.stringify(fcm_token);
    };

    return self;
})

.factory("Viewcount",function(XisoApi, Device){
  var self = this;

  self.send = function(content_srl, file_srl){
    var device = Device.get();
    var params = {
      uuid : device.uuid,
      content_srl : content_srl,
      file_srl : file_srl
    };

    return XisoApi.send('file.procIncreaseCount',params);
  };

  return self;
})

.factory("Auth", function(XisoApi, Device, FCMToken){
    var self = this;

    self.get = function(){
        var device = Device.get();
        var params = { uuid : device.uuid, model : device.model, serial : device.serial, version : device.version, is_did : "N", nick_name : window.localStorage['nick_name'], fcm_token : FCMToken.get() };
        console.log(params);

        //플레이어의 uuid로 인증번호 생성. 인증번호 받아옴. 채널ID가 있으면 채널테이블에서 SERVER URL 받아옴
        return XisoApi.send('player.procCheckPlayer', params);
    };

    return self;
})

.factory("DownloadedContent", function(){
    var self = this;

    self.getNewContent = function(){
      if(!window.localStorage['downloaded_content']) return false;

      return JSON.parse(window.localStorage['downloaded_content']);
    };

    self.get = function(){
        if(!window.localStorage['play_content']) return false;

        return JSON.parse(window.localStorage['play_content']);
    };

    self.set = function(content){
        window.localStorage['downloaded_content'] = JSON.stringify(content);
    };

    return self;
})

.factory("Content", function(XisoApi,Device){
    var self = this;

    self.get = function(params){
        params.is_did = "N";
        return XisoApi.send('content.getContent', params);
    };

    self.update = function(content_srl){
      var device = Device.get();
      var params = {
        uuid : device.uuid,
        content_srl : content_srl,
          is_did : 'N'
      }

      return XisoApi.send('player.procUpdateByPlayer',params);
    };

    return self;
})

.factory("Channel", function(){
    var self = this;

    self.getList = function() {
        var channel_list = [];
        return channel_list;
    };

    return self;
})

.factory('ClockSrv', function($interval) {
    var service = {
        clock: addClock,
        cancelClock: removeClock
    };

    var clockElts = [];
    var clockTimer = null;
    var cpt = 0;

    function addClock(fn) {
        var elt = {
            id: cpt++,
            fn: fn
        };
        clockElts.push(elt);
        if (clockElts.length === 1) {
            startClock();
        }
        return elt.id;
    }

    function removeClock(id) {
        for (var i in clockElts) {
            if (clockElts[i].id === id) {
                clockElts.splice(i, 1);
            }
        }
        if (clockElts.length === 0) {
            stopClock();
        }
    }

    function startClock() {
        if (clockTimer === null) {
            clockTimer = $interval(function() {
                for (var i in clockElts) {
                    clockElts[i].fn();
                }
            }, 1000);
        }
    }

    function stopClock() {
        if (clockTimer !== null) {
            $interval.cancel(clockTimer);
            clockTimer = null;
        }
    }

    return service;
})

.factory("Object", function(){
    return function(error, message, data){
        var obj = {};
        obj.error = error;
        obj.message = message;

        if(typeof data === "undefined") {
            data = false;
        }
        obj.data = data;
        return obj;
    }
})

.factory('XisoApi', function($http, Object, Server){
    var service = {};
    var baseUrl = Server.getMain();

    var finalUrl = '';

    service.send = function(action, params){
        finalUrl = baseUrl + '/api.php?act=' + action;
        // console.log(finalUrl);

        var result = $http({
            method: 'POST',
            url: finalUrl,
            data: params
        }).then(function(res){
            return res.data;
        }, function(err){
            console.log(err);
            return Object(-1, "서버와의 통신에 실패하였습니다.");
        });

        return result;
    };

    service.server_url = baseUrl;

    return service;
});
