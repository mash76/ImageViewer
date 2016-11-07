


//マウスオーバー中の仮選択
setOver = function(inode){
	_G.thumb_over = inode
  	$('#thumb_over').html(  _G.thumb_over );
}

//押下中のマウスオーバーか、shift押しながら追加したときに
setSelection = function(mode,inode_ary ){

  if (mode != 'add' && mode != 'remove' && mode != 'set'  ) {
      alert('mode =' +mode + 'not add/remove/set ' ) 
  }
  console.log('setSelection / mode inode_ary / ' , mode , typeof inode_ary, inode_ary  )


  if (mode == 'add') {
      _G.thumb_selects = _G.thumb_selects.concat(inode_ary)   
  }
  if (mode == 'set') {
      _G.thumb_selects = inode_ary   
  }
  if (mode == 'remove') {
      _G.thumb_selects.push(inode_ary)   
  }  

  //クリアするときは set で[] 渡す

  $('#thumb_selects').html( sRed(_G.thumb_selects.length) + ' ' + _G.thumb_selects.join(' ') );

}

rateImages = function(rate , inode_ary){

	for (var ind in inode_ary){
        var sql = "UPDATE images set rate=" + rate + " where inode =" + inode_ary[ind]
        console.log(sql)
        var stmt = db.prepare(sql)
        stmt.run()
        stmt.finalize();  


	}




}

focusImage = function(inode) {
    console.log('replace image')
    getRowFromInode(inode,function(imagerecord){
        $('#preview').attr('src',imagerecord.path)
        $('#preview_metadata').html(
            imagerecord.rate + '<br/>' +
            imagerecord.memo + '<br/>' 

        )
    })
}



// サムネイル生成 ---------  xyを作ってから　recordに inode path width height 必要
createThumb = function(record,cb){
    console.log( 'createThumb' );

    //サムネイルなければ生成 同じ拡張子で
    var shell = "convert -resize 180x120 '" + record.path + "' " + _G.thumb_dir + '/' + record.inode + path.extname(record.path)
    osRunCbParam(shell, { inode:record.inode, x:record.width, y:record.height, ext:record.ext, start:new Date()}, function(ret_ary,param){  //cb(ret_ary,cb_param,stderr,command)
        console.log( 'osRunCbParam convert ')
    
        var thumb_path = _G.thumb_dir + "/" + param.inode + param.ext
        console.log(thumb_path)
        var stat = fs.statSync(thumb_path)
        var sql = "UPDATE images set thumb_size=" + stat.size + " ,thumb_time=" + (new Date().getTime() - param.start.getTime()) + " ,wh_time=" + (new Date() - param.start) + " where inode =" + param.inode
        var stmt = db.prepare(sql)
        stmt.run()
        stmt.finalize();  

        if (typeof cb == "function") cb()
    })
}


createThumbnails = function(){
    console.log( 'createThumbnail' );
    //sqlite読み出し
    db.each("SELECT * FROM images", function (err, row) {
        createThumb(row)
    })
}
