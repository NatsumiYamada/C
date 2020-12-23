/**
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function() {

'use strict';
// モーダルを閉じる
$('.modal_close_btn').on('click', function() {
	$('.modal_contents').fadeOut();
	return false;
});
	$('.modal_contents_bg').on('click', function() {
	$('.modal_contents').fadeOut();
	return false;
});
// 箱clickでイベント発生
// stepTimesは各stepごとの間隔のm秒数
	var merrywrap = document.getElementById( 'merrywrap' ),
		box = merrywrap.querySelector( '.giftbox' ),
		step = 1,stepTimes = [3500,1000,3000,5000];

// クリックでrunAnimation
	function init() {
		box.addEventListener( 'click', runAnimation );
	}

	function runAnimation() {
		// addEventListenerを消す（クリックできないようにする）
		if( step === 1 ) {
			box.removeEventListener( 'click', runAnimation );
		}
		incStep( step );

		if( step === 4 ) {
			letitsnow();
			showModale();
			return;
		}
		if( step === 3 ) {
			// set different delays for each item
			setGridDelays();
		}
		setTimeout(function() { runAnimation(); }, stepTimes[ step - 1 ] );
		++step;
	}

	function incStep( step ) {
		//classie.jsの機能
		//自分のstepの1つ前のstepを消す＆自分のstepクラスを追加
		classie.remove( merrywrap, 'step-' + Number( step - 1 ) );
		classie.add( merrywrap, 'step-' + step );
	}
	function showModale(){
		$('.modal_contents').fadeIn();
	}

	// 文字がランダムに散らばる
	function setGridDelays() {
		[].slice.call( merrywrap.querySelectorAll( '.row' ) ).forEach( function( row, i ) {
			var itemsrow = [].slice.call( row.querySelectorAll( 'span' ) ),
				itemsrowCount = itemsrow.length,
				factor = (itemsrowCount - 1) * 0.01,
				delays = [ itemsrowCount - 1 ];

			for( var k = 0; k < itemsrowCount; ++k )
				delays[k] = k * 0.01 + ( ( itemsrowCount - 1 - i ) * factor );

			shuffle( itemsrow );

			itemsrow.forEach( function( item, j ) {
				var delay = delays[ j ];
				item.style.webkitTransition = '-webkit-transform 0.4s ease-out ' + delay + 's, opacity 0.4s ' + delay + 's';
				item.style.transition = 'transform 0.4s ease-out ' + delay + 's, opacity 0.4s ' + delay + 's';
			} );
		} )
	}

	function letitsnow() {
		// https://github.com/daveWid/canvas-snow
		var canvas = document.getElementById("snowfall");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		// Now the emitter
		var emitter = Object.create(rectangleEmitter);
		emitter.setCanvas(canvas);
		emitter.setBlastZone(0, -10, canvas.width, 1);
		emitter.particle = snow;
		emitter.runAhead(0);
		emitter.start(60);
	}

	// http://stackoverflow.com/a/2450976
	function shuffle( array ) {
		var currentIndex = array.length
		, temporaryValue
		, randomIndex
		;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	init();

})();
