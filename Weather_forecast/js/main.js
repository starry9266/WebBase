$(function(){

  getData('https://api.jisuapi.com/weather/query?appkey=798dc81fac1b5a8f&city=北京');

  $('#headerGet').on('blur',function(){
    let param = $(this).val();
    let url = 'https://api.jisuapi.com/weather/query?appkey=798dc81fac1b5a8f&city='+param;
    getData(url);
  })

  function getData(url1){
    $.ajax({
      type:'GET',
      url:url1,
      dataType:'jsonp',
      success:function(json){
        console.log(json);

        $('#city h3').html("城市:"+json.result.city);
        $('#time h3').html("时间:"+json.result.updatetime);
        $('#week h3').html("周次:"+json.result.week);
        $('#weather h3').html("天气:"+json.result.weather);
        $('#windpower').html("风力:"+json.result.windpower);
        $('#winddirect').html("风向:"+json.result.winddirect);

        
        
        
        $('#iname').html(json.result.index[0].iname);
        $('#ivalue').html(json.result.index[0].ivalue);
        $('#detail').html(json.result.index[0].detail);
        $('#iname1').html(json.result.index[1].iname);
        $('#ivalue1').html(json.result.index[1].ivalue);
        $('#detail1').html(json.result.index[1].detail);
        
      }
    })
  }

})