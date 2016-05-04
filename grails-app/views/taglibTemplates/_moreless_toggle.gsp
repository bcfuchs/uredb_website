

	<style>
.ure_hidden {
	display: none;
}
.ure_hidden2 {
	display: none;
}
</style>
	<script>
					! function(){
						$(document).ready(function(){
							$('#show_more_toggle').click(function(){
						  		$('.image_table_${s}').toggleClass('ure_hidden');
						  		$('.ure_hidden').toggle();
						  		$('.ure_show').toggleClass('ure_hidden2');
						  		$('.ure_less').toggleClass('ure_hidden2');
							});
							})

						}()
					</script>
					<style>
					#show_more_toggle .more_less {
					text-decoration: underline;
					cursor: pointer;
					}
					</style>
	<div class="show_more">
		<span id="show_more_toggle">
			
			<span class="ure_show more_less">show more...</span>
			<span class="ure_less ure_hidden2 more_less" >show less...</span>
		</span>
	</div>