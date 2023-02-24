// ==UserScript==
// @name         Pornbub显示下载按钮
// @namespace    http://tampermonkey.net/
// @version      0.183
// @description  同时支持手机小屏和PC大屏
// @author       Lukezh
// @match        https://*.pornhub.com/view_video.php*
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let v=window['flashvars_' + $('video-element').attr('unique-id').split('_')[1]];
    let vArr = v.mediaDefinitions;
    let videoUrlZ = null;
    for (let i = 0; i < vArr.length; i++) {
        if(vArr[i].remote){
            videoUrlZ = vArr[i].videoUrl;
        }
    }
    let urlInfo = [];
    if(videoUrlZ) {
        $.ajax({
          url: videoUrlZ,
          async: false,
          success: (data) => {
            if(data && data.length) {
              urlInfo = urlInfo.concat(data.map(item => ({
                quality: item.quality + '.' + item.format,
                url: item.videoUrl
              })));
            }
          }
        });
    }
    let tv='<div id="downloadbox" style="">';
    for (let i = urlInfo.length - 1; i >=0 ; i--) {
        tv+=`<a href="${urlInfo[i].url}"><i class="fa fa-cloud-download" aria-hidden="true"></i>${urlInfo[i].quality.split(".")[0]}P</a>`
    }
    tv+='</div>';
    $('.playerWrapper').append(tv);
    $('.video-actions-tabs').prepend(tv);
    $('#downloadbox').css({
        'background-color':'#141414',
        'padding':'15px'
    });
    $('#downloadbox a').css({
        '-webkit-border-radius': '2px',
        'background': '#FF9100',
        'color': '#FFF',
        'display': 'inline-block',
        'margin': '2% 1%',
        'padding': '5px 0',
        'text-align': 'center',
        'width': '47%'
    });
    $('.video-actions-tabs>#downloadbox a').css({
        'padding': '10px 0',
        'width': '23%'
    });
})();
