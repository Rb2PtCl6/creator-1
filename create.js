const fs = require('fs');
const additional_path=""; // "path/to/file/"
const source="source.txt"

function data_from_source(){
    var raw=(fs.readFileSync(additional_path+source,'utf-8',function(err,data){
        if (err) return;
        return data
    })).split('\r\n')
    var raw_splitted=[]
    for (var i in raw) {
        var string=raw[i]
        var string_separated=string.split(' ')
        if (string_separated[0]=="//") continue;
        raw_splitted[i]={}
        raw_splitted[i].title=string_separated[0]
        raw_splitted[i].series_number=string_separated[1]
    }
    return raw_splitted
}

// main
//console.log(data_from_source())
for (const row of data_from_source()){
    //console.log(row)
    if (row==undefined) continue
    //console.log(row.title)
    var title=row.title
    //console.log(row.series_number)
    var series_number=Number(row.series_number)
    if (!fs.existsSync(additional_path+title)){
        fs.mkdirSync(additional_path+title);
    }
    for (var i=0;i<series_number;i++){
        //var full_title=additional_path+`${title}/`+`${title}-${(i)+1}.mp4`
        var full_title=`${additional_path}${title}/${title}-${(i)+1}.mp4`
        if (!fs.existsSync(full_title)){
            //console.log(full_title)
            fs.writeFileSync(full_title,'');
        }
    }
}