$(document).ready(function(){
	var key = '1iD6RcrJf2eV9pbE301MgYZFAwjKU2sbVQ32yTWULJf8';
	var userURL = 'https://spreadsheets.google.com/feeds/list/' + key + '/1/public/values?alt=json';
	
	//總數
	// queryTotal();
	// function queryTotal(){
	// 	var total = 0;
	// 	$.ajax({
	// 		url: userURL,
	// 		type: "GET",
	// 		dataType: "json",
	// 		success: function (json) {
	// 			var trowsRegex = /gsx\$/;

	// 			// 呈現表格 rows 資料
	// 			var trows = json.feed.entry;
				
	// 			$.each(trows, function (i, data) {
	// 				total += Number(data.gsx$購買數量.$t);
	// 			});
	// 			//total = (num+num2);
	// 			console.log(total);
	// 			$('.all span').html(total);
	// 		},
	// 		//錯誤判斷
	// 		error: function () {
	// 			alert("資料讀取錯誤，請聯絡 captu");
	// 		}
	// 	});

		
	// }
	
	function queryData(pttid,tel){
		var bookers = [];
		var booker = [];
		$.ajax({
			url: userURL,
			type: "GET",
			dataType: "json",
			success: function (json) {
				var rowsRegex = /gsx\$/;

				// 呈現表格 rows 資料
				var rows = json.feed.entry;
				$.each(rows, function (i, data) {
					//console.log(i);
					bookers[i]=[];
					$.each(data, function (j, jdata){
						if(rowsRegex.test(j)){
							bookers[i].push(jdata.$t);
						}
					});

				});
				
			},
			//錯誤判斷
			error: function () {
				alert("資料讀取錯誤，請聯絡 captu");
			}
		}).done(function(){
			var find = false;
				for (var k = 0; k<bookers.length; k++) {
					//console.log(bookers[k][2]+"   "+bookers[k][15]);
					if(bookers[k][2]==pttid && (bookers[k][15]==(tel.substring(1,tel.length)) || bookers[k][15] == tel)){
						booker = bookers[k];
						$('li.name').text("姓名(收件人)："+booker[1]);
						$('li.pttid').text("訂購人ID："+booker[2]);
						$('li.price').text("金額："+booker[5]);
						$('li.num1').text("PINK 數量："+booker[7]);
						$('li.num2').text("MINT 數量："+booker[8]);
						$('li.ac').text("匯款單資訊："+booker[6]);
						$('li.card').text("是否拆卡："+booker[9]);
						$('li.cardsort').text("需換專卡排序："+booker[10]);
						$('li.card2').text("音源卡是否提供："+booker[11]);
						$('li.poster').text("是否需要海報筒："+booker[12]);
						$('li.post').text("寄送方式："+booker[13]);
						$('li.adds').text("收件地址："+booker[14]);
						$('li.change').text("退費或納入基金：："+booker[17]);
						if(bookers[k][15]==(tel.substring(1,tel.length))) $('li.tel').text("聯絡電話：0"+booker[15]);
						if(bookers[k][15] == tel) $('li.tel').text("聯絡電話："+booker[15]);
						
						
						// console.log(booker);
						// if(booker[10]=="TRUE"){
						// 	$('li.check').text("處理狀況：款項已確認收到。");
						// }else{
						// 	$('li.check').text("處理狀況：已填單，待確認款項與資料。");
						// }
						//$('li.trackno-1').text("郵件編號："+booker[15]);
						//$('li.trackno-2').text("郵件編號(海報)："+booker[16]);
						//$('li.check').text("PTT 帳號："+booker[1]);
						//console.log(booker);
						find = true;
						break;
					}
				}
				if(!find){
					alert('查無資料');
				}
		});

		
	}
	$(".sent-btn").click(function() {
		//console.log($('input[name="tel"]').val().substring(1,$('input[name="tel"]').val().length));
	  queryData($('input[name="ptt"]').val(),$('input[name="tel"]').val());
	});
});

