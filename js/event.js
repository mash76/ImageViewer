// 子レコードでも起きる aかimgか
$(document).on('focusin', function(e) {
    console.log('focus')

    if ($(e.target).attr('inode')) {
        console.log('inode mouseover') 
        focusImage($(e.target).attr('inode'))
    }
});

// サムネイルマウスオーバーで追加
$(document).on('mouseover', function(e) {

    //console.log('mouseover ' ,$(e.target).attr('inode'),e.target) 
    
    if ($(e.target).attr('inode')) {
        console.log('inode mouseover ',$(e.target).attr('inode') ) 
        
        //マウス左押していたら 次々追加
        console.log('mouse buttons' , e.buttons)
        if (e.buttons == 1){
            setSelection('add', [ $(e.target).attr('inode') ] )
            setOver([null])
        }else{
            setOver([ $(e.target).attr('inode') ] )          
        }
        focusImage($(e.target).attr('inode'))
    }

});



// 検索窓のキーアップで検索開始
$("#filter_bookmark").keyup((e) =>{ 
    console.log('#filter_bookmark keyup')
    if (e.which == 13) filterSqlite($('#filter_bookmark').val());
})

//inode項目にマウスダウンしたら、選択クリアして選択開始
$(document).on('mousedown', function(e) {

    


});



//ショートカット
$(document).on('keydown', function(e) {

    console.log("key metakey shiftkey ctrlkey", e.which, e.metaKey, e.shiftKey, e.ctrlKey )

    // 0-5キーでレート 48-53
    if ( 48 <= e.which && e.which <= 53 ) {  //   up    
        console.log('press 0-5 ' + (e.which -48))
        rateImages( (e.which -48) , _G.thumb_over)
    }

    if (e.which ==38 && !e.metaKey) {  //   up

    }
    if (e.which == 37 && !e.metaKey) {  //  left  小フォルダに移動

    }

    //メインプロセス通信
    if (e.metaKey && e.key == "9") toggleFullScreen(); // com 9
    if (e.metaKey && e.key == "d") toggleDevTools(); // com D

    //最小化とぶつかる
    // if (e.which ==72 && e.metaKey) {  // com H
    //    goDir(userhome_path)
    // }
   //  if (e.which ==78 && e.metaKey) {  // com N
    //   toggleNew('toggle')
   //  }
   //  if (e.which ==69 && e.metaKey) {  // com E  エディタで編集
   //    var filename = $('#file_name').text()
   //    if (filename) osRun('open -t ' + filename)
   //  }
   //  if (e.which ==70 && e.metaKey) {  // com F   
     //  toggleFindgrep('toggle')
    // }
   //  if (e.which ==27) {  // esc いろいろ開いてるもの閉じる
   //    console.log('esc');
   //    toggleBookmarkList('down','')
   //    toggleFindgrep('up')
   //    $('#mainwin').hide()
   //  }
})
