/*
    Copyright (c) 2013-2014 by Olivier Houle (Fungus)
    Please do not copy or modify without my permission.
*/

SockJS.prototype.msg = function(a){this.send(JSON.stringify(a))};
Array.prototype.isArray = true;
var tastyPlugShutDown;
if (typeof tastyPlugShutDown != 'undefined') tastyPlugShutDown();
(function(){
    var sock, afktime = Date.now(), reconint = 2, pms = false, drag = false, hidevideo = false, joincd = false,
    version = '1.3.0.5', commands = {}, tos = {}, boothcd = false, reconnect = true, emotes, cd = false, inRoom = [],
    settings = {
        show: true,
        autowoot: false,
        autojoin: false,
        chatmentions: false,
        joinnotifs: {toggle:false,ranks:false,friends:false},
        joinmode: 1,
        msgs: [],
        afkalert: false,
        lastPM: null,
        uipos: {'top':'54px','left':'0'},
        boothalert: false,
        histalert: false,
        chatimgs: false,
        emotes: false,
        twitch: false,
        userfaces: false,
        tastycat: false,
        logos: false,
        misc: false,
        gifs: false,
        friends: {},
        hidden: false
    };
    function socket() {
        sock = new SockJS('https://fungustime.pw:4957');
        sock.onopen = function() {
            reconint = 2;
            console.log('[TastyPlug v' + version + '] Connected to socket!');
            return sock.msg({z:'userjoin',a:API.getUser(),r:location.pathname});
        };
        sock.onmessage = function(data) {
            data = JSON.parse(data.data);
            switch (data.z) {
                case 'load':
                    $('#tp-antiAfk span.result').text(data.a.antiAfk?'on':'off');
                    $('#tp-antiAfkLimit span.result').text(data.a.antiAfkLimit);
                    $('#tp-lottery span.result').text(data.a.lottery?'on':'off');
                    $('#tp-lotTime span.result').text(60-new Date().getMinutes());
                    $('#tp-userCmds span.result').text(data.a.userCmds?'on':'off');
                    $('#tp-duels span.result').text(data.a.duels?'on':'off');
                    return console.log('[TastyPlug v' + version + '] Loaded TastyBot settings.');
                case 'settupdate':
                    if (typeof data.b == 'boolean') data.b = data.b ? 'on' : 'off';
                    else if (data.a == 'lottime') data.b = 60 - data.b;
                    return $('#tp-' + data.a + ' span.result').text(data.b);
                case 'cmderr':
                    return Chat('error', data.e);
                case 'afkwarning':
                    if (!settings.afkalert) return;
                    if (data.m) {
                        Chat('error', data.m);
                        chatSound();
                    }
                    else clearInterval(tos.afkalert);
                    if (data.n) tos.afkalert = setInterval(chatSound,4000);
                    break;
                case 'clientmsg':
                    return Chat('info', data.a);
                case 'pm':
                    settings.lastPM = data.user.username;
                    chatSound();
                    return ChatPM(data.user.username, data.m);
                case 'reload':
                    return commands.reset();
                default:
                    console.log('[TastyPlug v' + version + '] Unknown socket command');
            }
        };
        sock.onclose = function() {
            console.log('[TastyPlug v' + version + '] Disconnected from socket!');
            if (reconnect) tos.reconnect = setTimeout(function(){
                if (sock.readyState == 3) socket();
                if (reconint < 6) reconint++;
            },Math.pow(2,reconint)*1000);
        };
    }
    function startup() {
        loadSettings();
        loadUI();
        loadEvents();
        loadEmotes();
        if (location.pathname != '/tastycat') {
            $('#tp-roominfo').remove();
            $('#tp-afkalert').remove();
        } else {
            eta();
            tos.lottery = setInterval(function(){
                var lot = $('#tp-lotTime span.result'), num = +lot.text();
                --num;
                if (num < 0) num = 59;
                lot.text(num);
            },6E4);
        }
        if (settings.autowoot) woot();
        if (settings.autojoin) {
            afkCheck();
            if (!getLocked() && API.getWaitListPosition() == -1 && API.getDJ().id != API.getUser().id) API.djJoin();
        }
        var users = API.getUsers();
        for (var i = 0; i < users.length; i++) inRoom.push(users[i].id);
        socket();
        Chat('init', 'TastyPlug v' + version + ' now running!');
        console.log('[TastyPlug v' + version + '] Now running.');
    }
    function loadSettings() {
        var a = JSON.parse(localStorage.getItem('tastyPlugSettings'));
        if (a) {
            for (var i in settings) {
                if (typeof a[i] != 'undefined') {
                    if (a[i] !== null && a[i].isArray && settings[i] !== null && settings[i].isArray) settings[i] = a[i];
                    else if (typeof settings[i] == 'object' && settings[i] !== null) {
                        var j = undefined;
                        for (j in settings[i]) {
                            if (typeof a[i][j] != 'undefined') settings[i][j] = a[i][j];
                        }
                        if (typeof j == 'undefined') settings[i] = a[i];
                    } else settings[i] = a[i];
                }
            }
        }
    }
    function loadUI() {
        $('head').append('<style type="text/css" id="tastyplug-css">#tastyplug-ui{-moz-user-select:none;-webkit-user-select:none;position:absolute;width:150px;border-radius:10px;background-color:#1c1f25;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#1c1f25),color-stop(1,#282d33));background-image:-o-linear-gradient(top,#1c1f25 0,#282d33 100%);background-image:-moz-linear-gradient(top,#1c1f25 0,#282d33 100%);background-image:-webkit-linear-gradient(top,#1c1f25 0,#282d33 100%);background-image:-ms-linear-gradient(top,#1c1f25 0,#282d33 100%);background-image:linear-gradient(to top,#1c1f25 0,#282d33 100%);z-index:9;padding-bottom:1.5px;color:#DDD}#tastyplug-ui a{color:inherit;text-decoration:none}.tastyplug-icon{position:relative;float:right}#tastyplug-ui .tp-toggle{color:#f04f30}#tastyplug-ui .tp-toggle.button-on{color:#1cc7ed}#tp-title{margin:0 15px;padding:3px 0;color:#a874fc;font-size:19px;cursor:move}.tp-mainbutton,.tp-secbutton{margin:0 15px;padding:2px 0 3px;font-size:15px;border-top:1px solid rgba(56,60,68,.85);cursor:pointer}.tp-highlight{background-color:rgba(168,116,252,.33)}.tp-secbutton{padding-left:8px}.tp-infobutt{margin:0 15px;padding:1px 0 2px;font-size:12px;border-top:1px solid rgba(56,60,68,.85);cursor:default}.tp-infobutt span{font-weight:700}.tp-infobutt .result{font-weight:400}#tastyplug-ui .icon-drag-handle{position:relative;float:right;top:3px;height:14px;width:14px;background-position:-183px -113px}#waitlist-button .eta{position:relative;top:33px;left:81px;font-size:10px}#chat-messages .tastyplug-pm .icon{top:-1px;left:-3px}#chat-pm-button{left:-3px}#chat-messages .tastyplug-pm{border-left-style:solid;border-left-width:3px;border-color:#f59425;padding-left:25px}#chat-messages .tastyplug-pm .from{color:#f59425;font-weight:700}#user-lists .list.room .user .icon-meh{left:auto;right:8px;top:-1px}#chat-messages [data-cid|="3946454"] .icon{top:7px;left:6px;background-position:-145px -287px;width:18px;height:16px}#chat-messages [data-cid|="3946454"].mention .icon{left:3px}#chat-messages [data-cid|="3946454"]{background-color:#2d002d}#chat-messages .emote:nth-child(2n+1)[data-cid|="3946454"],#chat .mention:nth-child(2n+1)[data-cid|="3946454"],#chat .message:nth-child(2n+1)[data-cid|="3946454"]{background-color:#240024}#chat .emote[data-cid|="3946454"] .text,#chat .mention[data-cid|="3946454"] .text,#chat .message[data-cid|="3946454"] .text{font-weight:700;color:#cfcfcf}#chat .emote[data-cid|="3946454"] .text{font-style:normal}.tp-info{border-left:3px solid #1cc7ed}#chat .update.tp-info .text{color:#1cc7ed}#chat .update.tp-info .text span{color:#EEE}.tp-error{border-left:3px solid red}#chat .update.tp-error .text{color:red}.tp-init{border-left:3px solid #d1d119}#chat .update.tp-init .text{color:#d1d119}.tp-join-admin{border-left:3px solid #1cc7ed}#chat .update.tp-join-admin .text{color:#1cc7ed}.tp-join-ba{border-left:3px solid #088c30}#chat .update.tp-join-ba .text{color:#088c30}.tp-join-host{border-left:3px solid #d1d119}#chat .update.tp-join-host .text{color:#d1d119}.tp-join-cohost{border-left:3px solid #f59425}#chat .update.tp-join-cohost .text{color:#f59425}.tp-join-staff{border-left:3px solid #c322e3}#chat .update.tp-join-staff .text{color:#c322e3}.tp-join-friend{border-left:3px solid #009cdd}#chat .update.tp-join-friend .text{color:#009cdd}.tp-img.wide{width:280px;height:auto}.tp-img.high{height:350px;width:auto}.tp-img-delete{position:absolute;top:25px;left:8px;background-color:#f04f30;padding:0 3px;cursor:pointer}.tp-video-hide{height:0 !important}.custom-emote{display:inline-block;vertical-align:top}#tp-flist{position:absolute;top:54px;left:0;width:141px;height:522px;background:rgba(0,0,0,0.85);background:-moz-linear-gradient(left,rgba(0,0,0,0.85) 0,rgba(0,0,0,0.75) 100%);background:-webkit-gradient(left top,right top,color-stop(0,rgba(0,0,0,0.85)),color-stop(100%,rgba(0,0,0,0.75)));background:-webkit-linear-gradient(left,rgba(0,0,0,0.85) 0,rgba(0,0,0,0.75) 100%);background:-o-linear-gradient(left,rgba(0,0,0,0.85) 0,rgba(0,0,0,0.75) 100%);background:-ms-linear-gradient(left,rgba(0,0,0,0.85) 0,rgba(0,0,0,0.75) 100%);background:linear-gradient(to right,rgba(0,0,0,0.85) 0,rgba(0,0,0,0.75) 100%);overflow-y:auto;font-size:13px;padding-top:8px;padding-left:8px;color:#f04f30;z-index:2}#tp-fl-title{font-size:17px;color:#a874fc;margin-bottom:5px}#tp-flist .tp-online{color:#1cc7ed}.tp-fl-friend{cursor:pointer}</style>');
        $('body').append('<div id="tp-flist"><div id="tp-fl-title">Friends List</div></div><div id="tastyplug-ui"><div id="tp-title"> TastyPlug <img class="tastyplug-icon" src="https://fungustime.pw/tastyplug/tastyplug.png"></div><div class="tp-mainbutton tp-toggle button-on" id="tp-autowoot"><span>Autowoot</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-autojoin"><span>Autojoin</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-afkalert"><span>AFK Alert</span></div><div class="tp-mainbutton tp-toggle" id="tp-hidevideo"><span>Hide Video</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-boothalert"><span>Booth Alert</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-histalert"><span>History Alert</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-chatimgs"><span>Chat Images</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-emotes"><div class="icon icon-drag-handle"></div><span>Cust. Emotes</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-tastycat"><span>Tastycat</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-logos"><span>Logos</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-twitch"><span>Twitch.tv</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-userfaces"><span>User Faces</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-misc"><span>Misc. Emotes</span></div><div class="tp-secbutton tp-secemotes tp-toggle button-on" id="tp-gifs"><span>GIFs</span></div><a href="http://fungustime.pw/tastyplug/emotes" target="_blank"><div class="tp-secbutton tp-secemotes" id="tp-listemotes"><span>Emotes List</span></div></a><div class="tp-mainbutton tp-toggle button-on" id="tp-mentions"><div class="icon icon-drag-handle"></div><span>Chat Mentions</span></div><div class="tp-secbutton tp-secmention" id="tp-addmention"><span>Add</span></div><div class="tp-secbutton tp-secmention" id="tp-delmention"><span>Delete</span></div><div class="tp-secbutton tp-secmention" id="tp-listmention"><span>List</span></div><div class="tp-mainbutton tp-toggle button-on" id="tp-joinnotifs"><div class="icon icon-drag-handle"></div><span>Join Notifs.</span></div><div class="tp-secbutton tp-secjoin tp-toggle button-on" id="tp-joinranks"><span>Ranks</span></div><div class="tp-secbutton tp-secjoin tp-toggle button-on" id="tp-joinfriends"><span>Friends</span></div><div class="tp-mainbutton" id="tp-roominfo"><div class="icon icon-drag-handle"></div><span>Room Info</span></div><div class="tp-infobutt" id="tp-antiAfk"><span>AntiAFK: <span class="result">off</span></span></div><div class="tp-infobutt" id="tp-antiAfkLimit"><span>AFK Limit: <span class="result">0</span>m</span></div><div class="tp-infobutt" id="tp-lottery"><span>Lottery: <span class="result">off</span></span></div><div class="tp-infobutt" id="tp-lotTime"><span>Next Lottery: <span class="result">0</span>m</span></div><div class="tp-infobutt" id="tp-userCmds"><span>User Cmds.: <span class="result">off</span></span></div><div class="tp-infobutt" id="tp-duels"><span>Duels: <span class="result">off</span></span></div></div>');
        if (location.pathname == '/tastycat') $('#waitlist-button').append('<span class="eta" >ETA: N/A</span>');
        $('#chat-header').append('<div id="chat-pm-button" class="chat-header-button"><i class="icon icon-ignore"></i></div>');
        if (!settings.autowoot) $('#tp-autowoot').removeClass('button-on');
        if (!settings.autojoin) $('#tp-autojoin').removeClass('button-on');
        if (!settings.afkalert) $('#tp-afkalert').removeClass('button-on');
        if (!settings.boothalert) $('#tp-boothalert').removeClass('button-on');
        if (!settings.histalert) $('#tp-histalert').removeClass('button-on');
        if (!settings.chatimgs) $('#tp-chatimgs').removeClass('button-on');
        if (!settings.emotes) $('#tp-emotes').removeClass('button-on');
        if (!settings.twitch) $('#tp-twitch').removeClass('button-on');
        if (!settings.userfaces) $('#tp-userfaces').removeClass('button-on');
        if (!settings.tastycat) $('#tp-tastycat').removeClass('button-on');
        if (!settings.logos) $('#tp-logos').removeClass('button-on');
        if (!settings.misc) $('#tp-misc').removeClass('button-on');
        if (!settings.gifs) $('#tp-gifs').removeClass('button-on');
        if (!settings.chatmentions) $('#tp-mentions').removeClass('button-on');
        if (!settings.joinnotifs.toggle) $('#tp-joinnotifs').removeClass('button-on');
        if (!settings.joinnotifs.ranks) $('#tp-joinranks').removeClass('button-on');
        if (!settings.joinnotifs.friends) $('#tp-joinfriends').removeClass('button-on');
        if (!settings.show) {
            $('.tp-mainbutton').hide();
            $('#tastyplug-ui').css('padding-bottom','0');
        }
        if (getRank(API.getUser()) < 2) $('#tp-histalert').remove();
        $('.tp-secbutton,.tp-infobutt').hide();
        $('#tastyplug-ui').css(settings.uipos);
        for (var i in settings.friends) {
            $('#tp-flist').append('<div class="tp-fl-friend' + (API.getUser(i).username ? ' tp-online' : '') + '">' + settings.friends[i] + '</div>');
        }
        sortFriends();
    }
    function loadEvents() {
        API.on({
            'chat':eventChat,
            'userJoin':eventJoin,
            'userLeave':eventLeave,
            'waitListUpdate':eventWLUpd,
            'advance':eventDjAdv,
            'chatCommand':eventCommand
        });
        $(window).resize(resize);
        if (getRank(API.getUser()) >= 2) {
            API.on('voteUpdate',refreshMehs);
            $('#users-button:not(.selected)').click(refreshMehs);
        }
        //make it draggable
        var dragopts = {
            distance:20,
            handle:'#tp-title',
            snap:'#playback-container',
            snapMode:'outer',
            containment:'.room-background',
            scroll:false,
            start:function(){drag = true},
            stop:function(e,ui){
                drag = false;
                settings.uipos = ui.position;
                saveSettings();
            }
        };
        if ($.ui == undefined) {
            $.getScript('https://fungustime.pw/jquery-ui-1.10.4.custom.min.js',function(){
                $('#tastyplug-ui').draggable(dragopts);
            });
        } else $('#tastyplug-ui').draggable(dragopts);
        //quick reply to pm
        $('#chat-messages').on('click','.pm-from',function(){
            if ($('#chat-input-field').val()) return;
            var a = '/pm @' + $(this).text();
            $('#chat-input-field').val(a);
            $('#chat-input-field').focus();
        });
        //pm button
        $('#chat-pm-button i').click(function(){
            if (!$('.icon-mention-off').length) return Chat('error', 'Don\'t use this button while the mentions button is on! (Button to the left)');
            pms = !pms;
            $('#chat-pm-button i').attr('class',(pms ? 'icon icon-unignore' : 'icon icon-ignore'));
            $('#chat-messages').children().not('.tastyplug-pm').toggle();
            $('#chat-messages').scrollTop(20000);
        });
        //highlight ui buttons
        $('.tp-mainbutton,.tp-secbutton,.tp-infobutt').hover(
            function(){$(this).addClass('tp-highlight')},
            function(){$(this).removeClass('tp-highlight')}
        );
        //tp title
        $('#tp-title').mouseup(function(){
            if (!drag) {
                settings.show = !settings.show;
                if (!settings.show) {
                    $('#tastyplug-ui').css('padding-bottom','0');
                    $('.tp-mainbutton').css('border-top','0');
                    $('.tp-secbutton').css('border-top','0');
                }
                $('#tastyplug-ui .tp-mainbutton').slideToggle(function(){
                    if (settings.show) {
                        $('#tastyplug-ui').css('padding-bottom','');
                        $('.tp-mainbutton').css('border-top','');
                        $('.tp-secbutton').css('border-top','');
                    }
                });
                $('.tp-secbutton,.tp-infobutt').slideUp();
                saveSettings();
            }
        });
        //tp autowoot
        $('#tp-autowoot').click(function(){
            settings.autowoot = !settings.autowoot;
            $(this).toggleClass('button-on');
            if (settings.autowoot) woot();
            saveSettings();
        });
        //autojoin
        $('#tp-autojoin').click(function(){
            settings.autojoin = !settings.autojoin;
            $(this).toggleClass('button-on');
            if (settings.autojoin && !getLocked() && API.getWaitListPosition() == -1) API.djJoin();
            afkCheck();
            saveSettings();
        });
        //afk alert
        $('#tp-afkalert').click(function(){
            settings.afkalert = !settings.afkalert;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //hide video
        $('#tp-hidevideo').click(function(){
            hidevideo = !hidevideo;
            $('#playback-container').toggleClass('tp-video-hide');
            $('#playback').toggleClass('tp-video-hide');
            $('.background').toggle();
            $(this).toggleClass('button-on');
        });
        //booth alert
        $('#tp-boothalert').click(function(){
            settings.boothalert = !settings.boothalert;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //history alert
        $('#tp-histalert').click(function(){
            settings.histalert = !settings.histalert;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //chat images
        $('#tp-chatimgs').click(function(){
            settings.chatimgs = !settings.chatimgs;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        //custom emotes
        $('#tp-emotes span').click(function(){
            settings.emotes = !settings.emotes;
            $(this).parent().toggleClass('button-on');
            saveSettings();
        });
        $('#tp-tastycat').click(function(){
            settings.tastycat = !settings.tastycat;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-logos').click(function(){
            settings.logos = !settings.logos;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-twitch').click(function(){
            settings.twitch = !settings.twitch;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-userfaces').click(function(){
            settings.userfaces = !settings.userfaces;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-misc').click(function(){
            settings.misc = !settings.misc;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-gifs').click(function(){
            settings.gifs = !settings.gifs;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-emotes .icon-drag-handle').click(function(){
            $('.tp-secemotes').slideToggle();
        });
        //chat mentions
        $('#tp-mentions span').click(function(){
            settings.chatmentions = !settings.chatmentions;
            $(this).parent().toggleClass('button-on');
            saveSettings();
        });
        $('#tp-addmention').click(function(){
            var len = settings.msgs.length;
            var a = prompt('Add words to the chat mentions list! Separate them with a comma.').trim().split(',');
            if (!a) return Chat('error', 'Please enter at least one word!');
            for (var i = 0; i < a.length; i++) {
                a[i] = a[i].trim().toLowerCase();
                if (a[i].length < 3) Chat('error', 'Did not add: ' + _.escape(a[i]) + ' (too short)');
                else if (settings.msgs.indexOf(a[i]) > -1) Chat('error', 'Did not add: ' + _.escape(a[i]) + ' (already on list)');
                else settings.msgs.push(a[i]);
            }
            if (settings.msgs.length > len) {
                Chat('info', 'Added word(s) to chat mentions list');
                saveSettings();
            }
        });
        $('#tp-delmention').click(function(){
            var a = prompt('Which word would you like to remove from the mentions list?');
            if (settings.msgs.indexOf(a) > -1) {
                settings.msgs.splice(settings.msgs.indexOf(a),1);
                Chat('info', 'Removed "' + _.escape(a) + '" from the chat mentions list');
                saveSettings();
            } else Chat('error', 'That word isn\'t in the mentions list!');
        });
        $('#tp-listmention').click(function(){
            var a = settings.msgs;
            for (var i = 0; i < a.length; i++) a[i] = _.escape(a[i]);
            if (a.length) return Chat('info', 'Chat mentions list:<br>' + a.join('<br>'));
            return Chat('error', 'You don\'t have anything in your chat mentions list!');
        });
        $('#tp-mentions .icon-drag-handle').click(function(){
            $('.tp-secmention').slideToggle();
        });
        //join notifs
        $('#tp-joinnotifs span').click(function(){
            settings.joinnotifs.toggle = !settings.joinnotifs.toggle;
            $(this).parent().toggleClass('button-on');
            saveSettings();
        });
        $('#tp-joinranks').click(function(){
            settings.joinnotifs.ranks = !settings.joinnotifs.ranks;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-joinfriends').click(function(){
            settings.joinnotifs.friends = !settings.joinnotifs.friends;
            $(this).toggleClass('button-on');
            saveSettings();
        });
        $('#tp-joinnotifs .icon-drag-handle').click(function(){
            $('.tp-secjoin').slideToggle();
        });
        //room info
        $('#tp-roominfo').click(function(){
            $('.tp-infobutt').slideToggle();
        });
        //friendlist
        $('#tp-fl-title').click(function(){
            var h = $(this).parent().height() == 28;
            if (h) {
                $('.tp-fl-friend').slideDown();
                $('#tp-flist').animate({height:'522px'});
            } else {
                $('.tp-fl-friend').slideUp();
                $('#tp-flist').animate({height:'28px'});
            }
        });
        $('.tp-fl-friend').click(function(){
            $('#chat-input-field').val($('#chat-input-field').val() + '@' + $(this).text() + ' ');
            $('#chat-input-field').focus();
        });
    }
    function loadEmotes() {
        $.ajax({
            cache: false,
            url: "https://fungustime.pw/tastyplug/emotes/json/emotes.json",
            dataType: "json",
            success: function(a){emotes=a},
            error: function(){Chat('error','Could not load custom emotes. Refresh and/or try again later.')}
        });
    }
    tastyPlugShutDown = function() {
        API.off({
            'chat':eventChat,
            'userJoin':eventJoin,
            'userLeave':eventLeave,
            'waitListUpdate':eventWLUpd,
            'advance':eventDjAdv,
            'chatCommand':eventCommand,
            'voteUpdate':refreshMehs
        });
        $(window).off('resize',resize);
        $('#users-button').off('click',refreshMehs);
        $('#chat-messages .pm-from').off('click');
        $('.tp-img-delete').off('click');
        $('#chat-messages .message,#chat-messages .mention,#chat-messages .emote').has('img').off('mouseenter mouseleave');
        $('#chat-pm-button').remove();
        $('#waitlist-button').find('.eta').remove();
        $('#playback-container').removeClass('tp-video-hide');
        $('.background').show();
        $('#playback').removeClass('tp-video-hide');
        $('#tastyplug-ui').remove();
        $('#tastyplug-css').remove();
        $('#tp-flist').remove();
        $('#chat-popout-button').show();
        reconnect = false;
        for (var i in tos) clearInterval(tos[i]);
        saveSettings();
        if (sock) sock.close();
        console.log('[TastyPlug v' + version + '] Shut down.');
    };
    function eventChat(a) {
        if (!a.cid) return;
        var msg = $('#chat-messages').children('[data-cid="' + a.cid + '"]');
        if (pms && !msg.hasClass('.tastyplug-pm')) msg.hide();
        if (settings.emotes) custEmotes(msg.find('.text'));
        if (settings.chatimgs) {
            var txt = msg.find('.text'), txts = txt.text().trim().split(' ');
            for (var i = 0; i < txts.length; i++) if (/.(gif|png|jpg)/i.test(txts[i]) && /^https?:\/\//.test(txts[i])) return checkImg(txts[i],txt);
        }
        var b = document.createElement('div');
        b.innerHTML = a.message;
        var message = b.textContent.replace(/  +/g, ' ').trim();
        if (a.uid == API.getUser().id) {
            afktime = Date.now();
            clearInterval(tos.afkalert);
            if (API.getUser().status == 1) API.setStatus(0);
            if (!message.toLowerCase().indexOf('!afk')) API.setStatus(1);
        }
        if (!settings.chatmentions || a.uid == API.getUser().id) return;
        b = message.toLowerCase().split(' ');
        for (var i = 0; i < settings.msgs.length; i++) {
            if (b.indexOf(settings.msgs[i]) > -1) return chatSound();
        }
    }
    function eventJoin(a) {
        if (inRoom.indexOf(a.id) == -1) {
            if (!settings.joinnotifs.toggle || !a.username || (!settings.joinnotifs.ranks && !settings.joinnotifs.friends)) return;
            var b, rank = getRank(a);
            if (rank) switch (rank) {
                case 10: b = 'admin'; break;
                case 8: b = 'ba'; break;
                case 5: b = 'host'; break;
                case 4: b = 'cohost'; break;
                case 3:case 2:case 1: b = 'staff'; break;
                default: b = 'undef'; break;
            }
            else if (settings.joinnotifs.friends && settings.friends[a.id]) b = 'friend';
            if (b) Chat('join-' + b, _.escape(a.username) + ' joined the room');
            if (a.id in settings.friends) {
                $('.tp-fl-friend').filter(function(){return $(this).text() == a.username}).addClass('tp-online');
                sortFriends();
            }
            var users = API.getUsers();
            inRoom.length = 0;
            for (var i = 0; i < users.length; i++) inRoom.push(users[i].id);
        }
    }
    function eventLeave(a) {
        if (a.id in settings.friends) {
            $('.tp-fl-friend.tp-online').filter(function(){return $(this).text() == a.username}).removeClass('tp-online');
            sortFriends();
        }
        var users = API.getUsers();
        inRoom.length = 0;
        for (var i = 0; i < users.length; i++) inRoom.push(users[i].id);
    }
    function eventWLUpd() {
        if (settings.autojoin && !getLocked() && API.getWaitListPosition() == -1) join();
        if (settings.boothalert && API.getWaitListPosition() < 3 && API.getWaitListPosition() != -1 && !boothcd) {
            chatSound();
            Chat('info','[Booth Alert] It\'s almost your turn to DJ! Make sure to pick a song!');
            boothcd = true;
        }
    }
    function eventDjAdv(a) {
        if (settings.autojoin && !getLocked() && API.getWaitListPosition() == -1) join();
        if (settings.autowoot) setTimeout(woot,(Math.floor(Math.random()*10)+1)*1000);
        if (hidevideo) $('#tp-hidevideo').click();
        if (!a.dj) return;
        if (a.dj.id == API.getUser().id) boothcd = false;
        if (settings.histalert && getRank(API.getUser()) >= 2 && a.media) {
            var hist = API.getHistory();
            for (var i = 0; i < hist.length; i++) {
                if (hist[i].media.cid == a.media.cid) {
                    chatSound();
                    Chat('error','This song is on the history! (played ' + (i + 1) + ' song' + (i == 0 ? '' : 's') + ' ago)');
                    break;
                }
            }
        }
    }
    function eventCommand(a) {
        var cmd = a.trim().substr(1).split(' ')[0].toLowerCase();
        if (cmd == 'afk' || cmd == 'away') API.setStatus(1);
        else if (cmd == 'work' || cmd == 'working') API.setStatus(2);
        else if (cmd == 'gaming' || cmd == 'game' || cmd == 'ingame') API.setStatus(3);
        var data = {
            uid: API.getUser().id,
            un: API.getUser().username,
            message: a.trim(),
            room: location.pathname
        }, a;
        if (commands[cmd]) a = commands[cmd](data);
        else if (location.pathname == '/tastycat' && sock.readyState == 1) {
            sock.msg({z:'command',a:data});
            a = true;
        }
        if (a) {
            cd = true;
            setTimeout(function(){cd = false},2E3);
        }
    }
    function refreshMehs() {
        if ($('#users-button').hasClass('selected') && $('.button.room').hasClass('selected')) {
            $('#user-lists .list.room i.icon.icon-meh').remove();
            var users = $(API.getUsers()).filter(function(){return this.vote == -1 && !this.curated;});
            users.each(function(i){
                $('#user-lists .list.room .user span').filter(function(){return $(this).text()==users[i].username;}).parent().append('<i class="icon icon-meh"></i>');
            });
        }
    }
    commands.lock = function() {
        if (getRank(API.getUser()) < 3) return;
        API.moderateLockWaitList(true);
    };
    commands.unlock = function() {
        if (getRank(API.getUser()) < 3) return;
        API.moderateLockWaitList(false);
    };
    commands.cycle = function() {
        if (getRank(API.getUser()) < 3) return;
        $('.cycle-toggle').click();
    };
    commands.ban = function(a) {
        if (getRank(API.getUser()) < 3) return;
        var user = getUser(a.message.substr(a.message.indexOf('@')+1));
        if (!user) return Chat('error', 'User not found.');
        if (getRank(API.getUser()) <= getRank(user)) return Chat('error', 'You can\'t ban people who are of equal or higher rank as you!');
        API.moderateBanUser(user.id,0,API.BAN.PERMA);
    };
    commands.kick = function(a) {
        if (getRank(API.getUser()) < 2) return;
        var msg = a.message.split(' '), user, dur;
        if (msg[msg.length-1] != 'day' && msg[msg.length-1] != 'hour') {
            user = getUser(a.message.substr(a.message.indexOf('@')+1));
            dur = API.BAN.HOUR;
        } else {
            user = getUser(msg.slice(1,msg.length-1).join(' ').substr(1));
            dur = msg[msg.length-1] == 'day' ? API.BAN.DAY : API.BAN.HOUR;
        }
        if (!user) return Chat('error', 'User not found.');
        if (getRank(API.getUser()) <= getRank(user)) return Chat('error', 'You can\'t kick people who are of equal or higher rank as you!');
        API.moderateBanUser(user.id,0,dur);
    };
    commands.skip = function() {
        if (getRank(API.getUser()) < 2) return;
        API.moderateForceSkip();
    };
    commands.pm = function(a) {
        if (cd) return Chat('error', 'PMs have a 2 second slow-mode!');
        if (sock.readyState != 1) return Chat('error', 'Not connected to TastyPlug\'s server!');
        if (a.message.split(' ').length == 1) return Chat('info', 'Usage: /pm @user message<br>Sends a private message to the user if they are using Tastyplug and you are each other\'s fans');
        var str = a.message.split(' '), msg = str.slice(2).join(' '), user = getUser(str[1].substr(1));
        if (!user) return Chat('error', 'User not found.');
        if (user.id == API.getUser().id) return Chat('error', 'You can\'t PM yourself!');
        if (!msg) return Chat('error', 'Please input a message to send!');
        sock.msg({z:'pm',m:msg,f:API.getUser(),t:user})
        ChatPM('To: ' + user.username,msg);
        return true;
    };
    commands.r = function(a) {
        if (settings.lastPM) eventCommand('/pm @' + settings.lastPM + ' ' + a.message.split(' ').slice(1).join(' '));
        else Chat('error', 'Nobody has PMed you yet!');
    };
    commands.opcheck = function(a) {
        if (cd) return Chat('error', '/opcheck has a 2 second slow-mode!');
        if (location.pathname != '/tastycat') return;
        if (sock.readyState != 1) return Chat('error', 'Not connected to TastyPlug\'s server!');
        var b = API.getNextMedia().media;
        sock.msg({z:'songcheck',id:b.format+':'+b.cid,song:'Next on your playlist',author:b.author,title:b.title});
        return true;
    };
    commands.reset = function() {
        Chat('init', 'Reloading...');
        setTimeout(function(){$.getScript('https://fungustime.pw/tastyplug/tastyplug.js')},1000);
    };
    commands.commands = function() {
        if (location.pathname == '/tastycat') Chat('info', 'TastyBot commands: <a href="https://fungustime.pw/tastybot" target="_blank">Click Here</a>');
        Chat('info', 'TastyPlug commands: ' + Object.keys(commands).join(', '));
    };
    commands.whois = function(a) {
        var user = getUser(a.message.split(' ').slice(1).join(' ').substr(1)), rank;
        if (!user) return Chat('error','User not found.');
        var pos = API.getWaitListPosition(user.id);
        switch (getRank(user)) {
            case 10: rank = 'plug.dj Admin'; break;
            case 8: rank = 'Brand Ambassador'; break;
            case 5: rank = 'Host'; break;
            case 4: rank = 'Co-Host'; break;
            case 3: rank = 'Manager'; break;
            case 2: rank = 'Bouncer'; break;
            case 1: rank = 'Resident DJ'; break;
            case 0: rank = 'User'; break;
            default: rank = 'Unknown';
        }
        if (API.getDJ().id == user.id) pos = 'Currently DJing';
        else if (pos == -1) pos = 'Not on list';
        else pos++;
        Chat('info','Username: <span>' + user.username + '</span><br>ID: <span>' + user.id + 
            '</span><br>Rank: <span>' + rank + '</span><br>Level: <span>' + user.level + '</span><br>Wait List: <span>' + pos + '</span>');
    };
    commands.link = function() {
        var b = API.getMedia();
        if (b.format == '1') Chat('info', 'Current song: <a href="http://youtu.be/' + b.cid + '" target="_blank">Click Here</a>');
        else SC.get('/tracks/' + b.cid, function(c) {
            Chat('info', 'Current song: ' + (c.permalink_url ? ('<a href="' + c.permalink_url + '" target="_blank">Click Here') : 'Link not found'));
        });
    };
    commands.addfriend = function(a) {
        var user = getUser(a.message.split(' ').slice(1).join(' ').substr(1));
        if (!user) return Chat('error', 'User not found.');
        if (user.id in settings.friends) return Chat('error', user.username + ' is already on your Friends list!');
        if (user.id == API.getUser().id) return Chat('error', 'You can\'t add yourself to your Friends list!');
        settings.friends[user.id] = user.username;
        $('#tp-flist').append('<div class="tp-fl-friend tp-online">' + user.username + '</div>');
        sortFriends();
        Chat('info', 'Added ' + user.username + ' to your Friends list.');
        saveSettings();
    };
    commands.removefriend = function(a) {
        var user = a.message.split(' ').slice(1).join(' ').substr(1).toLowerCase();
        for (var i in settings.friends) {
            if (settings.friends[i].toLowerCase() == user) {
                Chat('info', 'Removed ' + user + ' from your Friends list.');
                delete settings.friends[i];
                var friends = $('.tp-fl-friend');
                for (var i = 0; i < friends.length; i++) {
                    if (friends[i].innerText.toLowerCase() == user) {
                        $(friends[i]).remove();
                        sortFriends();
                        break;
                    }
                }
                return saveSettings();
            }
        }
        Chat('error', user + ' isn\'t on your Friends list.');
    };
    commands.uireset = function() {
        settings.uipos = {'top':'54px','left':'0'};
        $('#tastyplug-ui').css(settings.uipos);
        saveSettings();
        Chat('info', 'UI position reset');
    };
    commands.hidden = function() {
        settings.hidden = !settings.hidden;
        saveSettings();
        Chat('info', 'Hidden emotes ' + (settings.hidden ? 'enabled!' : 'disabled!'));
    };
    commands.fullscreen = function() {
        $('#playback').css('left','0px');
        $('#playback-container').width($('.app-right').position().left);
        $('#playback-container').height($('.app-right').height());
        $('#vote').hide();
        $('#dj-button').hide();
        $('#avatars-container').hide();
        Chat('info','Video now fullscreen! Refresh to get rid of it. (Temporary; will have button later)');
    };
    function Chat(type, m) {
        if ($('#chat-button').css('display') == 'block') {
            var chat = $('#chat-messages'), a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
            chat.append('<div class="update tp-' + type + '"><span class="text">' + m + '</span></div>');
            if (a) chat.scrollTop(chat[0].scrollHeight);
            if (chat.children().length >= 512) chat.children().first().remove();
        } else API.chatLog(m.replace(/<br>/g,', '),true);
    }
    function ChatPM(user, msg) {
        if ($('#chat-button').css('display') == 'block') {
            var chat = $('#chat-messages'), a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28,
            c = !user.indexOf('To: ') ? '-to' : '-from clickable',
            d = $('#chat-timestamp-button .icon').attr('class').substr(21),
            e = d == 'off' ? 'none' : 'block',
            f = new Date().toTimeString().substr(0,5), j = false,
            k = !user.indexOf('To: ') ? ' message' : ' mention';
            if (d == '12') {
                var g = parseInt(f),
                    h = g >= 12 ? 'pm' : 'am',
                    i = g%12 == 0 ? '12' : g%12;
                f = i + f.substr(2) + h;
            }
            if (f.charAt(0) == '0') f = f.substr(1);
            msg = urlFix(_.escape(msg));
            if (!msg.indexOf('&#x2F;me')) { msg = msg.replace('&#x2F;me','<em>'); j = true; }
            else if (!msg.indexOf('&#x2F;em')) { msg = msg.replace('&#x2F;em','<em>'); j = true; }
            j = j ? '' : '&nbsp;';
            chat.append('<div class="tastyplug-pm' + k + '"><i class="icon icon-ignored"></i><div class="timestamp" style="display:' + e + '">' + f + '</div><span class="from pm' + c + '">' + user + ' </span><span class="text">' + j + msg + '</span></div>');
            if (a) chat.scrollTop(chat[0].scrollHeight);
            if (chat.children().length >= 512) chat.children().first().remove();
        } else API.chatLog('[PM] ' + user + ': ' + msg);
    }
    function eta() {
        tos.eta = setInterval(function(){
            var pos = API.getWaitListPosition(), str = 'ETA: ';
            str += pos == -1 ? 'N/A' : getTime(pos*1000*60*(25/6) + API.getTimeRemaining()*1000);
            $('#waitlist-button').find('.eta').text(str);
        },10000);
    }
    function resize() {
        var room = $('.room-background'), rpos = room.position(), rwidth = room.width(), rheight = room.height(),
            ui = $('#tastyplug-ui'), uipos = ui.position(), uiwidth = ui.width(), uiheight = ui.height(), a = Object.keys(rpos);
        for (var i = 0; i < a.length; i++) if (uipos[a[i]] < rpos[a[i]]) ui.css({i:rpos[a[i]]});
        if (uiwidth + uipos.left > rwidth) ui.css({'left':rwidth-uiwidth});
        if (uiheight + uipos.top > rheight) ui.css({'top':rheight-uiheight});
        settings.uipos = ui.position();
        saveSettings();
    }
    function getUser(a) {
        a = a.trim();
        var b = API.getUsers();
        for (var i = 0; i < b.length; i++) if (b[i].username == a) return b[i];
        return null;
    }
    function getTime(a) {
        a = Math.floor(a/60000);
        var minutes = (a-Math.floor(a/60)*60);
        var hours = (a-minutes)/60;
        var str = '';
        str += hours + 'h';
        str += minutes<10?'0':'';
        str += minutes;
        return str;
    }
    function getRank(a) {
        if (a.gRole) switch (a.gRole) {
            case 5: return 10;
            case 4:case 3:case 2: return 8;
            default:return 6;
        }
        return a.role;
    }
    function urlFix(a) {
        if (a.indexOf('http') == -1) return a;
        a = a.split(' ');
        for (var i = 0; i < a.length; i++) if (!a[i].indexOf('http')) a[i] = '<a href="' + a[i] + '" target="_blank">' + a[i] + '</a>';
        return a.join(' ');
    }
    function afkCheck() {
        if (settings.autojoin) tos.afkInt = setInterval(function(){
            if (Date.now() - afktime >= 12E10) {
                settings.autojoin = false;
                $('#tp-autojoin').removeClass('button-on');
                clearInterval(tos.afkInt);
            }
        },6E4);
        else clearInterval(tos.afkInt);
    }
    function checkImg(a,b) {
        var img = new Image();
        img.onload =  function() {
            img.className += 'tp-img';
            if (img.height > 350 && 280*img.height/img.width > 350) return;
            if (img.width > 280) img.className += ' wide';
            else if (img.height > 350) img.className += ' high';
            var c = b.html().replace('<a href="' + a + '" target="_blank">' + a + '</a>', '<br><a href="' + a + '" target="_blank">' + img.outerHTML + '</div></a>');
            b.parent().append('<div class="tp-img-delete" style="display:none">X</div>');
            b.parent().hover(
                function(){$(this).find('.tp-img-delete').css('display','block')},
                function(){$(this).find('.tp-img-delete').css('display','none')}
            );
            b.parent().find('.tp-img-delete').click(function(){
                var a = $(this).parent().find('img')[0].src;
                $(this).parent().find('br').remove();
                $(this).parent().find('img').parent().append(a).find('img').remove();
                $(this).remove();
            });
            var chat = $('#chat-messages'), d = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
            b.html(c);
            if (d) chat.scrollTop(chat[0].scrollHeight);
        };
        img.src = a;
    }
    function custEmotes(a) {
        if (!emotes) return;
        var b = a.html();
        if (typeof b != 'string') return;
        var c = b.toLowerCase(), chat = $('#chat-messages'), d = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
        for (var i in emotes) {
            if (settings[i]) {
                for (var j in emotes[i]) {
                    if (emotes[i][j].hidden && !settings.hidden) continue;
                    var k = ':' + j.toLowerCase() + ':';
                    if (c.indexOf(k) > -1) b = b.replace(new RegExp(k,'gi'),'<div class="custom-emote" title="' + (emotes[i][j].hidden ? 'Hidden Emote!' : (':' + j + ':')) + '" style="background-image:url(' + emotes[i][j].url + ');width:' + emotes[i][j].width + ';height:' + emotes[i][j].height + ';"></div>');
                }
            }
        }
        a.html(b);
        if (d) chat.scrollTop(chat[0].scrollHeight);
    }
    function sortFriends() {
        var a = $('.tp-fl-friend').sort(function(a,b){
            if (a.className == b.className) {
                return ($(a).text().toLowerCase() > $(b).text().toLowerCase() ? 1 : -1);
            } else return (a.className < b.className ? 1 : -1);
        });
        $('#tp-flist').append(a);
    }
    function join() {
        if (!joincd) {
            API.djJoin();
            joincd = true
            setTimeout(function(){joincd = false},5000);
        }
    }
    function saveSettings(){localStorage.setItem('tastyPlugSettings',JSON.stringify(settings))}
    function getLocked(){return $('.lock-toggle .icon').hasClass('icon-locked')}
    function chatSound(){document.getElementById('chat-sound').playChatSound()}
    function woot(){$('#woot').click()}
    var z = function() {
        if (typeof API === 'undefined') setTimeout(z,200);
        else startup();
    };
    z();
})();
