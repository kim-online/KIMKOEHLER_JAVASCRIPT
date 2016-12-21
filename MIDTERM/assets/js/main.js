
/*This SPA page is based on the template find here, the same
as Umi Syam used for the DT's Thesis show.
http://tutorialzine.com/2015/02/single-page-app-without-a-framework/
*/

var app = app || {};

app.main = (function(){

	var projects = [];

	function attachEvents(){
		console.log('attach events Works!');

		$('.close').click(function (e) {
			e.preventDefault();
			window.location.hash = '#';
		});
		

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

		//Make sure all pages are hidden to start with.

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
	// Iterate through the projects to make the clicked one visible
	/*------------------------------------------------*/
	function renderStudentsPage(data){

		var page = $('.grid'),
			allProjects = $('.squares > li');

		// Hide all the projects
		allProjects.addClass('hidden');

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

	function renderSingleProjectPage(index, data){
		var page = $('.single-project'),
			container = $('.popup-detail');

		// Find the wanted project by iterating the data object and searching for the chosen index.
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					// Changing the page depending on which project is chosen.
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