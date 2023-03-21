<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<meta name="robots" content="index, follow">
    <link rel="shortcut icon" type="image/png" href="<?php if (get_option('site_icon')){echo get_site_icon_url();}else{ echo get_template_directory_uri().'/favicon.png';}?>">
    
	
    <title>Home</title>

	<?php wp_head(); ?>

    
<!-- Analytics -->
 
<!-- Analytics END -->
    
</head>
<body class="  <?php echo implode(" ",get_body_class()); ?>">

<!-- Preloader -->
<div id="page-loading-blocs-notifaction" class="page-preloader"></div>
<!-- Preloader END -->


<!-- Main container -->
<div class="page-container">
    
<?php get_header(); ?>

<!-- bloc-1 -->
<div class="bloc l-bloc" id="bloc-1">
	<div class="container bloc-lg bloc-sm-lg">
		<div class="row">
			<div class="col-sm-4 text-center text-md-start col-lg-3 fixheight-front-cover">
				<div id="carousel-1" class="carousel slide" data-bs-ride="carousel">
					<ol class="carousel-indicators">
						<li data-bs-target="#carousel-1" data-bs-slide-to="0" class="active">
						</li>
						<li data-bs-target="#carousel-1" data-bs-slide-to="1">
						</li>
						<li data-bs-target="#carousel-1" data-bs-slide-to="2">
						</li>
					</ol>
					<div class="carousel-inner" role="listbox">
						<div class="carousel-item active">
							<img class="d-inline-block w-100" alt="slide 1" src="<?php echo get_template_directory_uri(); ?>/img/anse202300007-toc-0001-m.jpg">
							<div class="carousel-caption">
							</div>
						</div>
						<div class="carousel-item">
							<img alt="slide 2" class="d-inline-block w-100" src="<?php echo get_template_directory_uri(); ?>/img/aenm202070130-gra-0001-m.jpg">
							<div class="carousel-caption">
							</div>
						</div>
						<div class="carousel-item">
							<img class="d-inline-block w-100" alt="slide 3" src="<?php echo get_template_directory_uri(); ?>/img/smll202170079-gra-0001-m.jpg">
							<div class="carousel-caption">
							</div>
						</div>
					</div><a class="carousel-nav-controls carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev"><svg width="26" height="26" viewBox="0 0 32 32"><path class="carousel-nav-icon carousel-prev-icon" d="M22,2L9,16,22,30"></path></svg><span class="visually-hidden">Previous</span></a><a class="carousel-nav-controls carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next"><svg width="26" height="26" viewBox="0 0 32 32"><path class="carousel-nav-icon carousel-next-icon" d="M10.344,2l13,14-13,14"></path></svg><span class="visually-hidden">Next</span></a>
				</div>
			</div>
			<div class="col-sm-8 text-center text-md-start col-lg-9">
						<div class="alert alert-warning" role="alert">
							<a href="#" class="btn btn-d btn-lg btn-style-none float-end" data-bs-dismiss="alert" aria-label="Close"><span class="fa fa-times close"></span></a>
							<p class="mb-0">
								Yo! We are looking for members! Please check our join us page for more information. <br>我们正在招募成员，请到我们的join us页面查看。同时，我们长期欢迎GT本科生加入本课题组。
							</p>
						</div>
						<h3 class="mg-md">
							<span class="text-grey">Welcome to the</span><br>Electrochemical Interface and Conversion Lab<br><span class="text-grey">@Guangdong Technion-Israel Institute of Technology</span><br><span class="text-grey">广东以色列理工学院</span> 电化学界面与转化研究组
						</h3>
						<p>
							The group is led by Dr. Weiran Zheng. We focus on understanding electrochemical processes using in situ techniques, including morphologic and spectroscopic methods. By doing so, we want to correlate electrochemical signals (potential, current, and resistance) with the physical evolution of electrodes and the interfaces, providing insights into rational electrode design that can solve real problems in current electrocatalysis.
						</p>
						<p>
							<a href="<?php echo home_url('/'); ?>/research">more about our research...</a><br>
						</p>
					</div>
		</div>
	</div>
</div>
<!-- bloc-1 END -->

<!-- bloc-2 -->
<div class="bloc l-bloc" id="bloc-2">
	<div class="container bloc-lg bloc-sm-lg">
		<div class="row">
			<div class="col">
				<h4 class="mb-4 mb-lg-4">
					Latest Publications
				</h4>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="row">
					<div class="col">
						<p>
							10/2022 | Chemistry-Methods
						</p>
						<p>
							<a href="https://doi.org/10.1002/cmtd.202200042" target="_blank">Beginner's Guide to Raman Spectroelectrochemistry for Electrocatalysis Study</a><br>
						</p>
						<div>
							<img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/cmtd202200042-toc-0001-m.webp" class="img-fluid mx-auto d-block lazyload" alt="cmtd202200042 toc-0001-m" width="364" height="110">
						</div>
					</div>
					<div class="col">
						<p>
							10/2022 | Analysis & Sensing
						</p>
						<p>
							<a href="https://doi.org/10.1002/anse.202200070" target="_blank">Single-Atom Materials as Electrochemical Sensors: Sensitivity, Selectivity, and Stability</a><br>
						</p>
						<div>
							<picture><source type="image/webp" srcset="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-srcset="<?php echo get_template_directory_uri(); ?>/img/anse202200070-fig-0001-m-2.webp"><img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/anse202200070-fig-0001-m-2.jpg" class="img-fluid mx-auto d-block lazyload" alt="anse202200070 fig-0001-m-2" width="364" height="191"></picture>
						</div>
					</div>
					<div class="col">
						<p>
							07/2022 | Chemistry-An Asian Journal
						</p>
						<p>
							<a href="https://doi.org/10.1002/asia.202200384" target="_blank">Observing Electrocatalytic Processes via In Situ Electrochemical Scanning Tunneling Microscopy</a><br>
						</p>
						<div>
							<picture><source type="image/webp" srcset="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-srcset="<?php echo get_template_directory_uri(); ?>/img/TOC.webp"><img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/TOC.png" class="img-fluid mx-auto d-block lazyload" alt="TOC" width="364" height="143"></picture>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- bloc-2 END -->

<!-- ScrollToTop Button -->
<button aria-label="Scroll to top button" class="bloc-button btn btn-d scrollToTop" onclick="scrollToTarget('1',this)"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path class="scroll-to-top-btn-icon" d="M30,22.656l-14-13-14,13"/></svg></button>
<!-- ScrollToTop Button END-->


<?php get_footer(); ?>

</div>
<!-- Main container END -->
    
<?php wp_footer(); ?>

<!-- Additional JS -->
<script type='text/javascript' src="<?php echo get_template_directory_uri(); ?>/js/lazysizes.min.js" defer></script>
<!-- Additional JS END -->


</body>
</html>
