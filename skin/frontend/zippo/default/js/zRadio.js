var Playlist = function(instance, playlist, options) {
	var self = this;

	this.instance = instance; // String: To associate specific HTML with this playlist
	this.playlist = playlist; // Array of Objects: The playlist
	this.options = options; // Object: The jPlayer constructor options for this playlist

	this.current = 0;

	this.cssId = {
		jPlayer: 'jquery_jplayer_',
		interface: 'jp_interface_',
		playlist: 'jp_playlist_'
	};
	this.cssSelector = {};

	$.each(this.cssId, function(entity, id) {
		self.cssSelector[entity] = '#' + id + self.instance;
	});
	if(!this.options.cssSelectorAncestor) {
		this.options.cssSelectorAncestor = this.cssSelector.interface;
	}

	$(this.cssSelector.jPlayer).jPlayer(this.options);

	$(this.cssSelector.interface + ' .jp-previous').click(function() {
		self.playlistPrev();
		$(this).blur();
		return false;
	});

	$(this.cssSelector.interface + ' .jp-next').click(function() {
		self.playlistNext();
		$(this).blur();
		return false;
	});
};
Playlist.prototype = {
	displayPlaylist: function() {
		var self = this;
		$('ol#thePlayList').empty();
		var songTitle;
		for (i=0; i < this.playlist.length; i++) {
			var listItem = (((i+1) % 2 == 1)) ? '<li class="oddRow">' : '<li>';
			songTitle = this.playlist[i].name;
			songTitle = (songTitle.length > 44) ? songTitle = songTitle.substring(0, 44) + '&hellip;' : songTitle = songTitle;
			listItem += '<a href="#" id="' + this.cssId.playlist + this.instance + '_item_' + i +'" tabindex="1" class="lnkPlayList">'+ songTitle +'</a>';
			listItem += '</li>';

			// Associate playlist items with their media
			$('ol#thePlayList').append(listItem);
			$(this.cssSelector.playlist + '_item_' + i).data('index', i).click(function() {
				var index = $(this).data('index');
				if(self.current !== index) {
					self.playlistChange(index);
				} else {
					$(self.cssSelector.jPlayer).jPlayer('play');
				}
				$(this).blur();
				return false;
			});
		}
		$('div#scrollMe').jScrollPane({
			showArrows: true,
			zPlaylist: true
		});
	},
	playlistInit: function(autoplay) {
		if(autoplay) {
			this.playlistChange(this.current);
		} else {
			this.playlistConfig(this.current);
		}
	},
	playlistConfig: function(index) {
		var songTitle = $(this.cssSelector.playlist + '_item_' + index).text();
		songTitle = (songTitle.length > 30) ? songTitle = songTitle.substring(0, 30) + '&hellip;' : songTitle = songTitle;
		$(this.cssSelector.playlist + '_item_' + this.current).removeClass('jp-playlist-current').parent().removeClass('jp-playlist-current');
		$(this.cssSelector.playlist + '_item_' + index).addClass('jp-playlist-current').parent().addClass('jp-playlist-current');
		this.current = index;
		$(this.cssSelector.jPlayer).jPlayer('setMedia', this.playlist[this.current]);
		$('h2#playingTitle').html(songTitle);
	},
	playlistChange: function(index) {
		this.playlistConfig(index);
		$(this.cssSelector.jPlayer).jPlayer('play');
	},
	playlistNext: function() {
		var index = (this.current + 1 < this.playlist.length) ? this.current + 1 : 0;
		this.playlistChange(index);
	},
	playlistPrev: function() {
		var index = (this.current - 1 >= 0) ? this.current - 1 : this.playlist.length - 1;
		this.playlistChange(index);
	}
};
/*ZRADIO = {
	promoClick: function(){
		$('a#lnkRedPromo').click(function(e){
			e.preventDefault();
			//not sure to do with this? can we blow up the radio window to full screen size?
		});
	}
}*/
$(function(){
	//ZRADIO.promoClick();
	$('a.lnkPlayList').click(function(e){e.preventDefault();});
	var audioPlaylist = new Playlist('1', [
		{
			name:'Big Paper Airplanes - I\'ll Surrender',
			mp3:'../zRadio/tracks/Ill_surrender.mp3',
			oga:'../zRadio/tracks/Ill_surrender.ogg',
			poster:'../zRadio/tracks/bpa_lp.jpg'
		},
		{
			name:'Jeff the Brotherhood - Diamond Way',
			mp3:'../zRadio/tracks/JefftheBrotherhood_Diamond_Way.mp3',
			oga:'../zRadio/tracks/JefftheBrotherhood_Diamond_Way.ogg',
			poster:'../zRadio/tracks/JefftheBrotherhood_Diamond_Way.jpg'
		},
		{
			name:'The Dead Trees - World Gone Global',
			mp3:'../zRadio/tracks/Dead_Trees_World_Gone_Global.mp3',
			oga:'../zRadio/tracks/Dead_Trees_World_Gone_Global.ogg',
			poster:'../zRadio/tracks/the_dead_trees.jpg'
		},
		{
			name:'Pursesnatchers - Wet Cement',
			mp3:'../zRadio/tracks/Pursesnatchers_Wet_Cement.mp3',
			oga:'../zRadio/tracks/Pursesnatchers_Wet_Cement.ogg',
			poster:'../zRadio/tracks/pursesnatchers.jpg'
		},
		{
			name:'Release the Sunbird - Always like the Son',
			mp3:'../zRadio/tracks/Always-Like-The-Son.mp3',
			oga:'../zRadio/tracks/Always-Like-The-Son.ogg',
			poster:'../zRadio/tracks/release_the_sunbird.jpg'
		}	
	], {
		ready: function() {
			audioPlaylist.displayPlaylist();
			audioPlaylist.playlistInit(true); // Parameter is a boolean for autoplay.
		},
		ended: function() {
			audioPlaylist.playlistNext();
		},
		swfPath: "../zRadio",
		supplied: "oga,mp3"/*,
		errorAlerts: true*/
	});
});