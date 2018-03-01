$(document).ready(function(){
  var response;
  var data = [];
  function errorFunc(){
	  console.log("error");
	}

  var countries = ["SVN", "HRV", "BIH", "SRB", "MKD"];

  //for (let key in countries){
  

  $("#table").tabulator({
		//height:"605px", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
		layout:"fitColumns", //fit columns to width of table (optional)
    pagination:"local",
    paginationSize:6, 
		columns:[ //Define Table Columns
		    {title:"Logo", field:"image", formatter:"image", align:"center", width:"150"},
		    {title:"Brand name", field:"brand_name", headerFilter:"input", align:"center", width:"200"},
		    {title:"Category name", field:"category_name", headerFilter:"input", align:"center", width:"200"},
		    {title:"Country", field:"country",  
					headerFilter:"select", headerFilterParams:{"":"All","Slovenia":"Slovenia", "Croatia":"Croatia", "Bosnia & Hercegovina":"Bosnia & Hercegovina", "Serbia":"Serbia", "Macedonia":"Macedonia"}, 
align:"center", width:"150"}, 
        {title:"producer", field:"producer", formatter:"tickCross", align:"center", width:"120"},
        /*{title:"brand_id", field:"brand_id", align:"center", width:"120"},
        {title:"master_id", field:"master_id", align:"center", width:"120"},
        {title:"select_id", field:"select_id", align:"center", width:"120"},
        {title:"row_id", field:"row_id", align:"center", width:"120"},*/
			],
	}); 

  var tabledata = [];
	function successCallback(response){

	  for (var i = 0; i<response.length; i++){
			tabledata.push(
					{id:response[i]["row_id"], 
						image:response[i]["logo"],
 						brand_name:response[i]["brand_name"], category_name:response[i]["category_name"], country:response[i]["country"], producer:response[i]["producer"] , brand_id:response[i]["brand_id"], master_id:response[i]["brand_id"], select_id:response[i]["select_id"], row_id:response[i]["row_id"]}
	    );
	  }
		$("#table").tabulator("setData", tabledata);
		$("#table").tabulator("setPage", 1);
  }
  /*---------END of the successCallback--------*/

  var url = "http://ap.valicon.net/bsit/interview";
	function postResponse(code){
	  var parameter = '{"Code":"' + code +'"}';
		response = $.post(url, parameter, successCallback);
		response.fail(errorFunc);
  }
  
  for (var i = 0; i<countries.length; i++){
    postResponse(countries[i]);
  }


});
