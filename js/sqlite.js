getRowFromInode = function(inode,cb){
    var sql = "SELECT * FROM images where inode =" + inode
    db.all(sql, function (err, rows) {
        if (rows.count ==0 ) alert('no image on sqlite for inode ' + inode)
        cb(rows[0])
    });    
}

getInodesFromTable = function( cb){
    var sql = "SELECT * FROM images "
    db.all(sql, function (err, rows) {
    	for (var ind in rows){
			_G.db_inodes.push(rows[ind].inode)
			_G.db_rates[rows[ind].rate]++
    	}

    	// 
    	$('#rates_stat').html('')
       	for (var ind in _G.db_rates){ 	
       		$('#rates_stat').append(ind + ' ' + _G.db_rates[ind] + ' ' )
       	}
    })

    if (typeof cb == "function") cb()    
}

filterSqlite = function(filter){

    if (filter == undefined || filter == null ) alert('filter ' + filter)

    $('#result_sqlite').html('')

    var sql = "SELECT '' thumb ,images.* FROM images "
    var where_ary = []
    var filter_ary = filter.trim().split(/\s+/)
    var ret = ""
    for (var ind5 in filter_ary ){
        if (filter_ary[ind5]) where_ary.push(" filename like '%" + filter_ary[ind5] + "%' ")
    }
    if (where_ary.length > 0) sql += ' where ' + where_ary.join(' and ')

    var start = new Date().getTime()
    db.all(sql, function (err, rows) {
        //sqlと所要時間表示
        $('#sqlite_sql').html(sSilver(sql) + ' ' + sGray(((new Date().getTime() - start)/1000) + 's ' + sRed(rows.length)))
      
        //検索結果のsqlを表示 
        if (rows.length > 0) {
            
            // sqliteのテーブルをダンプ表示
            for (var ind in rows){
                var thumb_path = _G.thumb_dir + '/' + rows[ind].inode + rows[ind].ext
                rows[ind].thumb = '<img height="30" src="' + thumb_path + '">' 
            }
            $('#result_sqlite').append(ary2html( recordsMatchRed(rows, filter), 'title'))

            //サムネイル一覧を表示
            for (var ind in rows){
                var thumb_path = _G.thumb_dir + '/' + rows[ind].inode + rows[ind].ext
                var imgtag = '<img type="thumb" height="50" width="50 inode="' + rows[ind].inode + '" src="' + thumb_path + '">'
                var withlink = '<a inode="' + rows[ind].inode + '" href="javascript:void(0);" >' + imgtag + '</a>'

                $('#result_thumbnails').append(withlink )
            }

        }
    });
}
