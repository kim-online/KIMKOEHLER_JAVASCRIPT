

var app = app || {};

app.main = (function(){

	var projects = [];

	function attachEvents(){
		console.log('attach events Works!');

		$('.close').click(function (e) {
			e.preventDefault();
			window.location.hash = '#';
		});
		
/*
		$('li').on('click', function(event){
			/*$('li').attr('firstClick', false);
			$(this).attr('firstClick', true);
			console.log('first click');
			$('li').removeClass('active');
			$(this).addClass('active');
			/*if(this.is(":clicked")){
  				$('active').on('click', function(event){
  					$('.active a').click();
  					$('li').removeClass('active');
  					console.log('second click');
  				});
  			}
		});*/

	};

	/*------------------------------------------------*/
	//	Load the JSON
	/*------------------------------------------------*/
	function loadData() {

		console.log('loadData works..');
		
		$.getJSON( "../../projects.json", function( data ) {
			// Write the data into our global variable.

			projects = data;

			generateAllProjectsHTML(projects);
			
			$(window).trigger('hashchange');
		});
	};

	function render(url) {

		var temp = url.split('/')[0];

		$('.all-content .page').removeClass('visible');

		var	map = {
			
			'': function() {
				renderStudentsPage(projects);
			},

			'#project': function() {
				
				var index = url.split('#project/')[1].trim();
				renderSingleProjectPage(index, projects);
			}

		};

		if(map[temp]){
			map[temp]();
		}
		else {
			renderErrorPage();
		}
	}

	function generateAllProjectsHTML(data) {
		console.log('generateProjects works..');

		var list = $('.squares');

		var source = $("#projects-template").html();

		var template = Handlebars.compile(source);
		list.append (template(data));

		list.find('li').on('click', function (e) {
			e.preventDefault();
			var studentIndex = $(this).data('index');
			console.log(studentIndex);
			window.location.hash = 'project/' + studentIndex;
		});

	}

	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}

	/*------------------------------------------------*/
	// Iterate through the students object & Make the students page visible
	/*------------------------------------------------*/
	function renderStudentsPage(data){

		var page = $('.grid'),
			allProjects = $('.squares > li');

		// Hide all the students in the students list.
		allProjects.addClass('hidden');

		// Iterate over all of the students.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		allProjects.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');
	}

	/*------------------------------------------------*/
	// Pop-up the project detail
	/*------------------------------------------------*/
	// Its parameters are an index from the hash and the students object.
	function renderSingleProjectPage(index, data){
		var page = $('.single-project'),
			container = $('.popup-detail');

		// Find the wanted product by iterating the data object and searching for the chosen index.
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					// Populate '.popup-detail' with the chosen product's data.
					container.css('background-color', item.color);
					container.find('h3').text(item.name);
					container.find('h4').text(item.type);
					container.find('figure').css('background-image', item.image.large);
					container.find('p').text(item.description);
				}
			});
		}

		// Show the page.
		page.addClass('visible');

	}



	var init = function(){
		console.log('Initializing app.');
		attachEvents();
		loadData();

		$(window).on('hashchange', function(){
			render(decodeURI(window.location.hash));
		});
	};

	return {
		init: init
	};

})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);