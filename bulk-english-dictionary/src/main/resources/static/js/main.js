Date.prototype.yyyymmddhhmmss = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var hh = this.getHours();
    var mi = this.getMinutes();
    var ss = this.getSeconds();

    var yyyymmddhhmmss = [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (mi > 9 ? '' : '0') + mi,
        (ss > 9 ? '' : '0') + ss
    ].join('');

    return yyyymmddhhmmss;
};

(function($) {
    $.dictionary = {
        getFileName : function() {
            return "vocabularies_" + new Date().yyyymmddhhmmss() + ".xlsx";
        },
    }

    $(document).on("click", "[id=btnConvert]", function(e){
        e.stopPropagation();
        e.preventDefault();

        if( !$.dictionary.fileData || $.dictionary.fileData.length <= 0 ) {
            alert("변환할 파일이 존재하지 않습니다.");
            return false;
        }
        else {

            var result = '';

            for( var i = 0, length = $.dictionary.fileData.length; i < length; ++i ) {
                var convertedData = $.dictionary.convert( $.dictionary.fileData[i] );
                result += convertedData + "\r\n\r\n";
            }

            $("#outputBox").text(result);
        }
    });

    $(document).on("click", "[id=btnSave]", function(e) {
        e.stopPropagation();
        e.preventDefault();

        var tab_text= "<table border='2px'><tr bgcolor='#87AFC6'><td>테스트 데이터</td><td>dflkdfkjdlkj</td></tr></table>";

        /*
        //MS-Excel
        window.open('data:application/vnd.ms-excel,' + $('#dvData').html());

        //CSV
        window.open('data:application/csv,charset=utf-8,' + $('#dvData').html());
        */

        //var sa = window.open("data:application/vnd.ms-excel,filename=" + $.dictionary.getFileName() + "," + encodeURIComponent(tab_text));
        var dataType = "data:application/vnd.ms-excel";
        var tableHtml = encodeURIComponent(tab_text.replace(/ /g, '%20'));

        var aLink = document.createElement('a');
        aLink.href = dataType + ', ' + tableHtml;
        aLink.download = $.dictionary.getFileName();
        aLink.click();
        aLink.href="";

        //return (sa);
    });
/*
            $("#btnExport").click(function(e) {
                var msg = GetMimeTypes();
                //OpenOffice
                window.open('data:application/vnd.oasis.opendocument.spreadsheet,' + $('#dvData').html());
                //MS-Excel
                window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
                //CSV
                window.open('data:application/csv,charset=utf-8,' + $('#dvData').html());
                e.preventDefault();
            });

            function GetMimeTypes () {
                var message = "";

                // Internet Explorer supports the mimeTypes collection, but it is always empty
                if (navigator.mimeTypes && navigator.mimeTypes.length > 0) {
                    var mimes = navigator.mimeTypes;

                    for (var i=0; i < mimes.length; i++) {
                        message += "<b>" + mimes[i].type + "</b> : " + mimes[i].description + "<br />";
                    }
                }
                else {
                    message = "Your browser does not support this ";
                    //sorry!
                }

                return ( message);
            }

    */

})(jQuery);