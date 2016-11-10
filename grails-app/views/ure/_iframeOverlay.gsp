<script src="${resource(dir:'js',file:'iframe_overlay.js?v=2')}"></script>

<div id="iframeOverlay">

		<iframe id="externalsite-iframe" src=""> </iframe>
		<div id="iframeOverlay-infostrip">
			<div id="iframe-info">
			Ure<br/>Record<br/>Info
			</div>
			<div id="iframe-accnum">
				${accnum}
			</div>
			<div id="iframe-short-title">
				${short_title}
			</div>
			<div id="iframe-date">
				${date }&nbsp;
			</div>
			<div id="iframe-thumb">
				<img src="${thumbnail}"></img>&nbsp;
			</div>
			<button id="return-to-record" data-placement="top" data-toggle="tooltip" title="close" class="btn btn-info btn-large glyphicon glyphicon-remove-sign">
			</button>
			<button id="add-item" data-placement="top" data-toggle="tooltip" title="add to comparanda" class="btn btn-info btn-large glyphicon glyphicon-plus">
			</button>
		</div>

</div>

<!--  thumbnail2 ${bla} -->
<style>
#iframeOverlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5000;
	background: black;
	display: none; 
	height: 190vh 
	min-width: 100%;
}

#iframe-info {
font-weight: bold;
color: red;
background: #555;
width: 5% !important;
}

#iframeOverlay img {
height: 40px;

}
#iframeOverlay-infostrip {
	 color: #FFFFCC;
	 margin-top: 53%;
	 font-size: 14px;
	 
}
#iframeOverlay-infostrip button {
display: inline;
vertical-align: center;
postion: relative;
top: -20px;

}
#iframeOverlay-infostrip>div {
	display: inline-block;
	background: #333;
	margin-right: 10px;
	padding: 3px 15px 3px 15px;
	overflow: hidden;
	border-radius: 3px 3px 3px 3px;
	width: 20%;
	
	min-height: 60px;
}

#iframeOverlay-infostrip>div>a {
	display: inline;
}



#iframeOverlay-wrapper {
	
}

#externalsite-iframe {
	min-width: 100%;
	min-height: 90%;
	position: fixed;
}

 /* Tooltip */
  #iframeOverlay-infostrip  .tooltip > .tooltip-inner {
      background-color: #cc6633; 
      color: #FFFFFF; 
      border: 1px solid #cc6630; 
      padding: 15px;
      font-size: 20px;
  }
  /* Tooltip on top */
  #iframeOverlay-infostrip  .tooltip.top > .tooltip-arrow {
      border-top: 15px solid #cc6633;
  }
  /* Tooltip on bottom */
  #iframeOverlay-infostrip  .tooltip.bottom > .tooltip-arrow {
      border-bottom: 5px solid #cc6633;
  }
  /* Tooltip on left */
  #iframeOverlay-infostrip  .tooltip.left > .tooltip-arrow {
      border-left: 5px solid #cc6633;
  }
  /* Tooltip on right */
  #iframeOverlay-infostrip  .tooltip.right > .tooltip-arrow {
      border-right: 5px solid #cc6633;
  }
</style>