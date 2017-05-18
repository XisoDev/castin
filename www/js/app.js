// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('didplayer', ['ionic','ngCordova']);

app.run(function($ionicPlatform, $rootScope, $ionicPopup, FileObj, Device, ClockSrv, $filter,$state,FCMToken) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          // StatusBar.styleDefault();
          StatusBar.hide();
        }

        FileObj.set(cordova.file);

        Device.set(ionic.Platform.device());

        window.open = cordova.InAppBrowser.open;

        FCMPlugin.getToken(
            function(token){
                console.log(token);
                FCMToken.set(token);
            },
            function(err){
                console.log('error retrieving token: ' + err);
            }
        );

        FCMPlugin.onNotification(function(data){
            console.log(data);

            // 채널 정보가 있으면
            if(data.ch_srl) {
                $ionicPopup.show({
                    title: data.title,
                    template: '<img src="' + data.image + '" style="width:100%" /><p>' + data.body + '</p>',
                    buttons: [
                        {text: '취소'},
                        {
                            text: '<b>바로가기</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                // 채널로 바로가기
                                $state.go('channel_list', {mode : 'content', ch_srl : data.ch_srl});
                            }
                        }
                    ]
                });
            }else{
                $ionicPopup.alert({
                    title: data.title,
                    // template: '<img src="' + data.image + '" style="width:100%" /><p>' + data.body + '</p>'
                    template: '<p>' + data.body + '</p>'
                });
            }

            if(data.wasTapped){
                //Notification was received on device tray and tapped by the user.
            }else{
                //Notification was received in foreground. Maybe the user needs to be notified.
            }
        });

        /*console.log('Start push configuration');
        var push = PushNotification.init({
            android: {
                senderID: "16335973078",
            },
            ios: {
                alert: true,
                badge: true,
                sound: true,
            },
            windows: {}
        });
        push.on('error', function(data) {
            console.log('ERROR ' + data);
        });
        push.on('registration', function(data) {
            console.log("cordovaPush.register token: " + data.registrationId);
            var token = data.registrationId;
            FCMToken.set(token);
        });
        push.on('notification', function (notification) {
            console.log(JSON.stringify([notification]));
            if (ionic.Platform.isAndroid()) {
                // handleAndroid(notification);
            }
            else if (ionic.Platform.isIOS()) {
                // handleIOS(notification);
            }
        });*/
    });

    ClockSrv.clock(function() {
        // console.log($filter('date')(Date.now(), 'yyyy-MM-dd HH:mm:ss'));
        var today = new Date();
        var week_arr = new Array('일', '월', '화', '수', '목', '금', '토');
        var week = week_arr[today.getDay()];

        $rootScope.clock_HM = $filter('date')(Date.now(), 'HH:mm');
        $rootScope.clock_YMD = $filter('date')(Date.now(), 'MM월 dd일 ') + week + "요일";
    });

    //back button action
    $ionicPlatform.registerBackButtonAction(function(e) {

        e.preventDefault();

        $rootScope.exitApp = function() {
            $ionicPopup.confirm({
                title: "<strong>앱을 종료할까요?</strong>",
                template: '확인하시면 앱을 종료할 수 있습니다.',
                buttons: [
                    { text: '취소' },
                    {
                        text: '<b>종료</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            ionic.Platform.exitApp();
                        }
                    }
                ]
            });
        };
        if($state.current.name == 'channel_list'){
          $state.go('player');
        }else{
          $rootScope.exitApp();
        }

        return false;
    }, 101);


    //stateChange event
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      var nick_name = window.localStorage['nick_name'];
      var agreement = window.localStorage['agreement'];
      var content_srl = window.localStorage['content_srl'];
      if (toState.agreeRequired && agreement != 'Y'){
        $state.transitionTo("agreement");
        event.preventDefault();
      }
      if (toState.authRequired && !nick_name){
        $state.transitionTo("login");
        event.preventDefault();
      }
      if (toState.contentRequired && !content_srl && nick_name){
        console.log("기각");
        $state.transitionTo("channel_list");
        event.preventDefault();
      }
    });


});

app.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl : './templates/login.html',
      controller : 'loginCtrl'
    })
    .state('agreement', {
      url:'/agreement',
      templateUrl : './templates/agreement.html',
      controller : 'agreeCtrl'
    })
    .state('channel_list', {
      url:'/channel_list',
      params: {
          mode: null,
          ch_srl: null
      },
      templateUrl : './templates/channel_list.html',
      controller : 'channelCtrl'
    })
    .state('player', {
      url: '/',
      templateUrl: './templates/player.html',
      controller: "playerCtrl",
      authRequired: true,
      agreeRequired: true,
      contentRequired: true
    });
  $urlRouterProvider.otherwise("/");
});

app.filter('trustUrl', function($sce){ // {{url_prefix | trustUrl : url}}
    return function(url_prefix, url) {
        return $sce.trustAsResourceUrl(url_prefix + url);
    };
});
