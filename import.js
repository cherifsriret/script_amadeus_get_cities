 var fileName = prompt('Please enter file name to save', 'Untitled.txt');
 var textFileAsBlob = "";
jQuery('#addressCountry option').each((e,i)=>{
    let code = jQuery(i).val().substring(7);
        jQuery.ajax({
            method: 'POST',
            url: 'https://ahplus.frequentflyer.aero/webapp/getCityByCountry',
            data: JSON.stringify({countryCode:code}),
          contentType: "application/json; charset=utf-8",
            dataType: "json",
            })
            .done(function (resp) {

                if(resp.response.cities)
                {
                    var ind = 0;
                    var leng = resp.response.cities.length;
                    resp.response.cities.forEach(element => {
                            if(ind == 0) {
                                textFileAsBlob += `"${code}" => array(`;
                            }
                          textFileAsBlob += `"${element.code}" => __( '${element.name}', 'woocommerce' ),\n`;
                          ind++;
                          if(ind == leng) {
                            textFileAsBlob += `),\n`;
                        }

                    });
                }
                if(e == jQuery('#addressCountry option').length-1 )
                {
                    download_csv_using_blob(fileName, textFileAsBlob );
                };
});
    })

    var download_csv_using_blob = function (file_name, content) {
        var csvData = new Blob([content], { type: 'text/txt' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
            window.navigator.msSaveOrOpenBlob(csvData, file_name);
        } else { // for Non-IE (chrome, firefox etc.)
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            var csvUrl = URL.createObjectURL(csvData);
            a.href =  csvUrl;
            a.download = file_name;
            a.click();
            URL.revokeObjectURL(a.href)
            a.remove();
        }
    };
